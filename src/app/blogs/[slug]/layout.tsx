import { ReactNode } from "react";

export async function generateStaticParams() {
    return [
        { slug: "ai-enterprise-future" },
        { slug: "cybersecurity-trends-2026" },
        { slug: "nextjs-startup-scalability" },
        { slug: "cloud-migration-guide" },
        { slug: "designing-inclusive-ux" },
        { slug: "edge-computing-rise" }
    ];
}

export default function BlogSlugLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
