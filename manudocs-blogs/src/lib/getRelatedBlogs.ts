import { BlogMeta } from "@/lib/getBlogs";

export function getRelatedBlogs(
    currentBlog: BlogMeta,
    allBlogs: BlogMeta[],
    limit = 3
) {
    return allBlogs
        .filter((blog) => blog.slug !== currentBlog.slug)
        .map((blog) => {
            let score = 0;

            // Same category = strong signal
            if (
                blog.category &&
                currentBlog.category &&
                blog.category === currentBlog.category
            ) {
                score += 2;
            }

            // Common tags = medium signal
            if (blog.tags && currentBlog.tags) {
                const commonTags = blog.tags.filter((tag) =>
                    currentBlog.tags!.includes(tag)
                );
                score += commonTags.length;
            }

            return { blog, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((item) => item.blog);
}
