"use client";

import { useState } from "react";
import { Share2, Twitter, Linkedin, Link2, Check } from "lucide-react";

type ShareButtonProps = {
  title: string;
  url: string;
};

export function ShareButton({ title, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://blogs.manudocs.com${url}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(linkedInUrl, "_blank");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg 
                   bg-[var(--brand-green)] text-white font-medium
                   hover:bg-[#2a9650] transition-all duration-200
                   shadow-lg hover:shadow-xl"
        aria-label="Share article"
      >
        <Share2 size={18} />
        <span className="hidden sm:inline">Share</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div
            className="absolute right-0 mt-2 w-56 rounded-xl 
                       bg-white dark:bg-[#1a1a1a] 
                       border border-gray-200 dark:border-gray-700
                       shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-2 space-y-1">
              {/* Twitter */}
              <button
                onClick={shareOnTwitter}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                           text-gray-700 dark:text-gray-200
                           hover:bg-gray-100 dark:hover:bg-gray-800
                           transition-colors text-left"
              >
                <Twitter size={20} className="text-[#1DA1F2]" />
                <span className="font-medium">Share on Twitter</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={shareOnLinkedIn}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                           text-gray-700 dark:text-gray-200
                           hover:bg-gray-100 dark:hover:bg-gray-800
                           transition-colors text-left"
              >
                <Linkedin size={20} className="text-[#0A66C2]" />
                <span className="font-medium">Share on LinkedIn</span>
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                           text-gray-700 dark:text-gray-200
                           hover:bg-gray-100 dark:hover:bg-gray-800
                           transition-colors text-left"
              >
                {copied ? (
                  <>
                    <Check size={20} className="text-green-500" />
                    <span className="font-medium text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 size={20} className="text-gray-500" />
                    <span className="font-medium">Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
