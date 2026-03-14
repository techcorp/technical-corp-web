"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowLeft,
    Calendar,
    User,
    Tag,
    Share2,
    MessageCircle,
    Twitter,
    Linkedin,
    Facebook
} from "lucide-react";

// In a real app, fetch from Supabase by slug
const ALL_BLOGS = [
    {
        id: 1,
        title: "The Future of AI in Enterprise Solutions",
        excerpt: "Discover how AI is transforming business automation and decision-making processes in 2026.",
        content: `
      <h2>The Shift to Intelligent Automation</h2>
      <p>As we move further into 2026, the landscape of enterprise technology is being fundamentally reshaped by Artificial Intelligence. No longer just a buzzword, AI has integrated itself into the core of business operations.</p>
      
      <p>From predictive analytics in supply chain management to automated customer service agents that can handle complex inquiries with human-like empathy, the applications are endless.</p>

      <blockquote>
        "AI is not just about replacing human effort; it's about amplifying human potential by removing the mundane and highlighting the creative."
      </blockquote>

      <h3>Key Trends for 2026</h3>
      <ul>
        <li><strong>Hyper-Personalization:</strong> Delivering tailored experiences at scale.</li>
        <li><strong>Autonomous Decision Making:</strong> Systems that learn and adapt in real-time.</li>
        <li><strong>Ethical AI Frameworks:</strong> Increased focus on transparency and bias mitigation.</li>
      </ul>

      <pre><code>// Example of a simple AI integration pattern
const aiAgent = new EnterpriseAgent({
  model: "technical-corp-v4",
  capabilities: ["analytics", "automation"]
});

await aiAgent.optimizeWorkflow(currentProcess);</code></pre>

      <p>Investing in AI today means securing a competitive advantage for tomorrow. Technical Corp is leading this charge by helping businesses integrate custom AI models into their existing ecosystems.</p>
    `,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
        date: "March 5, 2026",
        category: "AI Technology",
        author: "Technical Team",
        slug: "ai-enterprise-future"
    }
];

const BlogClient = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;

    const blog = ALL_BLOGS.find(b => b.slug === slug) || ALL_BLOGS[0];

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-5xl">
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-white/40 hover:text-brand-primary transition-colors mb-12 font-bold uppercase tracking-widest text-xs"
                >
                    <ArrowLeft size={16} />
                    Back to Insights
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex flex-wrap items-center gap-6 mb-8">
                        <span className="px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-black uppercase tracking-widest">
                            {blog.category}
                        </span>
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                            <Calendar size={16} />
                            <span>{blog.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                            <User size={16} />
                            <span>{blog.author}</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black font-heading text-white mb-12 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="relative aspect-video rounded-[40px] overflow-hidden mb-16 border border-white/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-8">
                            <div
                                className="prose prose-invert prose-brand lg:prose-xl max-w-none 
                    prose-headings:font-heading prose-headings:font-black prose-headings:text-white
                    prose-p:text-white/70 prose-p:leading-relaxed
                    prose-strong:text-brand-primary
                    prose-blockquote:border-l-brand-primary prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl
                    prose-code:text-brand-primary prose-code:bg-brand-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
                    prose-pre:bg-bg-card prose-pre:border prose-pre:border-white/5 prose-pre:rounded-2xl
                    prose-li:text-white/70"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />
                        </div>

                        <div className="lg:col-span-4 space-y-12">
                            <div className="glass p-8 rounded-[32px] border border-white/5">
                                <h4 className="text-xl font-black text-white mb-6">Share Article</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center gap-2 p-4 rounded-2xl glass hover:bg-brand-primary hover:text-bg-dark transition-all text-white/60">
                                        <Twitter size={20} />
                                        <span className="font-bold text-xs uppercase">Twitter</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 p-4 rounded-2xl glass hover:bg-[#0077b5] hover:text-white transition-all text-white/60">
                                        <Linkedin size={20} />
                                        <span className="font-bold text-xs uppercase">LinkedIn</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 p-4 rounded-2xl glass hover:bg-[#25D366] hover:text-white transition-all text-white/60">
                                        <MessageCircle size={20} />
                                        <span className="font-bold text-xs uppercase">WhatsApp</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 p-4 rounded-2xl glass hover:bg-[#1877f2] hover:text-white transition-all text-white/60">
                                        <Facebook size={20} />
                                        <span className="font-bold text-xs uppercase">Facebook</span>
                                    </button>
                                </div>
                            </div>

                            <div className="glass p-8 rounded-[32px] border border-white/5 bg-gradient-to-br from-brand-primary/10 to-transparent">
                                <h4 className="text-xl font-black text-white mb-4">Need Help?</h4>
                                <p className="text-white/60 text-sm leading-relaxed mb-8">
                                    Looking to implement these technologies in your own business? Technical Corp is here to guide you.
                                </p>
                                <Link
                                    href="/contact"
                                    className="w-full py-4 rounded-xl bg-brand-primary text-bg-dark font-black flex items-center justify-center gap-2 hover:scale-105 transition-all text-sm mb-4"
                                >
                                    Talk to an Expert
                                </Link>
                                <Link
                                    href="/services"
                                    className="w-full py-4 rounded-xl glass border border-white/10 text-white font-black flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-sm"
                                >
                                    Our Solutions
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogClient;
