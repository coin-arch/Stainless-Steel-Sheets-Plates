'use client';

import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function WhoWeAre() {
    const features = [
        "Consumer Package Products",
        "Chemical Products",
        "Quality Support Products",
        "Testing & Checking Products",
        "Retail Package Products",
        "Energy Oil & Gas"
    ];

    return (
        <section className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Content Column */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative">
                            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase block mb-2">
                                We Manufacturer & Provide
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                Worldwide Metal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Products</span>
                            </h2>
                            <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8"></div>

                            <div className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                <strong className="text-gray-900 dark:text-white">Metal Ministry Inc.</strong> is one of the best Metal Product Supplying and Manufacturing companies. We export our products throughout the globe.
                            </div>

                            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                                The creation of Metal Products incorporates a movement of techniques. To begin with, the steel is mellowed. To make stainless steel, the rough materials—press metal, chromium, silicon, nickel, etc.—are fused together to create superior alloys.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                {features.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 group">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            <CheckCircle2 size={14} strokeWidth={3} />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-200 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href="/about-us" className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1">
                                More About Us <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                            <div className="aspect-[4/3] relative">
                                {/* Using a generic industrial image from public/images if available, otherwise a placeholder */}
                                <Image
                                    src="/images/resource/innovator.jpg" // Trying original path, will need to check if it exists or use fallback
                                    alt="Industrial Innovation"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                    onError={(e) => {
                                        // Fallback handled by parent or replacement logic if needed, 
                                        // for now assuming Next.js Image component standard behavior or we'll swap the src if broken
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent pointer-events-none"></div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 left-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl max-w-xs animate-fade-in-up">
                                <div className="text-4xl font-bold text-blue-600 mb-1">25+</div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Years of Industrial Excellence</div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-100 dark:bg-slate-800 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-700"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
