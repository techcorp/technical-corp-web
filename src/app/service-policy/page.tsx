"use client";

import React from "react";
import { Headphones, CheckCircle2, ShieldCheck, Mail, ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const ServicePolicy = () => {
    const sections = [
        {
            title: "Support Protocol (SLA)",
            icon: Headphones,
            content: "Technical Corp provides priority technical support for all acquired assets. Our standard Service Level Agreement (SLA) ensures a response time of under 15 minutes for critical delivery issues and under 48 hours for general technical inquiries."
        },
        {
            title: "Asset Integrity Guarantee",
            icon: ShieldCheck,
            content: "We guarantee that all digital assets provided are verified and audited by our core engineering team. Each prompt pack or code asset is checked for performance and compatibility with current industry standards (e.g., OpenAI, Anthropic, or Framework updates)."
        },
        {
            title: "Service Boundaries",
            icon: Terminal,
            content: "Our standard service covers asset delivery and basic deployment guidance. Custom implementation, advanced troubleshooting, or system integration beyond the asset description is categorized as 'Technical Consulting' and may require a separate service agreement."
        },
        {
            title: "Communications Hub",
            icon: Mail,
            content: "The primary channel for service requests is support@technicalcorpofficial.com. We do not provide official technical support via social media direct messages (DMs) to ensure your requests are accurately tracked and recorded."
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
                    <h2 className="text-xs font-black text-brand-primary uppercase tracking-[0.5em] mb-6">Operations Layer</h2>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none mb-8">
                        Service <br /><span className="text-gradient">Policy</span>
                    </h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Protocol Version: 2.1.0-MAR26</p>
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
                        Service delivery is tracked via digital logs. 
                        Technical Corp aims for 99.9% uptime for all fulfillment nodes.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ServicePolicy;
