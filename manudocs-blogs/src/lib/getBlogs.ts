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

