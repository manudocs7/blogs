export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: "https://blogs.manudocs.com/sitemap.xml",
    };
}
