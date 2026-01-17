'use client';

import {
    Warehouse,
    MapPin,
    Truck,
    HeadphonesIcon,
    Clock4,
    Globe2
} from 'lucide-react';
import Image from 'next/image';

export default function WhyChooseUs() {
    const features = [
        { icon: <Warehouse />, label: "LARGEST WAREHOUSE" },
        { icon: <Globe2 />, label: "TRACKING SUPPORT" }, // Using Globe/Map for tracking
        { icon: <Truck />, label: "LOGISTIC SERVICES" },
        { icon: <HeadphonesIcon />, label: "CUSTOMER SUPPORT" },
        { icon: <Clock4 />, label: "DELIVERY IN TIME" },
        { icon: <MapPin />, label: "LARGE DESTINATIONS" },
    ];

    return (
        <section className="py-24 bg-gray-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Background Graphic */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 dark:bg-blue-900/10 -skew-x-12 transform translate-x-20 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Image/Visual Column */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4 mt-8">
                                    <div className="relative rounded-2xl overflow-hidden shadow-lg h-48 md:h-64">
                                        <Image
                                            src="/images/resource/image-1.jpg" // Original path
                                            alt="Warehouse"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="bg-blue-600 p-6 rounded-2xl shadow-lg text-white text-center flex flex-col items-center justify-center h-48 md:h-48">
                                        <div className="text-4xl font-bold mb-2">100%</div>
                                        <div className="text-sm uppercase tracking-wider font-medium opacity-90">Quality Assurance</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center h-48 md:h-48 border border-gray-100 dark:border-slate-700">
                                        <div className="text-4xl font-bold mb-2 text-blue-600">500+</div>
                                        <div className="text-sm uppercase tracking-wider font-medium text-gray-600 dark:text-gray-300">Satisfied Clients</div>
                                    </div>
                                    <div className="relative rounded-2xl overflow-hidden shadow-lg h-48 md:h-64">
                                        <Image
                                            src="/images/main-slider/3.jpg" // Using an existing slider image as fallback for variety
                                            alt="Logistics"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="sec-title mb-8">
                            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase block mb-2">Why You</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                CHOOSE <span className="text-blue-600">US</span>
                            </h2>
                            <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <div className="w-10 h-full bg-blue-600 rounded-full"></div>
                            </div>
                        </div>

                        <div className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                            Metal Ministry Inc. is well established & entrenched in the metal market. We consistently provide these products to many driving modern units comprising chemicals, petrochemical plants, paper factories, concrete plants, sugar processing units, and so forth.
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-slate-700">
                                    <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-slate-800 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <span className="font-bold text-gray-800 dark:text-gray-200 text-sm tracking-wide">
                                        {feature.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
