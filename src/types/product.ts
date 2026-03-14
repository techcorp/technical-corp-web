import { LucideIcon } from "lucide-react";

export interface Category {
    id: string;
    name: string;
    slug: string;
    icon_name?: string;
}

export interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    category_id: string;
    category?: Category;
    thumb_url: string;
    file_path: string;
    is_free: boolean;
    is_featured: boolean;
    features: string[];
    download_count: number;
    created_at: string;
}

export interface Order {
    id: string;
    user_id: string;
    product_id: string;
    product?: Product;
    amount: number;
    status: 'pending' | 'paid' | 'failed';
    payment_method: 'stripe' | 'paymob' | 'bsecure';
    payment_ref: string;
    created_at: string;
}
