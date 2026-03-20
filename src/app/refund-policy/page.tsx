"use client";

import React from "react";
import { RefreshCw, XCircle, AlertCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const RefundPolicy = () => {
    const sections = [
        {
            title: "Digital Asset Nature",
            icon: ShoppingBag,
            content: "Due to the intangible and irrevocable nature of digital products (Prompts, Code Packs, PDF Guides), all sales are considered final once the digital fulfillment link is generated. Technical Corp does not offer 'change of mind' refunds after the asset has been added to your dashboard."
        },
        {
            title: "Technical Failure",
            icon: RefreshCw,
            content: "If you experience a verified technical failure where the asset is corrupted or inaccessible from our servers, we will provide a new download link or a replacement asset of equal value within 48 hours. Please contact technical support with your Order ID."
        },
        {
            title: "Refund Exceptions",
            icon: AlertCircle,
            content: "Refunds may be processed at our sole discretion if: (1) A duplicate transaction occurs for the same item within 24 hours. (2) The product description is fundamentally misleading as determined by our audit team. (3) Local mandatory consumer protection laws require a cooling-off period."
        },
        {
            title: "Request Process",
            icon: XCircle,
            content: "To initiate a formal review, email support@technicalcorpofficial.com with the subject line 'REFUND REQUEST: [Order ID]'. Our risk management team will review the cryptographic access logs for that asset and respond within 3 to 5 business days."
        }
    ];

    return (
        <main className="min-h-screen pt-40 pb-20 bg-bg-dark relative overflow-hidden">
            <div className="hero-mesh opacity-20" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container relative z-10 max-w-4xl mx-auto px-6">
                <Link href="/" className="inline-flex items-center gap-3 text-white/40 hover:text-brand-primary transition-all text-xs font-black uppercase tracking-[0.2em] mb-12 group">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary/50 transition-all">
                        <ArrowLeft size={14} />
                    </div>
                    Back Home
                </Link>

                <div className="mb-16">
                    <h2 className="text-xs font-black text-brand-primary uppercase tracking-[0.5em] mb-6">Service Protocol</h2>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none mb-8">
                        Refund <br /><span className="text-gradient">Policy</span>
                    </h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Effective Date: March 20, 2026</p>
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
                        Technical Corp assets are digital intellectual property. 
                        Downloading or viewing the asset constitutes a successful fulfillment of service.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default RefundPolicy;
