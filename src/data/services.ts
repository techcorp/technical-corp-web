import {
    Server,
    Network,
    Globe,
    Cpu,
    Smartphone,
    Palette,
    Layout,
    Wrench,
    Cloud,
    ShieldCheck,
    LucideIcon
} from "lucide-react";

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    image: string;
    color: string;
    features: string[];
}

export const services: Service[] = [
    {
        id: "it-support",
        title: "IT Support & System Administration",
        description: "Complete IT infrastructure management, troubleshooting, and support for Windows and Linux systems.",
        icon: Server,
        image: "/services/it-support.png",
        color: "blue",
        features: ["System Troubleshooting", "Windows & Linux Support", "Network Setup", "Server Management", "Backup Solutions"]
    },
    {
        id: "network-security",
        title: "Network Setup & Security",
        description: "Enterprise-grade network design, implementation, and robust security protocols for your business.",
        icon: Network,
        image: "/services/network-security.png",
        color: "cyan",
        features: ["Firewall Configuration", "VPN Setup", "Network Monitoring", "Wireless Solutions"]
    },
    {
        id: "web-development",
        title: "Web Development",
        description: "Custom built, high-performance websites and SaaS platforms using modern technologies like React and Next.js.",
        icon: Globe,
        image: "/services/web-development.png",
        color: "indigo",
        features: ["Business Websites", "SaaS Platforms", "Custom Web Applications", "E-commerce Solutions"]
    },
    {
        id: "ai-development",
        title: "AI Powered App Development",
        description: "Cutting-edge AI integration for automation, data analysis, and intelligent SaaS solutions.",
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
        color: "purple",
        features: ["AI Tools Development", "Automation Systems", "AI SaaS Applications", "Machine Learning Integration"]
    },
    {
        id: "mobile-development",
        title: "Mobile App Development",
        description: "Robust mobile applications for iOS and Android with seamless performance and modern UI.",
        icon: Smartphone,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
        color: "pink",
        features: ["Native Apps", "Cross-platform Development", "App Store Optimization"]
    },
    {
        id: "ui-ux-design",
        title: "UI/UX & Branding",
        description: "Modern, high-converting designs that tell your brand story and provide excellent user experiences.",
        icon: Layout,
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200",
        color: "emerald",
        features: ["Logo Design", "Social Media Graphics", "UI UX Design", "Branding"]
    }
];
