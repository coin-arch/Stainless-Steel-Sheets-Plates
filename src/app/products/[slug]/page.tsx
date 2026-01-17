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

// Helper to check if a slug is likely a legacy category page
function isLegacyCategorySlug(slug: string): boolean {
    // Check if the slug ends with 'manufacturer-stockist' or matches our sidebar patterns
    const categoryKeywords = ['sheets', 'plates', 'coils', 'strips', 'perforated', 'chequered'];
    return categoryKeywords.some(keyword => slug.includes(keyword)) && slug.includes('manufacturer-stockist');
}

// Fetch products for a category based on slug keywords
async function getCategoryProducts(supabase: any, slug: string) {
    // Extract keywords: e.g. "stainless-steel-sheets" -> "stainless", "steel", "sheets"
    const terms = slug.replace('-manufacturer-stockist', '').split('-');

    // Build a query
    let query = supabase.from('post')
        .select('title, slug, meta_description')
        .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID!)
        .eq('type', 'product');

    // Simple keyword matching (at least one matching term in title logic would be complex in ORM, 
    // so we'll fetch a broader set and filter or just match the main material/type)

    // Refined Strategy: match Terms with OR logic for broad categories
    // But keep Material as strict AND
    let shapeFilter = '';
    const shapes = [];
    if (slug.includes('sheet')) shapes.push('title.ilike.%sheet%');
    if (slug.includes('plate')) shapes.push('title.ilike.%plate%');
    if (slug.includes('coil')) shapes.push('title.ilike.%coil%');
    if (slug.includes('strip')) shapes.push('title.ilike.%strip%');
    if (slug.includes('pipe')) shapes.push('title.ilike.%pipe%');
    if (slug.includes('fitting')) shapes.push('title.ilike.%fitting%');

    if (shapes.length > 0) {
        shapeFilter = shapes.join(',');
        query = query.or(shapeFilter);
    }

    // Material/Grade Filter (Strict AND)
    if (slug.includes('stainless')) {
        query = query.ilike('title', '%stainless%');
    } else if (slug.includes('carbon')) {
        query = query.ilike('title', '%carbon%');
    } else if (slug.includes('duplex')) {
        query = query.ilike('title', '%duplex%');
    } else if (slug.includes('nickel')) {
        query = query.ilike('title', '%nickel%');
    } else if (slug.includes('titanium')) {
        query = query.ilike('title', '%titanium%');
    } else if (slug.includes('aluminium')) {
        query = query.ilike('title', '%aluminium%');
    }

    // Specific Grade Checks (Heuristic)
    if (slug.includes('304')) query = query.ilike('title', '%304%');
    if (slug.includes('316')) query = query.ilike('title', '%316%');
    if (slug.includes('15-5ph')) query = query.ilike('title', '%15-5ph%');
    if (slug.includes('17-4ph')) query = query.ilike('title', '%17-4ph%');
    if (slug.includes('2205')) query = query.ilike('title', '%2205%');

    const { data } = await query.limit(50);
    return data || [];
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

    // FALLBACK: Category Page Logic
    if (!post) {
        if (isLegacyCategorySlug(slug)) {
            const categoryProducts = await getCategoryProducts(supabase, slug);

            // Render a "Category" view using the same layout but with a grid
            // We need to import ProductCatalog dynamically or just map a simple grid here
            const titleName = slug.replace('-manufacturer-stockist', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

            // Dynamic Import for Catalog
            const ProductCatalog = (await import('@/components/ProductCatalog')).default;

            return (
                <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-10 transition-colors duration-300">
                    <div className="container mx-auto px-4">
                        <div className="text-sm text-gray-500 mb-6">
                            <a href="/" className="hover:text-blue-600 transition-colors">Home</a> <span className="mx-2">/</span>
                            <a href="/products" className="hover:text-blue-600 transition-colors">Products</a> <span className="mx-2">/</span>
                            <span className="text-gray-800 dark:text-gray-200 font-medium">{titleName}</span>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="w-full lg:w-3/4">
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 mb-8">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{titleName}</h1>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Premium quality {titleName} available in various grades and specifications.
                                        Browse our complete range below.
                                    </p>
                                </div>

                                {categoryProducts.length > 0 ? (
                                    <ProductCatalog products={categoryProducts} />
                                ) : (
                                    <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 p-6 rounded-xl text-center">
                                        <p className="text-yellow-700 dark:text-yellow-400 font-medium">No products currently listed in this category.</p>
                                        <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-1">Please contact us for custom requirements.</p>
                                    </div>
                                )}
                            </div>
                            <Sidebar />
                        </div>
                    </div>
                </div>
            );
        }

        notFound();
    }

    // Dual Strategy: Prefer Structured Content, Fallback to HTML
    const hasStructuredContent = post.structured_content && Array.isArray(post.structured_content) && post.structured_content.length > 0;

    // Logic for Existing Posts that act as Categories
    const isCategory = isLegacyCategorySlug(slug);
    let relatedProducts: any[] = [];

    if (isCategory) {
        relatedProducts = await getCategoryProducts(supabase, slug);
    }

    // Dynamic Import for Catalog
    const ProductCatalog = (await import('@/components/ProductCatalog')).default;

    return (
        <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-10 transition-colors duration-300">
            <div className="container mx-auto px-4">

                {/* Breadcrumb (simplified) */}
                <div className="text-sm text-gray-500 mb-6">
                    <a href="/" className="hover:text-blue-600 transition-colors">Home</a> <span className="mx-2">/</span>
                    <a href="/products" className="hover:text-blue-600 transition-colors">Products</a> <span className="mx-2">/</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{post.title}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Content Area */}
                    <div className="w-full lg:w-3/4 bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 transition-all duration-300">

                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b dark:border-slate-700 pb-4">{post.title}</h1>

                        {/* Dynamic Content Generation */}

                        {/* 1. SEO Header Block (Mimicking Client Reference) */}
                        <div className="bg-slate-900 text-white p-8 rounded-xl mb-8 shadow-lg">
                            <h2 className="text-xl md:text-2xl font-bold leading-relaxed mb-4 text-blue-100">
                                {post.title}, Premium Quality {post.title} Manufacturer, Supplier & Exporter in India.
                                High Quality {post.title} available in all grades.
                            </h2>
                            <p className="text-gray-300 leading-7">
                                Metal Ministry Inc. is a leading manufacturer and stockist of <strong>{post.title}</strong>.
                                We supply high-quality {post.title} to customers in various sizes, grades, and specifications.
                                Our products are tested to international standards (ASME, ANSI, DIN, JIS) and are available at competitive prices.
                            </p>
                        </div>

                        {/* 2. Structured Content or Legacy Fallback */}
                        {hasStructuredContent ? (
                            <ContentRenderer blocks={post.structured_content} />
                        ) : (
                            <div className="legacy-content prose prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
                                {/* Only show legacy content if it's substantial (heuristic: > 200 chars), otherwise hide it to avoid 'links only' look */}
                                {post.content && post.content.length > 200 ? (
                                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                ) : (
                                    <p>
                                        We specialize in the production of high-grade {post.title}. We have a comprehensive inventory
                                        to meet urgent requirements. Our materials are used across oil & gas, petrochemical, and power generation industries.
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Enhanced Category Display for Existing Pages */}
                        {isCategory && (
                            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Available Grades & Specifications</h2>
                                {relatedProducts.length > 0 ? (
                                    <ProductCatalog products={relatedProducts} />
                                ) : (
                                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 p-6 rounded-xl">
                                        <p className="text-blue-700 dark:text-blue-300">Browse our complete range of {post.title} products above or contact us for custom sizing.</p>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                    {/* Sidebar */}
                    <Sidebar />

                </div>
            </div>
        </div>
    );
}
