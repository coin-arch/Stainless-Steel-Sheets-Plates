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
    const { data: posts } = await supabase
        .from('post')
        .select('slug')
        .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID!)
        .eq('type', 'blog'); // Only pre-generate blog paths

    return posts?.map(({ slug }) => ({ slug })) || [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = createClient();
    const { data: post } = await supabase
        .from('post')
        .select('meta_title, meta_description, keywords, canonical_url')
        .eq('slug', slug)
        .eq('type', 'blog')
        .single();

    return {
        title: post?.meta_title || 'Metal Ministry Inc. Blog',
        description: post?.meta_description || '',
        keywords: post?.keywords || '',
        alternates: {
            canonical: post?.canonical_url || `https://metalministry.in/blogs/${slug}`
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = createClient();
    const { data: post } = await supabase
        .from('post')
        .select('*')
        .eq('slug', slug)
        .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID!)
        .eq('type', 'blog') // STRICTLY BLOGS
        .single();

    if (!post) {
        notFound();
    }

    // Dual Strategy: Prefer Structured Content, Fallback to HTML
    const hasStructuredContent = post.structured_content && Array.isArray(post.structured_content) && post.structured_content.length > 0;

    return (
        <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-10 transition-colors duration-300">
            <div className="container mx-auto px-4">

                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                    <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
                    <span>/</span>
                    <a href="/blogs" className="hover:text-blue-600 transition-colors">Blogs</a>
                    <span>/</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[200px] md:max-w-md">{post.title}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Content Area */}
                    <article className="w-full lg:w-3/4 bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-all duration-300">
                        <header className="mb-8 border-b border-gray-100 pb-8">
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                                {post.title}
                            </h1>
                            <div className="text-sm text-gray-400">
                                Published {new Date(post.published_at).toLocaleDateString()}
                            </div>
                        </header>

                        {hasStructuredContent ? (
                            <ContentRenderer blocks={post.structured_content} />
                        ) : (
                            // Fallback to Legacy HTML
                            <div
                                className="legacy-content prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        )}

                    </article>

                    {/* Sidebar - Reused for consistency */}
                    <Sidebar />
                </div>
            </div>

            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.title,
                        description: post.meta_description || post.title,
                        datePublished: post.published_at,
                        dateModified: post.published_at, // Or updated_at if available
                        author: {
                            '@type': 'Organization',
                            name: 'Metal Ministry Inc.',
                            url: 'https://metalministry.in'
                        },
                        publisher: {
                            '@type': 'Organization',
                            name: 'Metal Ministry Inc.',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://metalministry.in/images/logo1.png'
                            }
                        },
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': `https://metalministry.in/blogs/${post.slug}`
                        }
                    })
                }}
            />
        </div>
    );
}
