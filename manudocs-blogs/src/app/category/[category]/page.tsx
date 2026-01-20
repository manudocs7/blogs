import { getAllBlogs, BlogMeta } from "@/lib/getBlogs";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type PageProps = {
    params: Promise<{
        category: string;
    }>;
};

export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const { category } = await params;

    const readableCategory = category.replace(/-/g, " ");

    return {
        title: `${readableCategory} Blogs | ManuDocs`,
        description: `Read all blogs related to ${readableCategory} on ManuDocs.`,
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params;

    const blogs: BlogMeta[] = getAllBlogs();

    const readableCategory = category.replace(/-/g, " ");

    const filteredBlogs = blogs.filter(
        (blog) =>
            blog.category?.toLowerCase().replace(/\s+/g, "-") === category
    );

    if (filteredBlogs.length === 0) return notFound();

    return (
        <main className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 capitalize">
                {readableCategory}
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
