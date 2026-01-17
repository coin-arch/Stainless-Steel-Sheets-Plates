'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import navData from '@/lib/nav-data.json';
import { ChevronRight, Mail, Phone, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
    const pathname = usePathname();
    const [openCategory, setOpenCategory] = useState<string | null>(null);

    // Auto-open the category that contains the current active link
    useEffect(() => {
        if (pathname) {
            const activeCat = navData.find(cat => cat.items.some(item => item.href === pathname));
            if (activeCat) {
                setOpenCategory(activeCat.label);
            }
        }
    }, [pathname]);

    const toggleCategory = (label: string) => {
        setOpenCategory(prev => prev === label ? null : label);
    };

    return (
        <aside className="w-full lg:w-1/4 px-4 border-l border-gray-100 dark:border-slate-800">
            <div className="sticky top-20 space-y-6">

                {/* Collapsible Categories */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
                    {navData.map((category) => {
                        const isOpen = openCategory === category.label;
                        const hasActiveItem = category.items.some(i => i.href === pathname);

                        return (
                            <div key={category.label} className="border-b border-gray-100 dark:border-slate-800 last:border-0">
                                <button
                                    onClick={() => toggleCategory(category.label)}
                                    className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isOpen || hasActiveItem ? 'bg-blue-50/50 dark:bg-slate-800/50 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200'}`}
                                >
                                    <span className="font-bold text-sm flex items-center gap-2">
                                        <span className={`p-1 rounded-full ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                            {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                                        </span>
                                        {category.label}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <ul className="space-y-1 p-3 bg-gray-50/30 dark:bg-slate-900/30">
                                                {category.items.map((item) => {
                                                    const isActive = pathname === item.href;
                                                    return (
                                                        <li key={item.href}>
                                                            <Link
                                                                href={item.href}
                                                                className={`flex items-center justify-between text-xs py-2 px-3 rounded-md transition-all ${isActive ? 'bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-blue-300 font-bold border-l-4 border-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800'}`}
                                                            >
                                                                <span className="line-clamp-1">{item.label}</span>
                                                                {isActive && <ChevronRight size={12} />}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                                {category.items.length === 0 && (
                                                    <li className="text-xs text-gray-400 italic pl-3 p-2">Coming Soon</li>
                                                )}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Contact Widget - Preserved */}
                <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />

                    <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                        <Mail size={18} className="text-blue-400" /> Request a Quote
                    </h3>

                    <form className="space-y-3 relative z-10">
                        <div>
                            <input type="text" placeholder="Your Name" className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-white" />
                        </div>
                        <div>
                            <input type="email" placeholder="Email Address" className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-white" />
                        </div>
                        <div>
                            <input type="tel" placeholder="Phone Number" className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-white" />
                        </div>
                        <div>
                            <textarea placeholder="Message / Requirements" rows={3} className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500 text-white"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-900/50 text-sm">
                            Send Enquiry
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-3 mb-2">
                            <Phone size={16} className="text-blue-400" />
                            <a href="tel:+919892171042" className="text-slate-300 hover:text-white text-sm transition-colors">+91-9892171042</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={16} className="text-blue-400" />
                            <a href="mailto:enquiry@metalministry.in" className="text-slate-300 hover:text-white text-sm transition-colors">enquiry@metalministry.in</a>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    );
}
