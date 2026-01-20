"use client";

import { useMemo, useState } from "react";
import { BlogMeta } from "@/lib/getBlogs";

export default function SearchLatest({
    blogs,
}: {
    blogs: BlogMeta[];
}) {
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        const s = q.toLowerCase();
        if (!s) return blogs;
        return blogs.filter(
            (b) =>
                b.title.toLowerCase().includes(s) ||
                (b.summary || "").toLowerCase().includes(s)
        );
    }, [q, blogs]);

    return (
        <>
            {/* SEARCH BAR */}
            <div className="mb-6">
                <input
                    id="blog-search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search articles…"
                    className="w-full rounded-xl bg-[#0b0b0b] border border-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--brand-green)]"
                />

            </div>

            {/* LIST */}
            <div className="space-y-6">
                {filtered.map((blog) => (
                    <a
                        key={blog.slug}
                        href={`/${blog.slug}`}
                        className="flex flex-col md:flex-row gap-5 rounded-2xl bg-[#0b0b0b] border border-gray-800 hover:border-[var(--brand-green)] transition p-4"
                    >
                        {blog.cover && (
                            <img
                                src={blog.cover}
                                alt={blog.title}
                                className="w-full md:w-56 h-40 object-cover rounded-xl flex-shrink-0"
                            />
                        )}

                        <div className="flex flex-col justify-center space-y-2">
                            <h3 className="text-xl font-semibold">
                                {blog.title}
                            </h3>

                            {(blog.hook || blog.summary) && (
                                <p className="text-gray-400 text-sm line-clamp-2">
                                    {blog.hook || blog.summary}
                                </p>
                            )}

                            <p className="text-xs text-gray-500">
                                {blog.date}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
}
