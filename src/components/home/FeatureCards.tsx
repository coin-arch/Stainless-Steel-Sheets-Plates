'use client';

import { Clock, Users, BadgePercent, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FeatureCards() {
    const cards = [
        {
            icon: <Clock className="w-10 h-10 text-white" />,
            title: "24/7 AVAILABLE",
            desc: "Metal Ministry Inc. is available to serve you 24/7 for all your queries and enquiries related to our products.",
            bgClass: "bg-blue-600",
            link: "/contact-us"
        },
        {
            icon: <Users className="w-10 h-10 text-white" />,
            title: "EXPERT STAFF",
            desc: "Metal Ministry Inc. has a group of experts in the field of manufacturing and testing metal products.",
            bgClass: "bg-gray-900 dark:bg-slate-800",
            link: "/about-us"   
        },
        {
            icon: <BadgePercent className="w-10 h-10 text-white" />,
            title: "LOW COST",
            desc: "Metal Ministry Inc. manufactures metal products at leading and competitive market prices for our customers.",
            bgClass: "bg-blue-600",
            link: "/products"
        }
    ];

    return (
        <section className="py-16 -mt-16 relative z-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`${card.bgClass} relative overflow-hidden rounded-2xl shadow-xl group hover:-translate-y-2 transition-all duration-300`}
                        >
                            <div className="p-8 md:p-10 h-full flex flex-col items-start relative z-10">
                                <div className="mb-6 bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-inner group-hover:scale-110 transition-transform duration-300">
                                    {card.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{card.title}</h3>

                                <p className="text-blue-50/80 mb-8 leading-relaxed line-clamp-3">
                                    {card.desc}
                                </p>

                                <Link
                                    href={card.link}
                                    className="mt-auto inline-flex items-center text-white font-semibold group-hover:text-blue-200 transition-colors"
                                >
                                    Read More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Decorative Background Icon */}
                            <div className="absolute -bottom-8 -right-8 opacity-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-500 scale-150 text-white">
                                {card.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
