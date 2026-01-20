import { getAllBlogs, BlogMeta } from "@/lib/getBlogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PageProps = {
    params: Promise<{
        tag: string;
    }>;
};

export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const { tag } = await params;

    return {
        title: `#${tag} Blogs | ManuDocs`,
        description: `Read all blogs tagged with ${tag} on ManuDocs.`,
    };
}

export default async function TagPage({ params }: PageProps) {
    const { tag } = await params;

    const blogs: BlogMeta[] = getAllBlogs();

    const filteredBlogs = blogs.filter(
        (blog) => blog.tags?.includes(tag)
    );

    if (filteredBlogs.length === 0) return notFound();

    return (
        <main className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                #{tag}
            </h1>

            <ul className="space-y-4">
                {filteredBlogs.map((blog) => (
                    <li key={blog.slug}>
                        <a
                            href={`/${blog.slug}`}
                            className="text-lg font-medium underline"
                        >
                            {blog.title}
                        </a>
                        <p className="text-sm text-gray-500">
                            {blog.summary}
                        </p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
