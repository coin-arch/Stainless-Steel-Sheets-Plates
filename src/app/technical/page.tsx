'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

import technicalData from '@/data/technical-data.json';

export default function TechnicalPage() {
    // Open first section by default
    const [openSection, setOpenSection] = useState<string | null>(technicalData[0]?.title || null);

    const toggleSection = (label: string) => {
        setOpenSection(prev => prev === label ? null : label);
    };

    const AccordionItem = ({ title, data }: { title: string, data: any[] }) => {
        const isOpen = openSection === title;
        return (
            <div className="border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden mb-4 shadow-sm bg-white dark:bg-slate-900 transition-all duration-300">
                <button
                    onClick={() => toggleSection(title)}
                    className={`w-full flex items-center justify-between p-5 text-left transition-colors ${isOpen ? 'bg-slate-800 text-white' : 'bg-gray-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200'}`}
                >
                    <span className="font-bold text-lg">{title}</span>
                    {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {isOpen && (
                    <div className="p-6 overflow-x-auto text-sm text-gray-600 dark:text-gray-300">
                        {data.map((section: any, idx: number) => (
                            <div key={idx} className="mb-8 last:mb-0">
                                {section.subTitle && section.subTitle !== 'Data Table' && (
                                    <h4 className="text-xl font-bold mb-4 text-blue-600">{section.subTitle}</h4>
                                )}
                                {section.text && (
                                    <p className="mb-4 whitespace-pre-wrap">{section.text}</p>
                                )}
                                {section.rows && section.rows.length > 0 && (
                                    <div className="border border-gray-200 rounded-lg">
                                        <table className="w-full divide-y divide-gray-200 text-xs md:text-sm">
                                            <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200">
                                                {section.rows.map((row: string[], rIdx: number) => (
                                                    <tr key={rIdx} className={rIdx === 0 ? "bg-gray-100 dark:bg-slate-800 font-bold" : "hover:bg-gray-50 dark:hover:bg-slate-800"}>
                                                        {row.map((cell: string, cIdx: number) => (
                                                            <td key={cIdx} className="px-1 md:px-2 py-2 border-r border-gray-100 dark:border-slate-800 last:border-0 align-top">
                                                                {cell}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">


            <main className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <h1 className="text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-300 mb-2">
                            Click Here To View Technical Data
                        </h1>
                        <div className="w-16 h-0.5 bg-blue-600 mx-auto opacity-50"></div>
                    </div>

                    <div className="space-y-4">
                        {technicalData.map((item, idx) => (
                            <AccordionItem key={idx} title={item.title} data={item.data} />
                        ))}
                    </div>
                </div>
            </main>


        </div>
    );
}
