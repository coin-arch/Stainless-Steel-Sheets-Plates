import { createClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ContentRenderer from '@/components/content/ContentRenderer';
import { Metadata } from 'next';
import '@/app/legacy-content.css'; // Keep for fallback

// ISR Revalidation
export const revalidate = 3600;

export async function generateStaticParams() {
    const supabase = createClient();
    const { data: posts } = await supabase.from('post').select('slug');
    return posts?.map(({ slug }) => ({ slug })) || [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const supabase = createClient();
    const { data: post } = await supabase
        .from('post')
        .select('title, meta_title, meta_description, keywords, canonical_url')
        .eq('slug', slug)
        .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID!)
        .single();

    if (!post) {
        return {
            title: 'Product Not Found | Metal Ministry Inc.',
        };
    }

    const title = post.meta_title || `${post.title} | Metal Ministry Inc.`;
    const description = post.meta_description || `Premium quality ${post.title} from Metal Ministry Inc. Global exporter of stainless steel, nickel alloys, and duplex steel products.`;
    const url = `https://metalministry.in/products/${slug}`;

    return {
        title,
        description,
        keywords: post.keywords,
        alternates: {
            canonical: post.canonical_url || url,
        },
        openGraph: {
            title,
            description,
            url,
            type: 'article',
            siteName: 'Metal Ministry Inc.',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        }
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = createClient();
    const { data: post } = await supabase
        .from('post')
        .select('*')
        .eq('slug', slug)
        .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID!)
        .single();

    if (!post) {
        notFound();
    }

    // Dual Strategy: Prefer Structured Content, Fallback to HTML
    const hasStructuredContent = post.structured_content && Array.isArray(post.structured_content) && post.structured_content.length > 0;

    return (
        <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-10 transition-colors duration-300">
            <div className="container mx-auto px-4">

                {/* Breadcrumb (simplified) */}
                <div className="text-sm text-gray-500 mb-6">
                    <a href="/" className="hover:text-blue-600 transition-colors">Home</a> <span className="mx-2">/</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{post.title}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Content Area */}
                    <div className="w-full lg:w-3/4 bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-all duration-300">

                        {hasStructuredContent ? (
                            <ContentRenderer blocks={post.structured_content} />
                        ) : (
                            // Fallback to Legacy HTML
                            <div
                                className="legacy-content prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        )}

                    </div>

                    {/* Sidebar */}
                    <Sidebar />

                </div>
            </div>
        </div>
    );
}
