import { supabase } from "@/lib/supabase";
import ProductClient from "./ProductClient";

/**
 * generateStaticParams is REQUIRED when 'output: export' is used in next.config.ts.
 * It tells Next.js which paths to pre-render at build time.
 */
export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const { data: products } = await supabase
            .from('products')
            .select('slug');

        return (products || []).map((product) => ({
            slug: product.slug,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

// In Next.js 15+, params is a Promise
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    // We don't actually need to await params here because ProductClient uses useParams()
    // but we can pass it down if needed.
    return <ProductClient />;
}
