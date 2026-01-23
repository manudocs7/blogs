"use client";

import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogMeta } from "@/lib/getBlogs";

type SyncedCarouselProps = {
    problemBlogs: BlogMeta[];
    solutionBlogs: BlogMeta[];
    impactBlogs: BlogMeta[];
    betterBlogs: BlogMeta[];
};

export function SyncedCarousel({
    problemBlogs,
    solutionBlogs,
    impactBlogs,
    betterBlogs,
}: SyncedCarouselProps) {
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);
    const row3Ref = useRef<HTMLDivElement>(null);
    const row4Ref = useRef<HTMLDivElement>(null);

    const isScrolling = useRef(false);

    // Synchronized scroll handler
    const handleScroll = (sourceRef: React.RefObject<HTMLDivElement | null>) => {
        if (isScrolling.current) return;

        const scrollLeft = sourceRef.current?.scrollLeft || 0;
        isScrolling.current = true;

        // Sync all rows instantly
        requestAnimationFrame(() => {
            if (row1Ref.current) row1Ref.current.scrollLeft = scrollLeft;
            if (row2Ref.current) row2Ref.current.scrollLeft = scrollLeft;
            if (row3Ref.current) row3Ref.current.scrollLeft = scrollLeft;
            if (row4Ref.current) row4Ref.current.scrollLeft = scrollLeft;
        });

        setTimeout(() => {
            isScrolling.current = false;
        }, 10); // Reduced from 50ms for faster response
    };

    const scroll = (direction: "left" | "right") => {
        const scrollAmount = 1600; // Adjusted for larger cards - scrolls ~2 cards at once
        const refs = [row1Ref, row2Ref, row3Ref, row4Ref];

        refs.forEach((ref) => {
            if (ref.current) {
                ref.current.scrollBy({
                    left: direction === "left" ? -scrollAmount : scrollAmount,
                    behavior: "auto", // Instant scroll instead of smooth animation
                });
            }
        });
    };

    return (
        <section className="relative py-8 bg-black overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-6">

                {/* Row 1: Problems */}
                <div className="mb-4 relative">
                    <h2 className="text-lg font-bold text-center mb-3 text-white">
                        THE PROBLEMS WE ARE SOLVING
                    </h2>
                    {/* Row 1 Navigation Arrows */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center hover:bg-[#2a9650] transition-all shadow-lg"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center hover:bg-[#2a9650] transition-all shadow-lg"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <div
                        ref={row1Ref}
                        onScroll={() => row1Ref.current && handleScroll(row1Ref)}
                        className="flex gap-10 overflow-x-auto scrollbar-hide pb-2 px-8"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {problemBlogs.map((blog) => (
                            <div key={blog.slug} className="flex flex-col items-center flex-shrink-0">
                                <a
                                    href={`/${blog.slug}`}
                                    className="group w-70 h-50 rounded-lg border-2 border-[var(--brand-green)] bg-[#0b0b0b] overflow-hidden hover:border-[#2a9650] hover:shadow-lg hover:shadow-[var(--brand-green)]/20 transition-all duration-300"
                                >
                                    {blog.cover && (
                                        <div className="w-full h-36 overflow-hidden">
                                            <img
                                                src={blog.cover}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="p-2 flex flex-col justify-center h-16">
                                        <h3 className="font-bold text-sm text-white group-hover:text-[var(--brand-green)] transition-colors line-clamp-3">
                                            {blog.title}
                                        </h3>
                                    </div>
                                </a>
                                {/* Arrow below each card */}
                                <svg width="24" height="24" viewBox="0 0 40 40" className="text-[var(--brand-green)] mt-2">
                                    <path d="M20 5 L20 35 M15 30 L20 35 L25 30" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2: Solutions */}
                <div className="mb-4 relative">
                    <h2 className="text-lg font-bold text-center mb-3 text-white">
                        HOW WE ARE SOLVING THEM
                    </h2>
                    {/* Row 2 Navigation Arrows */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center hover:bg-[#2a9650] transition-all shadow-lg"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center hover:bg-[#2a9650] transition-all shadow-lg"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <div
                        ref={row2Ref}
                        onScroll={() => row2Ref.current && handleScroll(row2Ref)}
                        className="flex gap-10 overflow-x-auto scrollbar-hide pb-2 px-8"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {solutionBlogs.map((blog) => (
                            <div key={blog.slug} className="flex flex-col items-center flex-shrink-0">
                                <a
                                    href={`/${blog.slug}`}
                                    className="group w-70 h-50 rounded-lg border-2 border-[var(--brand-green)] bg-[#0b0b0b] overflow-hidden hover:border-[#2a9650] hover:shadow-lg hover:shadow-[var(--brand-green)]/20 transition-all duration-300"
                                >
                                    {blog.cover && (
                                        <div className="w-full h-36 overflow-hidden">
                                            <img
                                                src={blog.cover}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="p-2 flex flex-col justify-center h-16">
                                        <h3 className="font-bold text-sm text-white group-hover:text-[var(--brand-green)] transition-colors line-clamp-3">
                                            {blog.title}
                                        </h3>
                                    </div>
                                </a>
                                {/* Arrow below each card */}
                                <svg width="24" height="24" viewBox="0 0 40 40" className="text-[var(--brand-green)] mt-2">
                                    <path d="M20 5 L20 35 M15 30 L20 35 L25 30" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 3: Impact */}
                <div className="mb-4 relative">
                    <h2 className="text-lg font-bold text-center mb-3 text-white">
                        WHAT IMPACT WE ARE CREATING
                    </h2>
                    {/* Row 3 Navigation Arrows */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center hover:bg-[#2a9650] transition-all shadow-lg"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center hover:bg-[#2a9650] transition-all shadow-lg"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <div
                        ref={row3Ref}
                        onScroll={() => row3Ref.current && handleScroll(row3Ref)}
                        className="flex gap-10 overflow-x-auto scrollbar-hide pb-2 px-8"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {impactBlogs.map((blog) => (
                            <div key={blog.slug} className="flex flex-col items-center flex-shrink-0">
                                <a
                                    href={`/${blog.slug}`}
                                    className="group w-70 h-50 rounded-lg border-2 border-[var(--brand-green)] bg-[#0b0b0b] overflow-hidden hover:border-[#2a9650] hover:shadow-lg hover:shadow-[var(--brand-green)]/20 transition-all duration-300"
                                >
                                    {blog.cover && (
                                        <div className="w-full h-36 overflow-hidden">
                                            <img
                                                src={blog.cover}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="p-2 flex flex-col justify-center h-16">
                                        <h3 className="font-bold text-sm text-white group-hover:text-[var(--brand-green)] transition-colors line-clamp-3">
                                            {blog.title}
                                        </h3>
                                    </div>
                                </a>
                                {/* Arrow below each card */}
                                <svg width="24" height="24" viewBox="0 0 40 40" className="text-[var(--brand-green)] mt-2">
                                    <path d="M20 5 L20 35 M15 30 L20 35 L25 30" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 4: Better */}
                <div className="relative">
                    <h2 className="text-lg font-bold text-center mb-3 text-white">
                        HOW WE ARE BETTER THAN EXISTING SOLUTIONS
                    </h2>
                    {/* Row 4 Navigation Arrows */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center hover:bg-[#2a9650] transition-all shadow-lg"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center hover:bg-[#2a9650] transition-all shadow-lg"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <div
                        ref={row4Ref}
                        onScroll={() => row4Ref.current && handleScroll(row4Ref)}
                        className="flex gap-10 overflow-x-auto scrollbar-hide pb-2 px-8"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {betterBlogs.map((blog) => (
                            <div key={blog.slug} className="flex flex-col items-center flex-shrink-0">
                                <a
                                    href={`/${blog.slug}`}
                                    className="group w-70 h-50 rounded-lg border-2 border-[var(--brand-green)] bg-[#0b0b0b] overflow-hidden hover:border-[#2a9650] hover:shadow-lg hover:shadow-[var(--brand-green)]/20 transition-all duration-300"
                                >
                                    {blog.cover && (
                                        <div className="w-full h-36 overflow-hidden">
                                            <img
                                                src={blog.cover}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="p-2 flex flex-col justify-center h-16">
                                        <h3 className="font-bold text-sm text-white group-hover:text-[var(--brand-green)] transition-colors line-clamp-3">
                                            {blog.title}
                                        </h3>
                                    </div>
                                </a>
                                {/* No arrow on last row */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-[var(--brand-green)]/30"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
