"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
    {
        title: "Discovery & Strategy",
        desc: "We dive deep into your business requirements to build a bulletproof roadmap.",
        icon: Search,
        num: "01"
    },
    {
        title: "Design & Prototype",
        desc: "Crafting pixel-perfect, high-performance designs that users actually love.",
        icon: PenTool,
        num: "02"
    },
    {
        title: "Agile Development",
        desc: "Building scalable, clean, and secure code using modern tech stacks.",
        icon: Code2,
        num: "03"
    },
    {
        title: "Launch & Support",
        desc: "Seamless deployment followed by 24/7 technical monitoring and growth.",
        icon: Rocket,
        num: "04"
    }
];

const Process = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-bg-dark">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent hidden lg:block" />

            <div className="container relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-4"
                    >
                        Our Workflow
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black font-heading text-white tracking-tighter"
                    >
                        HOW WE DELIVER <span className="text-gradient">EXCELLENCE</span>
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group p-10 glass rounded-[40px] border-white/5 hover:border-brand-primary/20 transition-all duration-500 shadow-2xl"
                        >
                            <div className="absolute top-6 right-8 text-5xl font-black text-white/5 group-hover:text-brand-primary/10 transition-colors">
                                {step.num}
                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                <step.icon className="text-brand-primary" size={32} />
                            </div>

                            <h4 className="text-xl font-bold text-white mb-4 group-hover:text-brand-primary transition-colors">
                                {step.title}
                            </h4>
                            <p className="text-white/40 text-sm leading-relaxed font-medium">
                                {step.desc}
                            </p>

                            {/* Connector for desktop */}
                            {i < steps.length - 1 && (
                                <div className="absolute top-1/2 -right-4 w-8 h-px bg-white/5 hidden lg:block" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
