"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Youtube,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    MessageCircle,
    Cpu
} from "lucide-react";
import { siteConfig } from "@/config/site";

const Footer = () => {
    const pathname = usePathname();

    if (pathname?.startsWith("/secure-admin-dashboard")) {
        return null;
    }

    return (
        <footer className="bg-bg-dark border-t border-white/5 pt-32 pb-10">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="flex items-center mb-8 group">
                        <div className="relative h-12 w-56 transition-transform group-hover:scale-105 duration-300 mix-blend-screen filter invert brightness-[2]">
                            <img
                                src="/logo-new.png"
                                alt="Technical Corp Logo"
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </Link>
                    <p className="text-white/40 mb-8 leading-relaxed text-sm max-w-xs">
                        Leading the digital frontier with cutting-edge IT solutions, AI development, and cybersecurity for global businesses.
                    </p>
                    <div className="flex gap-4">
                        <a href={siteConfig.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-brand-primary hover:border-brand-primary/50 transition-all">
                            <Youtube size={18} />
                        </a>
                        <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-brand-primary hover:border-brand-primary/50 transition-all">
                            <Instagram size={18} />
                        </a>
                        <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-brand-primary hover:border-brand-primary/50 transition-all">
                            <Linkedin size={18} />
                        </a>
                        <a href={siteConfig.socials.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-brand-primary hover:border-brand-primary/50 transition-all">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="w-4.5 h-4.5"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.14-.1-.27-.2-.41-.31v8.46c.02 1.34-.14 2.69-.53 3.98-.44 1.48-1.32 2.87-2.6 3.75-1.42.98-3.21 1.44-4.91 1.41-1.65-.02-3.32-.48-4.66-1.46-1.39-1.01-2.34-2.58-2.61-4.26-.23-1.44-.06-2.92.51-4.26.49-1.16 1.31-2.18 2.37-2.88 1.13-.74 2.49-1.13 3.84-1.12 1.29-.02 2.62.24 3.79.84.01 1.42.01 2.84 0 4.25-.66-.35-1.4-.49-2.15-.46-.68.03-1.36.21-1.95.55-.57.32-1.01.83-1.25 1.44-.24.64-.24 1.35.02 1.99.27.65.75 1.19 1.37 1.5.58.29 1.24.41 1.89.37.67-.03 1.33-.21 1.88-.61.59-.44.97-1.11 1.05-1.84.07-1.23.04-2.46.05-3.69V.02z" /></svg>
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-black mb-8 uppercase tracking-widest text-[10px] opacity-40">Platforms</h4>
                    <ul className="flex flex-col gap-4">
                        <li><a href={siteConfig.serviceLinks.fiverr} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-primary transition-colors text-sm font-medium">Fiverr Studio</a></li>
                        <li><a href={siteConfig.serviceLinks.upwork} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-primary transition-colors text-sm font-medium">Upwork Profile</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-black mb-8 uppercase tracking-widest text-[10px] opacity-40">Company</h4>
                    <ul className="flex flex-col gap-4">
                        {siteConfig.nav.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="text-white/60 hover:text-brand-primary transition-colors text-sm font-medium">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-black mb-8 uppercase tracking-widest text-[10px] opacity-40">Contact Info</h4>
                    <ul className="flex flex-col gap-6">
                        <li className="flex items-center gap-3 text-white/60">
                            <Mail size={16} className="text-brand-primary" />
                            <span className="text-sm">{siteConfig.contact.email}</span>
                        </li>
                        <li className="flex items-center gap-3 text-white/60">
                            <MapPin size={16} className="text-brand-primary" />
                            <span className="text-sm">{siteConfig.contact.location}</span>
                        </li>
                        <li className="flex items-center gap-3 text-white/60">
                            <MessageCircle size={16} className="text-brand-primary" />
                            <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand-primary transition-colors">
                                {siteConfig.contact.whatsappDisplay}
                            </a>
                        </li>
                        <li className="flex items-center gap-3 text-white/60">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs italic">{siteConfig.contact.responseTime} response</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-[10px] font-black uppercase tracking-widest">
                <p>© 2026 {siteConfig.name}. All rights reserved.</p>
                <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2">
                    <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
                    <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
                    <Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link>
                    <Link href="/service-policy" className="hover:text-white transition-colors">Service Policy</Link>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
