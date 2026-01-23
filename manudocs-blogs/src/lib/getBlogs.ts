import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "src/content/blogs");

export type BlogMeta = {
    title: string;
    date: string;
    author?: string;
    summary?: string;
    hook?: string;
    featured?: boolean;
    excludeFromLatest?: boolean;
    cover?: string;

    category?: string;
    tags?: string[];
    carouselTag?: string; // P1C1, P1C2, S1C1, S1C2, I1C1, I1C2, etc.

    slug: string;
    content: string;
};


export function getAllBlogs(): BlogMeta[] {
    const files = fs.readdirSync(blogsDirectory);

    return files.map((fileName) => {
        const slug = fileName.replace(".mdx", "");
        const filePath = path.join(blogsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, "utf8");

        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            ...(data as Omit<BlogMeta, "slug" | "content">),
        };
    });
}

