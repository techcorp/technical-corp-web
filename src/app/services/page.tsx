"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { services, type Service } from "@/data/services";
import ActionButtons from "@/components/shared/ActionButtons";
import { CheckCircle2 } from "lucide-react";

const ServicesPage = () => {
    return (
        <div className="pt-40 pb-32">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mb-24"
                >
                    <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-primary mb-6">Our Expertise</h1>
                    <h2 className="text-5xl md:text-7xl font-black font-heading text-white mb-8">
                        Digital Services <br />
                        Built for <span className="text-gradient">Scale</span>
                    </h2>
                    <p className="text-xl text-white/50 leading-relaxed max-w-2xl">
                        From troubleshooting individual systems to architecting complex AI applications, we provide the technical foundation your business needs to excel.
                    </p>
                </motion.div>

                <div className="space-y-32">
                    {services.map((service: Service, index) => (
                        <motion.div
                            key={service.id}
                            id={service.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="flex flex-col lg:flex-row gap-16 items-start"
                        >
                            <div className="lg:w-1/2">
                                <div className="w-20 h-20 rounded-3xl bg-brand-primary/10 flex items-center justify-center mb-10 transition-transform hover:scale-110">
                                    <service.icon size={40} className="text-brand-primary" />
                                </div>
                                <h3 className="text-4xl font-black font-heading text-white mb-6 uppercase tracking-tight">
                                    {service.title}
                                </h3>
                                <p className="text-lg text-white/60 mb-10 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                                    {service.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle2 size={18} className="text-brand-primary shrink-0" />
                                            <span className="text-white/80 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="hidden lg:block">
                                    <ActionButtons serviceName={service.title} horizontal />
                                </div>
                            </div>

                            <div className="lg:w-1/2 w-full">
                                <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden glass border border-white/5 group shadow-2xl">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-bg-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <service.icon size={120} className="text-white/10 group-hover:scale-125 transition-transform duration-700 blur-sm" />
                                    </div>

                                    {/* Mobile Action Buttons Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-8 lg:hidden bg-gradient-to-t from-bg-dark to-transparent">
                                        <ActionButtons serviceName={service.title} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
