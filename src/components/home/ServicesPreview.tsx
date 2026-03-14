"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { services, type Service } from "@/data/services";

const ServicesPreview = () => {
    return (
        <section className="py-32 bg-bg-dark relative overflow-hidden">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-4">What We Do</h2>
                        <h3 className="text-4xl md:text-5xl font-black font-heading text-white">
                            Advanced Services for <br />
                            Digital Transformation
                        </h3>
                    </div>
                    <Link href="/services" className="group flex items-center gap-2 text-white/60 hover:text-brand-primary transition-colors font-bold uppercase tracking-widest text-xs">
                        View All Services
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service: Service, index: number) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-10 rounded-3xl group flex flex-col h-full relative overflow-hidden"
                        >
                            {/* Hover Image Overlay */}
                            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover scale-150 group-hover:scale-100 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-bg-dark/80" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-8 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-bg-dark transition-all duration-500">
                                    <service.icon size={32} />
                                </div>
                                <h4 className="text-2xl font-bold mb-4 text-white">{service.title}</h4>
                                <p className="text-white/60 mb-8 flex-grow leading-relaxed group-hover:text-white/80 transition-colors">
                                    {service.description}
                                </p>

                                <div className="mt-auto">
                                    <Link
                                        href="/services"
                                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all"
                                    >
                                        Learn More
                                        <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesPreview;
