'use client';

import React from 'react';

export default function ImageBlock({ src, alt }: { src: string, alt: string }) {
    return (
        <figure className="my-8 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.01] duration-500 bg-white dark:bg-slate-900 p-2 max-w-2xl mx-auto border border-gray-100 dark:border-slate-800">
            <img
                src={src.startsWith('http') || src.startsWith('/') ? src : `/${src}`}
                alt={alt}
                className="w-auto h-auto max-w-full mx-auto max-h-[500px] object-contain rounded-xl"
                loading="lazy"
            />
            {alt && (
                <figcaption className="mt-2 text-xs text-center text-gray-400 italic">
                    {alt}
                </figcaption>
            )}
        </figure>
    );
}
