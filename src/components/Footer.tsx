'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
        href={href}
        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
    >
        <span className="w-1 h-1 bg-blue-600 rounded-full" />
        {children}
    </Link>
);

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
    <a
        href={href}
        className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-all text-white hover:-translate-y-1 block"
    >
        {icon}
    </a>
);

export default function Footer() {
    return (
        <footer className="bg-gray-950 pt-20 pb-10 border-t border-gray-900 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="block">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/logo.png"
                                alt="Forged Fittings Manufacturer"
                                className="h-20 w-auto brightness-0 invert opacity-90"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            ISO 9001:2015 Certified Manufacturer & Exporter of High-Pressure Forged Fittings.
                            Specializing in Stainless Steel, Carbon Steel, and High Nickel Alloys.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink icon={<Facebook size={18} />} href="#" />
                            <SocialLink icon={<Twitter size={18} />} href="#" />
                            <SocialLink icon={<Linkedin size={18} />} href="#" />
                            <SocialLink icon={<Instagram size={18} />} href="#" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><FooterLink href="/">Home</FooterLink></li>
                            <li><FooterLink href="/about-us">About Company</FooterLink></li>
                            <li><FooterLink href="/quality">Quality Policy</FooterLink></li>
                            <li><FooterLink href="/certificates">Certificates</FooterLink></li>
                            <li><FooterLink href="/blogs">Industry Blog</FooterLink></li>
                            <li><FooterLink href="/contact-us">Contact Us</FooterLink></li>
                        </ul>
                    </div>

                    {/* Core Products */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Sheets & Plates</h4>
                        <ul className="space-y-4">
                            <li><FooterLink href="/products/stainless-steel-sheets-plates-manufacturer-stockist">Stainless Steel Sheets</FooterLink></li>
                            <li><FooterLink href="/products/strips-coils-manufacturer-stockist">Strips & Coils</FooterLink></li>
                            <li><FooterLink href="/products/perforated-sheets-manufacturer-stockist">Perforated Sheets</FooterLink></li>
                            <li><FooterLink href="/products/stainless-steel-chequered-plates-manufacturer-stockist">Chequered Plates</FooterLink></li>
                            <li><FooterLink href="/products/duplex-steel-sheets-plates-manufacturer-stockist">Duplex Steel Plates</FooterLink></li>
                            <li><FooterLink href="/products/nickel-alloy-sheets-plates-manufacturer-stockist">Nickel Alloy Plates</FooterLink></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center shrink-0 text-blue-400">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h5 className="text-white font-medium mb-1">Head Office</h5>
                                    <p className="text-gray-400 text-sm">
                                        Prasad Chambers, Tata Rd No 2, <br />
                                        Charni Road East, Opera House,<br />
                                        Girgaon, Mumbai - 400004
                                    </p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center shrink-0 text-blue-400">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h5 className="text-white font-medium mb-1">Phone</h5>
                                    <a href="tel:+919892171042" className="text-gray-400 text-sm hover:text-white transition-colors block">+91-9892171042</a>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center shrink-0 text-blue-400">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h5 className="text-white font-medium mb-1">Email</h5>
                                    <a href="mailto:enquiry@metalministry.in" className="text-gray-400 text-sm hover:text-white transition-colors block">enquiry@metalministry.in</a>
                                    <a href="mailto:info@metalministry.in" className="text-gray-400 text-sm hover:text-white transition-colors block">info@metalministry.in</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Metal Ministry Inc. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
