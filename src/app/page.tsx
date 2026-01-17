'use client';

import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/HeroSlider';
import Marquee from '@/components/Marquee';
import { ArrowRight, Globe, ShieldCheck, Users, Clock } from 'lucide-react';
import WhoWeAre from '@/components/home/WhoWeAre';
import FeatureCards from '@/components/home/FeatureCards';
import WhyChooseUs from '@/components/home/WhyChooseUs';

import { getImageForProduct } from '@/lib/image-mapper';

const PRODUCTS = [
  {
    title: "Stainless Steel Sheets",
    desc: "304, 304L, 316, 316L, 310, 321, 904L. Premium Finish.",
    slug: "stainless-steel-sheets-plates-manufacturer-stockist",
    link: "/products/stainless-steel-sheets-plates-manufacturer-stockist",
    size: "large" // 2x2
  },
  {
    title: "Strips & Coils",
    desc: "Precision Slit Coils in Stainless, Carbon & Alloys. Custom Widths.",
    slug: "strips-coils-manufacturer-stockist",
    link: "/products/strips-coils-manufacturer-stockist",
    size: "tall" // 1x2
  },
  {
    title: "Perforated Sheets",
    desc: "Round, Square, Hexagonal Holes. For Industrial Filtration.",
    slug: "perforated-sheets-manufacturer-stockist",
    link: "/products/perforated-sheets-manufacturer-stockist",
    size: "standard"
  },
  {
    title: "Chequered Plates",
    desc: "Anti-skid Flooring Plates. Diamond Pattern.",
    slug: "stainless-steel-chequered-plates-manufacturer-stockist",
    link: "/products/stainless-steel-chequered-plates-manufacturer-stockist",
    size: "standard"
  },
  {
    title: "Duplex Steel Plates",
    desc: "UNS S31803, S32205. High Strength & Corrosion Resistance.",
    slug: "duplex-steel-sheets-plates-manufacturer-stockist",
    link: "/products/duplex-steel-sheets-plates-manufacturer-stockist",
    size: "wide" // 2x1
  },
  {
    title: "High Nickel Alloys",
    desc: "Monel, Inconel, Hastelloy Sheets & Plates.",
    slug: "nickel-alloy-sheets-plates-manufacturer-stockist",
    link: "/products/nickel-alloy-sheets-plates-manufacturer-stockist",
    size: "wide"
  },
  {
    title: "17-4PH Sheets",
    desc: "High Strength, Precipitation Hardening Stainless Steel.",
    slug: "stainless-steel-17-4ph-sheets-plates-manufacturer-stockist",
    link: "/products/stainless-steel-17-4ph-sheets-plates-manufacturer-stockist",
    size: "wide"
  },
  {
    title: "Super Duplex Plates",
    desc: "S32750 / S32760. Extreme Corrosion Resistance.",
    slug: "super-duplex-steel-sheets-plates-manufacturer-stockist",
    link: "/products/super-duplex-steel-sheets-plates-manufacturer-stockist",
    size: "wide"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-[var(--font-outfit)]">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Feature Cards (Services) */}
      <FeatureCards />

      {/* 3. Who We Are (Innovation Section) */}
      <WhoWeAre />

      {/* 4. Our Products Grid - Bento Layout */}
      <section className="py-32 bg-gray-50 dark:bg-slate-950 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm block mb-4">Our Catalog</span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Engineered</span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-6">
            {PRODUCTS.map((product, idx) => (
              <div
                key={idx}
                className={`group relative rounded-3xl overflow-hidden border border-white/20 shadow-xl bg-gray-900 
                  ${product.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                  ${product.size === 'wide' ? 'md:col-span-2' : ''}
                  ${product.size === 'tall' ? 'md:row-span-2' : ''}
                  hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500
                `}
              >
                {/* Image */}
                <div className="absolute inset-0 h-full w-full">
                  <Image
                    src={getImageForProduct(product.slug)}
                    alt={product.title}
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/40 to-gray-900/90 group-hover:to-gray-900/80 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {product.size === 'large' && (
                      <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 inline-block shadow-lg">
                        MOST POPULAR
                      </span>
                    )}

                    <h3 className={`font-bold text-white mb-3 text-shadow-sm group-hover:text-blue-200 transition-colors
                      ${product.size === 'large' ? 'text-4xl' : 'text-2xl'}
                    `}>
                      {product.title}
                    </h3>

                    <div className={`overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:max-h-24 max-h-0`}>
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        {product.desc}
                      </p>
                      <Link
                        href={product.link}
                        className="inline-flex items-center text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                      >
                        Explore Product <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Decorative Shine Effect */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-24 h-24 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/products" className="group inline-flex items-center gap-3 px-10 py-5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-bold tracking-wide shadow-xl hover:shadow-blue-600/30 border border-gray-200 dark:border-slate-700">
              View Complete Catalog
              <span className="bg-gray-100 dark:bg-slate-700 group-hover:bg-white/20 text-blue-600 group-hover:text-white rounded-full p-1 transition-colors">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <WhyChooseUs />


      {/* 5. Clients Section */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 mb-16 text-center">
          <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">Trust & Partnership</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-6">Some Honorable Clients</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
            We are proud to serve industry leaders across the globe. Our commitment to quality has earned us the trust of prestigious organizations.
          </p>
        </div>

        <div className="container mx-auto px-4">
          <Marquee speed={10} className="py-4">
            {/* Manually listed based on user request - using placeholders if specific files dont exist, but trying to map to what we have */}
            {[
              { name: 'Valvitalia', img: '/images/clients/factory-1.png' },
              { name: 'Tata Steel', img: '/images/clients/factory-2.png' },
              { name: 'Ulma', img: '/images/clients/factory-3.png' },
              { name: 'Erne Fittings', img: '/images/clients/factory-4.png' },
              { name: 'US Steel', img: '/images/clients/factory-5.png' },
              { name: 'Client 6', img: '/images/partner01.png' },
              { name: 'Client 7', img: '/images/partner02.png' },
              { name: 'Client 8', img: '/images/partner03.png' },
            ].map((client, idx) => (
              <div key={idx} className="relative w-32 h-20 md:w-44 md:h-24 mx-8 hover:scale-110 transition-transform duration-300">
                <Image
                  src={client.img}
                  alt={client.name}
                  fill
                  className="object-contain" // Removed grayscale class
                  onError={(e) => {
                    // Fallback to text if image fails
                    // (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </section>



      {/* 7. Contact CTA - Enhanced Redesign */}
      <section className="py-28 relative overflow-hidden">

        {/* Deep Industrial Background */}
        <div className="absolute inset-0 p-0 m-0">
          <Image
            src="/images/slider-1.jpg"
            alt="Background"
            fill
            className="object-cover blur-[2px] brightness-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-slate-900/90 to-blue-900/90 mix-blend-multiply" />
        </div>

        {/* Animated Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-700" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/5 rounded-3xl p-8 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Glass Shine */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Elevate</span> Your Project?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              We specialize in <strong className="text-white">bulk orders</strong> and <strong className="text-white">custom specifications</strong>.
              Our engineering team is ready to deliver precision with speed.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/contact-us" className="group relative bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Get Custom Quote <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12" />
              </Link>

              <div className="flex items-center gap-4 text-white/90">
                <div className="h-12 w-[1px] bg-white/20 hidden sm:block" />
                <div className="text-left">
                  <div className="text-xs uppercase tracking-widest text-blue-300 mb-1">Direct Line</div>
                  <a href="tel:+919892171042" className="text-xl font-bold hover:text-white transition-colors">
                    +91-9892171042
                  </a>
                </div>
              </div>
            </div>

            {/* Decorative Bottom Text */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-6 text-sm text-blue-200/60 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Fast Response</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Global Delivery</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> ISO Certified</span>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Stainless Steel Sheets & Plates (Metal Ministry Inc.)",
            "url": "https://metalministry.in",
            "logo": "https://metalministry.in/images/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9892171042",
              "contactType": "sales",
              "areaServed": "Global"
            },
            "sameAs": [
              "https://www.facebook.com/metalministry",
              "https://www.linkedin.com/company/metalministry"
            ]
          })
        }}
      />
    </div >
  );
}
