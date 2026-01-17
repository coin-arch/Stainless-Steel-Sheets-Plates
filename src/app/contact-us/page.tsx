import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function ContactUs() {
    return (
        <div className="bg-white dark:bg-slate-900">
            {/* 1. Page Banner */}
            <section className="relative h-[200px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/slider-3.jpg" // Using a generic slider image as contact banner background
                        alt="Contact Us Banner"
                        fill
                        className="object-cover brightness-50"
                    />
                </div>
                <div className="relative z-10 text-center text-white">
                    <h1 className="text-5xl font-bold mb-4 tracking-tight">Contact Us</h1>
                    <div className="flex justify-center gap-2 text-sm uppercase tracking-widest opacity-80">
                        <span>Home</span>
                        <span>/</span>
                        <span>Get In Touch</span>
                    </div>
                </div>
            </section>

            {/* 2. Contact Content */}
            <section className="py-24 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Info Column */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact Details</h2>
                            <p className="text-gray-600 dark:text-gray-400">Get in touch with us for any questions about our industries or projects.</p>
                        </div>

                        <div className="space-y-6">
                            {/* Address */}
                            <div className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl group hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Registered Office</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        517, Prasad Chambers, Tata Road No. 2, Opera House, Mumbai - 400004.
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl group hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Email Us</h4>
                                    <div className="flex flex-col text-sm text-gray-600 dark:text-gray-300">
                                        <a href="mailto:enquiry@metalministry.in" className="hover:text-blue-600">enquiry@metalministry.in</a>
                                        <a href="mailto:info@metalministry.in" className="hover:text-blue-600">info@metalministry.in</a>
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl group hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Mobile</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        +91-9892171042
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-slate-700">
                            <div className="mb-8">
                                <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">We are Metal Ministry Inc.</span>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Send a Message</h2>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="+91 12345 67890"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        placeholder="How can we help you?"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group"
                                >
                                    Send Message
                                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>

            {/* 3. Map Section */}
            <section className="h-[450px] w-full relative grayscale-[50%] hover:grayscale-0 transition-all duration-700">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d471.6798382797592!2d72.825325!3d18.956223!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce17abf17667%3A0xd7d5ab2f4be1759b!2sArdeshir%20Dadi%20St.%20%26%20CP%20Tank%20Cross%20Ln%2C%20Charni%20Road%20East%2C%20Cawasji%20Patel%20Tank%2C%20Bhuleshwar%2C%20Mumbai%2C%20Maharashtra%20400004!5e0!3m2!1sen!2sin!4v1603528910876!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Metal Ministry Inc Location"
                />
            </section>

        </div>
    );
}
