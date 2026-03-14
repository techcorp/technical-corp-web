"use client";

import React from "react";
import { motion } from "framer-motion";

const technologies = [
    { name: "Next.js", logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
    { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
    { name: "AWS", logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
    { name: "OpenAI", logo: "https://cdn.worldvectorlogo.com/logos/openai-2.svg" },
    { name: "Supabase", logo: "https://cdn.worldvectorlogo.com/logos/supabase-1.svg" },
    { name: "Tailwind", logo: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg" },
    { name: "TypeScript", logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
    { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
];

const Partners = () => {
    return (
        <section className="py-20 bg-bg-dark/50 border-y border-white/5 overflow-hidden">
            <div className="container mb-12 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                    Powering innovation with the world&apos;s best technologies
                </p>
            </div>

            <div className="flex relative items-center overflow-hidden">
                <div className="flex animate-grid-shift whitespace-nowrap min-w-full gap-20 items-center justify-around py-4">
                    {/* Duplicate set for seamless loop */}
                    {[...technologies, ...technologies].map((tech, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
                        >
                            <img src={tech.logo} alt={tech.name} className="h-8 w-auto object-contain" />
                            <span className="text-white font-black uppercase tracking-widest text-sm">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
