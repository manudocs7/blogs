import { getAllBlogs } from "@/lib/getBlogs";

export default function sitemap() {
    const baseUrl = "https://blogs.manudocs.com";

    const blogs = getAllBlogs();

    const blogUrls = blogs.map((blog) => ({
        url: `${baseUrl}/${blog.slug}`,
        lastModified: blog.date,
    }));

    const categorySet = new Set<string>();
    const tagSet = new Set<string>();

    blogs.forEach((blog) => {
        if (blog.category) {
            categorySet.add(
                blog.category.toLowerCase().replace(/\s+/g, "-")
            );
        }

        blog.tags?.forEach((tag) => tagSet.add(tag));
    });

    const categoryUrls = Array.from(categorySet).map((category) => ({
        url: `${baseUrl}/category/${category}`,
    }));

    const tagUrls = Array.from(tagSet).map((tag) => ({
        url: `${baseUrl}/tag/${tag}`,
    }));

    return [
        { url: baseUrl },
        ...blogUrls,
        ...categoryUrls,
        ...tagUrls,
    ];
}
