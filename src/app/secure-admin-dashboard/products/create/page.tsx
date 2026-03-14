"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    ArrowLeft,
    Save,
    Upload,
    X,
    Plus,
    Image as ImageIcon,
    File,
    Zap,
    Check
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Category } from "@/types/product";

const CreateProduct = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        price: 0,
        currency: "USD",
        category_id: "",
        is_free: false,
        is_featured: false,
        features: [""]
    });

    const [thumbFile, setThumbFile] = useState<File | null>(null);
    const [productFile, setProductFile] = useState<File | null>(null);
    const [thumbPreview, setThumbPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await supabase.from('categories').select('*');
            if (data) setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setThumbFile(file);
            setThumbPreview(URL.createObjectURL(file));
        }
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeatureField = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const removeFeatureField = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.category_id) {
            alert("Please select a category first!");
            return;
        }

        setLoading(true);

        try {
            let thumbUrl = "";
            let filePath = "";

            // 1. Upload Thumbnail (Public Bucket)
            if (thumbFile) {
                const thumbExt = thumbFile.name.split('.').pop();
                const thumbName = `${Date.now()}-thumb.${thumbExt}`;
                const { data: thumbData, error: thumbError } = await supabase.storage
                    .from('product-thumbnails')
                    .upload(thumbName, thumbFile);

                if (thumbError) throw thumbError;

                const { data: publicUrlData } = supabase.storage
                    .from('product-thumbnails')
                    .getPublicUrl(thumbName);

                thumbUrl = publicUrlData.publicUrl;
            }

            // 2. Upload Product File (Private/Secure Bucket)
            if (productFile) {
                const fileExt = productFile.name.split('.').pop();
                const fileName = `${Date.now()}-product.${fileExt}`;
                const { data: fileData, error: fileError } = await supabase.storage
                    .from('product-files')
                    .upload(fileName, productFile);

                if (fileError) throw fileError;
                filePath = fileName;
            }

            // 3. Save to Database
            const { error: dbError } = await supabase.from('products').insert([
                {
                    ...formData,
                    thumb_url: thumbUrl,
                    file_path: filePath,
                    features: formData.features.filter(f => f.trim() !== "")
                }
            ]);

            if (dbError) throw dbError;

            router.push("/secure-admin-dashboard/products");
        } catch (error: any) {
            console.error(error);
            alert(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-dark p-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <Link href="/secure-admin-dashboard/products" className="inline-flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest mb-4">
                            <ArrowLeft size={16} /> All Products
                        </Link>
                        <h1 className="text-4xl font-black text-white uppercase italic">Add Digital Product</h1>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-10 py-4 rounded-2xl bg-brand-primary text-bg-dark font-black flex items-center gap-2 hover:scale-105 transition-all glow-shadow disabled:opacity-50"
                    >
                        {loading ? <div className="w-5 h-5 border-2 border-bg-dark border-t-transparent animate-spin rounded-full" /> : <Save size={20} />}
                        Save Product
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="glass p-10 rounded-[32px] border border-white/5 space-y-6">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <Zap size={20} className="text-brand-primary" /> Basic Information
                            </h2>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Product Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                        placeholder="e.target. Enterprise Dashboard Pro"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Price ({formData.currency})</label>
                                        <input
                                            type="number"
                                            disabled={formData.is_free}
                                            value={formData.is_free ? 0 : formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all disabled:opacity-30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Category</label>
                                        <select
                                            required
                                            value={formData.category_id}
                                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all appearance-none"
                                        >
                                            <option value="" disabled className="bg-bg-dark">Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id} className="bg-bg-dark">{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Full Description</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all resize-none"
                                        placeholder="Describe your product in detail..."
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="glass p-10 rounded-[32px] border border-white/5 space-y-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    <Check size={20} className="text-brand-primary" /> Key Features
                                </h2>
                                <button
                                    type="button"
                                    onClick={addFeatureField}
                                    className="text-xs font-black text-brand-primary uppercase tracking-widest hover:underline"
                                >
                                    + Add Feature
                                </button>
                            </div>

                            <div className="space-y-4">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-4">
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                                            placeholder="e.g. 10+ Custom Components"
                                            className="flex-grow bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-all text-sm"
                                        />
                                        {formData.features.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeFeatureField(index)}
                                                className="p-3 rounded-xl hover:bg-white/5 text-white/20 hover:text-red-500 transition-all"
                                            >
                                                <X size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Files & Status */}
                    <div className="space-y-8">
                        <section className="glass p-8 rounded-[32px] border border-white/5 space-y-6">
                            <h2 className="text-lg font-bold text-white mb-4 italic">Product Status</h2>
                            <div className="space-y-4">
                                <label className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer group">
                                    <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">Free Product</span>
                                    <input
                                        type="checkbox"
                                        checked={formData.is_free}
                                        onChange={(e) => setFormData({ ...formData, is_free: e.target.checked })}
                                        className="w-5 h-5 rounded border-white/10 bg-white/5 text-brand-primary focus:ring-0"
                                    />
                                </label>
                                <label className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer group">
                                    <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">Feature on Home</span>
                                    <input
                                        type="checkbox"
                                        checked={formData.is_featured}
                                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                        className="w-5 h-5 rounded border-white/10 bg-white/5 text-brand-primary focus:ring-0"
                                    />
                                </label>
                            </div>
                        </section>

                        <section className="glass p-8 rounded-[32px] border border-white/5 space-y-6">
                            <h2 className="text-lg font-bold text-white mb-4 italic">Media Assets</h2>

                            {/* Thumbnail Upload */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Display Thumbnail</label>
                                <div className="relative aspect-video rounded-2xl bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center overflow-hidden hover:border-brand-primary/50 transition-all group">
                                    {thumbPreview ? (
                                        <>
                                            <Image src={thumbPreview} alt="Preview" fill className="object-cover" />
                                            <button
                                                onClick={() => { setThumbPreview(null); setThumbFile(null); }}
                                                className="absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white shadow-xl hover:scale-110 transition-transform"
                                            >
                                                <X size={14} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <ImageIcon size={32} className="text-white/10 mb-2 group-hover:text-brand-primary transition-colors" />
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Upload JPG/PNG</span>
                                            <input type="file" accept="image/*" onChange={handleThumbChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Digital File Upload */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Digital Product File</label>
                                <div className="relative p-6 rounded-2xl bg-white/5 border-2 border-dashed border-white/10 hover:border-brand-primary/50 transition-all group">
                                    {productFile ? (
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                                <File size={20} />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <div className="text-xs font-bold text-white truncate">{productFile.name}</div>
                                                <div className="text-[10px] text-white/40">Ready to upload</div>
                                            </div>
                                            <button onClick={() => setProductFile(null)} className="text-white/20 hover:text-red-500 transition-all">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4 justify-center">
                                            <Upload size={20} className="text-white/10 group-hover:text-brand-primary transition-colors" />
                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Select Source File</span>
                                            <input type="file" onChange={(e) => e.target.files && setProductFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
