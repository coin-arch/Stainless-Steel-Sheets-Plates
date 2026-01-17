'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Minus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const SLIDES = [
    {
        id: 1,
        image: '/images/slider-1.jpg',
        subtitle: 'Key Manufacturer',
        title: 'Leading Manufacturer of Plates & Sheets',
        description: 'Specialized in Stainless Steel, Carbon Steel, and Alloy Steel Plates. Available in all grades including 304, 316, 904L.',
        cta: 'View Sheets & Plates',
        link: '/products/stainless-steel-sheets-plates-manufacturer-stockist'
    },
    {
        id: 2,
        image: '/images/slider-2.jpg',
        subtitle: 'Global Stockist',
        title: 'World\'s Largest Manufacturer of Strips & Coils',
        description: 'Premium quality Strips & Coils available in various widths, thicknesses, and finishes for diverse industrial applications.',
        cta: 'View Strips & Coils',
        link: '/products/strips-coils-manufacturer-stockist'
    },
    {
        id: 3,
        image: '/images/slider-3.jpg',
        subtitle: 'Custom Solutions',
        title: 'Premium Perforated Sheets & Chequered Plates',
        description: 'High-quality Perforated Sheets for filtration and Chequered Plates for industrial flooring and safety.',
        cta: 'View Perforated Sheets',
        link: '/products/perforated-sheets-manufacturer-stockist'
    }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent(prev => (prev + 1) % SLIDES.length);
    const prevSlide = () => setCurrent(prev => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-gray-900">
            {/* Background Slider */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
                    <Image
                        src={SLIDES[current].image}
                        alt={SLIDES[current].title}
                        fill
                        priority
                        className="object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Entry Animation Wrapper for Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center"
            >
                <div className="max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${current}`}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className=""
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block py-1 px-4 rounded-full bg-blue-600/90 text-white text-xs md:text-sm font-bold tracking-widest uppercase mb-6 shadow-lg shadow-blue-600/20"
                            >
                                {SLIDES[current].subtitle}
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white tracking-tight drop-shadow-xl shadow-black"
                            >
                                {SLIDES[current].title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl leading-relaxed font-light drop-shadow-md"
                            >
                                {SLIDES[current].description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Link
                                    href={SLIDES[current].link}
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/30"
                                >
                                    {SLIDES[current].cta} <ArrowRight size={20} />
                                </Link>
                                <Link
                                    href="/about-us"
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all hover:border-white/40 backdrop-blur-sm"
                                >
                                    Our Story
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Bottom Controls */}
            <div className="absolute bottom-10 inset-x-0 z-30 container mx-auto px-4">
                <div className="flex justify-between items-end border-t border-white/10 pt-6">
                    {/* Progress Bars */}
                    <div className="flex gap-4 flex-1 max-w-md">
                        {SLIDES.map((slide, idx) => (
                            <button
                                key={slide.id}
                                onClick={() => setCurrent(idx)}
                                className="group relative h-1 sm:h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden transition-all hover:h-2"
                            >
                                <span className="absolute inset-0 bg-white/20 group-hover:bg-white/40 transition-colors" />
                                {idx === current && (
                                    <motion.div
                                        layoutId="activeSlide"
                                        className="absolute inset-0 bg-blue-500"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 6, ease: "linear" }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Arrows */}
                    <div className="flex gap-3 ml-8">
                        <button
                            onClick={prevSlide}
                            className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all transform hover:scale-110 active:scale-95 backdrop-blur-md"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all transform hover:scale-110 active:scale-95 backdrop-blur-md"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
