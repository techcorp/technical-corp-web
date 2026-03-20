"use client";

import React from "react";
import { Download, FileText, Globe, Zap, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const TermsConditions = () => {
    const sections = [
        {
            title: "License to Use Assets",
            icon: ShieldCheck,
            content: "Purchased digital assets (PDFs, Prompt Packs, Source Code) include a non-exclusive, worldwide license to use for personal or commercial projects. You may not resell individual assets as-is or redistribute them as part of a competitor marketplace. Modification for your own work is fully permitted."
        },
        {
            title: "Digital Delivery Protocol",
            icon: Zap,
            content: "Assets are delivered instantly upon successful payment. Each asset contains a unique cryptographic identifier tied to your account. We do not provide refunds for digital assets once the unique download link is generated, unless required by specific local consumer protection laws."
        },
        {
            title: "Fair Use Policy",
            icon: FileText,
            content: "We utilize automated monitoring to prevent unauthorized redistribution. Each account allows up to 5 unique IPs for asset access. Excessive or high-risk behavior may result in temporary account lockout. For enterprise-level licensing, contact our corporate office."
        },
        {
            title: "Modification of Terms",
            icon: Globe,
            content: "Technical Corp reserves the right to modify these protocols at any time. Significant changes will be broadcast to all registered digital nodes (users) via their primary communication address. Current terms supersede all previous versions."
        }
    ];

    return (
        <main className="min-h-screen pt-40 pb-20 bg-bg-dark relative overflow-hidden">
            <div className="hero-mesh opacity-20" />
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[150px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container relative z-10 max-w-4xl mx-auto px-6">
                <Link href="/" className="inline-flex items-center gap-3 text-white/40 hover:text-brand-primary transition-all text-xs font-black uppercase tracking-[0.2em] mb-12 group">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary/50 transition-all">
                        <ArrowLeft size={14} />
                    </div>
                    Back Home
                </Link>

                <div className="mb-16 text-right">
                    <h2 className="text-xs font-black text-brand-primary uppercase tracking-[0.5em] mb-6">Service Protocol</h2>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none mb-8">
                        Terms & <br /><span className="text-gradient">Conditions</span>
                    </h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Version: 2.1.2026</p>
                </div>

                <div className="space-y-12">
                    {sections.map((section, i) => (
                        <motion.section
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-10 rounded-[40px] border border-white/10 hover:border-brand-primary/30 transition-all group"
                        >
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                                    <section.icon size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">{section.title}</h3>
                            </div>
                            <p className="text-white/60 leading-relaxed font-medium">
                                {section.content}
                            </p>
                        </motion.section>
                    ))}
                </div>

                <div className="mt-20 p-12 rounded-[48px] bg-white/[0.03] border border-white/5 text-center">
                    <p className="text-white/20 text-xs font-black uppercase tracking-widest leading-loose">
                        Technical Corp assets are the property of their respective digital architects. 
                        Unauthorized redistribution will be filtered by our legal security layer.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default TermsConditions;
