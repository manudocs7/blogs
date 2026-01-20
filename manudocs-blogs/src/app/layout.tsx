import type { Metadata } from "next";
import "./globals.css";

/* =========================
   GLOBAL SEO + BRAND SETUP
========================= */
export const metadata: Metadata = {
  /* Base URL for absolute metadata (OG, canonical, etc.) */
  metadataBase: new URL("https://blogs.manudocs.com"),

  /* Default + dynamic titles */
  title: {
    default: "ManuDocs Blogs – Trade, Exports & Global Commerce",
    template: "%s | ManuDocs Blogs",
  },

  /* Default description (used when page-level desc not provided) */
  description:
    "Insights, research, and analysis on global trade, exports, MSMEs, logistics, and policy by ManuDocs.",

  /* Favicon & App Icons */
  icons: {
    icon: "/favicon.ico",              // Browser + Google
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",    // iOS
  },

  /* Web App Manifest */
  manifest: "/site.webmanifest",

  /* Open Graph defaults (can be overridden per page/blog) */
  openGraph: {
    siteName: "ManuDocs Blogs",
    type: "website",
    url: "https://blogs.manudocs.com",
  },

  /* Twitter card defaults */
  twitter: {
    card: "summary_large_image",
    site: "@ManuDocs",
  },

  /* Robots (safe defaults) */
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
