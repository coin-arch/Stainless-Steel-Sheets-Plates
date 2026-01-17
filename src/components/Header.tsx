'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, Mail, Menu, X, ArrowRight } from 'lucide-react';
import navData from '@/lib/nav-data.json';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    const handleMouseEnter = (menu: string) => setActiveDropdown(menu);
    const handleMouseLeave = () => setActiveDropdown(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isTransparent = isHomePage && !isScrolled;
    const textColorClass = isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-blue-600';
    const logoClass = isTransparent ? 'brightness-0 invert drop-shadow-md' : '';

    return (
        <header
            className={`z-50 transition-all duration-300 border-b 
            ${isHomePage ? 'fixed top-0 left-0 right-0' : 'sticky top-0 bg-white shadow-sm'}
            ${isTransparent ? 'bg-transparent border-white/10 py-4' : 'bg-white/95 backdrop-blur-md border-gray-100 shadow-sm py-2'}
            `}
        >
            {/* Top Strip - Only on Home Page */}
            {isHomePage && (
                <div className={`absolute top-0 left-0 w-full overflow-hidden transition-all duration-500 ${isScrolled ? 'h-0 opacity-0' : 'h-8 opacity-100 bg-black/40 backdrop-blur-sm'}`}>
                    <div className="w-full h-full flex items-center">
                        <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs font-medium tracking-widest text-white/90 uppercase px-4">
                            <span>ISO 9001:2015 Certified Manufacturer of Sheets, Plates & Coils</span>
                            <span><Mail size={12} className="inline mr-1" /> enquiry@metalministry.in</span>
                            <span><Phone size={12} className="inline mr-1" /> +91-9892171042</span>
                            <span>Global Exporter of Stainless Steel & Alloys</span>
                            <span> </span>
                            <span>ISO 9001:2015 Certified Manufacturer of Sheets, Plates & Coils</span>
                            <span><Mail size={12} className="inline mr-1" /> enquiry@metalministry.in</span>
                            <span><Phone size={12} className="inline mr-1" /> +91-9892171042</span>
                            <span>Global Exporter of Stainless Steel & Alloys</span>
                        </div>
                    </div>
                </div>
            )}

            <div className={`container mx-auto px-4 transition-all duration-300 ${isTransparent ? 'mt-6' : 'mt-0'}`}>
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 relative group z-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/icons/logo-icon.png"
                            alt="Metal Ministry Inc. Logo"
                            className={`h-16 md:h-20 w-auto object-contain transition-all duration-500 ${logoClass}`}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex gap-6 items-center">
                        <Link href="/" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Home
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link href="/about-us" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            About
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>

                        {/* Dynamic Categories */}
                        {navData.map((category) => (
                            <div
                                key={category.label}
                                className="relative group h-full"
                                onMouseEnter={() => handleMouseEnter(category.label)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className={`flex items-center gap-1 ${textColorClass} font-bold tracking-wide text-sm uppercase py-4 group`}>
                                    {category.label} <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === category.label ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {activeDropdown === category.label && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full -left-10 w-[300px] bg-white/95 backdrop-blur-xl shadow-2xl rounded-lg border border-gray-100 overflow-hidden flex flex-col p-4"
                                        >
                                            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar flex flex-col gap-2">
                                                {category.items.length > 0 ? (
                                                    category.items.map((item) => (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            className="text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-all"
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400 text-xs p-2">Coming Soon</span>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        <Link href="/technical" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Technical
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>

                        <Link href="/blogs" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Blogs
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>

                        <Link href="/contact-us" className={`${textColorClass} font-bold tracking-wide text-sm uppercase transition-colors relative group py-2`}>
                            Contact
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden lg:block shrink-0">
                        <Link href="/contact-us" className={`px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-blue-500/40 hover:-translate-y-1 transition-all text-base flex items-center gap-2 whitespace-nowrap tracking-wide border ${!isTransparent ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white border-transparent' : 'bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white hover:text-blue-900'}`}>
                            Get Quote <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className={`lg:hidden ${textColorClass}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div >

            {/* Mobile Menu */}
            <AnimatePresence>
                {
                    mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: '100vh', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto"
                        >
                            <nav className="p-6 flex flex-col space-y-6 mt-10 pb-20">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800">Home</Link>
                                <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800">About Us</Link>

                                {/* Dynamic Mobile Links */}
                                {navData.map((category) => (
                                    <div key={category.label}>
                                        <div className="text-2xl font-bold text-gray-800 mb-2">{category.label}</div>
                                        <div className="flex flex-col gap-2 pl-4 border-l-2 border-gray-100">
                                            {category.items.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="text-lg text-gray-600 hover:text-blue-600"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <Link href="/certificates" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800">Certificates</Link>
                                <Link href="/blogs" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-800">Blogs</Link>
                                <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-blue-600 mt-4">Contact Us</Link>
                            </nav>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </header >
    );
}
