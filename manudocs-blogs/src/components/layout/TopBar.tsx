"use client";

import {
    Search,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    MessageCircle,
} from "lucide-react";

export default function TopBar() {
    const scrollToSearch = () => {
        const el = document.getElementById("blog-search");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            (el as HTMLInputElement)?.focus();
        }
    };

    return (
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* =====================
            LEFT: BRAND LOGO
        ===================== */}
                <div className="flex items-center gap-3">
                    <a
                        href="https://manudocs.com"
                        className="flex items-center gap-2"
                    >
                        <img
                            src="https://i.postimg.cc/GmQwgTBx/favicon_96x96.png"
                            alt="ManuDocs Logo"
                            className="w-9 h-9 object-contain"
                        />


                    </a>
                </div>

                {/* =====================
            RIGHT: ACTIONS
        ===================== */}
                <div className="flex items-center gap-4 text-gray-400">

                    {/* SEARCH BUTTON */}
                    <button
                        onClick={scrollToSearch}
                        className="flex items-center gap-2 text-sm border border-gray-700 px-3 py-1.5 rounded-lg
                       hover:border-[var(--brand-green)] hover:text-white transition"
                        title="Search articles"
                    >
                        <Search size={16} />
                        <span className="hidden md:inline">
                            Search
                        </span>
                    </button>

                    {/* SOCIAL ICONS */}
                    <a
                        href="https://twitter.com/ManuDocs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                        title="Twitter / X"
                    >
                        <Twitter size={18} />
                    </a>

                    <a
                        href="https://www.linkedin.com/company/manudocs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                        title="LinkedIn"
                    >
                        <Linkedin size={18} />
                    </a>

                    <a
                        href="https://www.instagram.com/manudocs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                        title="Instagram"
                    >
                        <Instagram size={18} />
                    </a>

                    <a
                        href="mailto:contact@manudocs.com"
                        className="hover:text-white transition "
                        title="Email"
                    >
                        <Mail size={18} />
                    </a>

                    <a
                        href="https://chat.whatsapp.com/YOUR_COMMUNITY_LINK"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp Community"
                        className="transition opacity-80 hover:opacity-100"
                    >
                        <img
                            src="https://i.postimg.cc/k52t9pVZ/whatsapp-white-icon.jpg"
                            alt="WhatsApp Community"
                            className="w-[18px] h-[18px] object-contain"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
