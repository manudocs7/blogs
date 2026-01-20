import type { Metadata } from "next";
import { getAllBlogs, BlogMeta } from "@/lib/getBlogs";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { YouTube } from "@/components/mdx/YouTube";
import { Image } from "@/components/mdx/Image";
import { Tweet } from "@/components/mdx/Tweet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShareButton } from "@/components/blog/ShareButton";

import { getRelatedBlogs } from "@/lib/getRelatedBlogs";
import { Clock, Calendar, User, ArrowLeft } from "lucide-react";

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

/* =======================
   SEO / METADATA
======================= */
export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const { slug } = await params;
    const blogs = getAllBlogs();
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) {
        return {
            title: "Blog Not Found | ManuDocs",
        };
    }

    return {
        title: blog.title,
        description: blog.summary || blog.title,
        openGraph: {
            title: blog.title,
            description: blog.summary,
            type: "article",
            url: `https://blogs.manudocs.com/${blog.slug}`,
            images: blog.cover
                ? [
                    {
                        url: blog.cover,
                        width: 1200,
                        height: 630,
                        alt: blog.title,
                    },
                ]
                : [],
        },
    };
}

/* =======================
   HELPER: Reading Time
======================= */
function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

/* =======================
   BLOG PAGE
======================= */
export default async function BlogPage({ params }: PageProps) {
    const { slug } = await params;

    const blogs: BlogMeta[] = getAllBlogs();
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) return notFound();

    const relatedBlogs = getRelatedBlogs(blog, blogs, 3);
    const readingTime = calculateReadingTime(blog.content);

    const mdxComponents = {
        YouTube,
        Image,
        Tweet,
    };

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
            {/* TOP BAR */}
            <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border-color)]">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <a
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--brand-green)] transition-colors"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Blogs</span>
                    </a>

                    <div className="flex items-center gap-3">
                        <ShareButton title={blog.title} url={`/${blog.slug}`} />
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="container mx-auto px-6 py-12 max-w-6xl">
                {/* ARTICLE HEADER */}
                <article>
                    <header className="mb-12 space-y-6">
                        {/* Category & Tags */}
                        {(blog.category || (blog.tags && blog.tags.length > 0)) && (
                            <div className="flex flex-wrap items-center gap-3">
                                {blog.category && (
                                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[var(--brand-green)] text-white">
                                        {blog.category}
                                    </span>
                                )}

                                {blog.tags && blog.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {blog.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[var(--text-primary)] tracking-tight">
                            {blog.title}
                        </h1>

                        {/* Summary/Hook */}
                        {(blog.summary || blog.hook) && (
                            <p className="text-xl text-[var(--text-muted)] leading-relaxed">
                                {blog.hook || blog.summary}
                            </p>
                        )}

                        {/* Metadata Bar */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-muted)] pt-4 border-t border-[var(--border-color)]">
                            {blog.author && (
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>{blog.author}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <time dateTime={blog.date}>{blog.date}</time>
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{readingTime} min read</span>
                            </div>
                        </div>
                    </header>

                    {/* MDX CONTENT */}
                    <div className="prose prose-lg mx-auto max-w-5xl">
                        <MDXRemote
                            source={blog.content}
                            components={mdxComponents}
                        />
                    </div>
                </article>

                {/* RELATED ARTICLES */}
                {relatedBlogs.length > 0 && (
                    <section className="mt-20 pt-12 border-t-2 border-[var(--border-color)]">
                        <h2 className="text-2xl font-bold mb-8 text-[var(--text-primary)]">
                            Explore more..
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {relatedBlogs.map((rel) => (
                                <a
                                    key={rel.slug}
                                    href={`/${rel.slug}`}
                                    className="group p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--brand-green)] transition-all duration-300 hover:shadow-lg"
                                >
                                    <h3 className="font-semibold text-lg mb-2 text-[var(--text-primary)] group-hover:text-[var(--brand-green)] transition-colors line-clamp-2">
                                        {rel.title}
                                    </h3>
                                    {rel.summary && (
                                        <p className="text-sm text-[var(--text-muted)] line-clamp-3">
                                            {rel.summary}
                                        </p>
                                    )}
                                </a>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* FOOTER */}
            <footer className="mt-20 py-8 border-t border-[var(--border-color)]">
                <div className="container mx-auto px-6 text-center text-sm text-[var(--text-muted)]">
                    <p>© 2026 ManuDocs. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
