import BlogClient from "./BlogClient";

/**
 * generateStaticParams is REQUIRED when 'output: export' is used in next.config.ts.
 */
export async function generateStaticParams() {
    // These should ideally match the slugs in your ALL_BLOGS array
    return [
        { slug: "ai-enterprise-future" }
    ];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    return <BlogClient />;
}
