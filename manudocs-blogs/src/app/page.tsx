import { getAllBlogs, BlogMeta } from "@/lib/getBlogs";
import type { Metadata } from "next";
import SearchLatest from "@/components/blog/SearchLatest";
import TopBar from "@/components/layout/TopBar";



/* =====================
   SEO METADATA (HOME)
===================== */
export const metadata: Metadata = {
  title: "ManuDocs Blogs – Trade, Exports & Global Commerce",
  description:
    "Research, insights, and analysis on global trade, exports, MSMEs, logistics, and policy by ManuDocs.",
};

export default function BlogHome() {
  /* =====================
     FETCH & SORT BLOGS
  ===================== */
  const blogs: BlogMeta[] = getAllBlogs();

  // Always sort once (safe, no mutation)
  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );

  // Featured blogs (oldest first)
  const featuredBlogs = sortedBlogs
    .filter((b) => b.featured)
    .reverse()
    .slice(0, 10);

  // Latest blogs (vertical feed)
  const latestBlogs = sortedBlogs
    .filter((b) => !b.excludeFromLatest)
    .slice(0, 50);

  return (
    <>
      <TopBar />


      <main className="min-h-screen bg-black text-white px-6 py-12 space-y-20">


        {/* =====================
    PAGE HEADING
===================== */}
        <section className="text-center max-w-6xl mx-auto mt-16">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Insights Powering the Future of{" "}
            <span className="text-[var(--brand-green)]">
              Global Trade
            </span>{" "}
            from India
          </h1>
        </section>





        {/* =====================
          FEATURED BLOGS – MINIMAL LIST
      ===================== */}
        {featuredBlogs.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">
              Featured Articles
            </h2>

            <div className="space-y-4">
              {featuredBlogs.slice(0, 6).map((blog) => (
                <a
                  key={blog.slug}
                  href={`/${blog.slug}`}
                  className="group flex gap-4 p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--brand-green)] transition-all duration-200 hover:shadow-md"
                >
                  {/* THUMBNAIL */}
                  {blog.cover && (
                    <div className="relative w-32 h-20 max-w-32 max-h-20 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={blog.cover}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* CONTENT */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h3 className="font-semibold text-lg mb-1 text-[var(--text-primary)] group-hover:text-[var(--brand-green)] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    {(blog.hook || blog.summary) && (
                      <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-2">
                        {blog.hook || blog.summary}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      {blog.author && <span>{blog.author}</span>}
                      {blog.category && (
                        <>
                          {blog.author && <span>•</span>}
                          <span className="px-2 py-0.5 rounded bg-[var(--brand-green)]/10 text-[var(--brand-green)]">
                            {blog.category}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}


        {/* =====================
          LATEST – SEARCH + FEED
      ===================== */}
        <section
          className="max-w-5xl mx-auto px-6 py-10 rounded-3xl
             bg-[rgba(50,172,93,0.04)]
             border border-[rgba(50,172,93,0.15)]"
        >
          <h2 className="text-2xl font-semibold mb-6">
            Latest Articles
          </h2>

          <SearchLatest blogs={latestBlogs} />
        </section>

      </main>
    </>
  );
}
