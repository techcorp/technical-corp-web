"use client";

import React from "react";
import {
    MessageCircle,
    ExternalLink,
    Share2,
    Zap,
    CheckCircle2
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
    serviceName: string;
    horizontal?: boolean;
}

const ActionButtons = ({ serviceName, horizontal = false }: ActionButtonsProps) => {
    const whatsappLink = `${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
        `Hello Technical Corp Team,\nI am interested in your ${serviceName} service. Please share details about pricing and process.`
    )}`;

    const consultationLink = `${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
        `Hello Technical Corp,\nI would like a free consultation about your services.`
    )}`;

    const handleShare = async () => {
        const shareData = {
            title: 'Technical Corp Service',
            text: `Check out this professional IT service from Technical Corp.\n\nThey provide high-quality IT support, AI development, web development, and design services.`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className={cn(
            "flex gap-3",
            horizontal ? "flex-wrap justify-start" : "flex-col"
        )}>
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-green-500/20"
            >
                <MessageCircle size={20} fill="currentColor" />
                <span>Contact on WhatsApp</span>
            </a>

            <a
                href={consultationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-bg-dark rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-cyan-500/20"
            >
                <Zap size={20} fill="currentColor" />
                <span>Get Free Consultation</span>
            </a>

            <a
                href={siteConfig.serviceLinks.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1dbf73] text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-green-600/20"
            >
                <ExternalLink size={20} />
                <span>Order on Fiverr</span>
            </a>

            <a
                href={siteConfig.serviceLinks.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#14a800] text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-green-700/20"
            >
                <ExternalLink size={20} />
                <span>Hire on Upwork</span>
            </a>

            <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-6 py-3 glass text-white rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all"
            >
                <Share2 size={20} />
                <span>Share Service</span>
            </button>
        </div>
    );
};

export default ActionButtons;
