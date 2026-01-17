import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import WhoWeAre from '@/components/home/WhoWeAre';
import FeatureCards from '@/components/home/FeatureCards';

export default function AboutUs() {
    return (
        <div className="bg-white dark:bg-slate-900">
            {/* 1. Page Banner */}
            <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        // src="/images/background/about-page-title-bg.jpg" // Using legacy image path if exists, otherwise Next/Image will error, handled safely usually or need fallback. 
                        // Since I haven't verified if this specific bg exists, I'll use a safer robust path or a fallback pattern in real app.
                        // For now, I'll try to use a generic one if this specific one is missing in my list.
                        // Checking file list: I see 'background/about-page-title-bg.jpg' is NOT in the file list I saw earlier (only bg.jpg, bg2.png in /images).
                        // I will use a placeholder/fallback to avoid broken image.
                        src="/images/slider-1.jpg"
                        alt="About Us Banner"
                        fill
                        className="object-cover brightness-50"
                    />
                </div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-5xl font-bold mb-4 tracking-tight">About Metal Ministry Inc.</h1>
                    <div className="flex justify-center gap-2 text-sm uppercase tracking-widest opacity-80">
                        <span>Home</span>
                        <span>/</span>
                        <span>About Us</span>
                    </div>
                </div>
            </section>

            {/* 2. Introduction & Vision (Legacy "Fun Facts" / Intro) */}
            <section className="py-20 container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600">
                            <Quote size={32} />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                        Metal Ministry Inc. is a leading Exporter of <span className="text-blue-600">Stainless Steel & Nickel Alloys</span>
                    </h2>
                    <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        <p>
                            We specialize in <strong>Stainless Steel, Nickel Alloy, Duplex Steel & Cupro Nickel</strong> alloys along with other Ferrous & Non-Ferrous metals.
                            Our product range includes Exotic Special Pipe Fittings, Flanges, Fasteners, Perforated Sheets, Instrumentation Fittings,
                            Compression Tube Fittings, Precision CNC Components, Sheets, Plates, and custom drawings as per client requirements.
                        </p>
                        <p>
                            All products manufactured at Metal Ministry Inc. adhere to standards like <strong>ASTM, ASME, DIN, JIS, and EN</strong>.
                            These products are available with Mill TC or 3rd party Inspection as per client requirement, ensuring the best quality.
                        </p>
                        <p>
                            Our products serve critical industries such as <strong>Aerospace, Chemical Processing, Motorsport, Oil & Gas, Power Generation,
                                Thermal Processing, Petrochemicals, Refineries, Pharmaceutical & Bio-Synthetics</strong>.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Reused Innovation Section ("Who We Are") */}
            <WhoWeAre />

            {/* 4. Reused Services Section ("Feature Cards") */}
            <div className="bg-gray-50 dark:bg-slate-950 pb-20 pt-10">
                <div className="container mx-auto px-4 mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Core Commitments</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
                </div>
                <FeatureCards />
            </div>

        </div>
    );
}
