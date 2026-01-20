type Props = {
    src: string;
    alt: string;
    size?: "small" | "medium" | "large";
    href?: string;
};

export function Image({
    src,
    alt,
    size = "medium",
    href,
}: Props) {
    const sizeClasses = {
        small: "max-w-sm",
        medium: "max-w-2xl",
        large: "max-w-4xl",
    };

    return (
        <div
            className={`my-8 mx-auto ${sizeClasses[size]} w-full group`}
        >
            {href ? (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block overflow-hidden rounded-xl"
                >
                    {/* IMAGE */}
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-auto max-w-full object-cover rounded-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-80"
                    />

                    {/* HOVER OVERLAY */}
                    <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 transition">
                        <span className="text-sm font-medium text-white bg-black/60 px-3 py-1 rounded-full">
                            View
                        </span>

                        <span className="text-white text-lg bg-black/60 px-3 py-1 rounded-full">
                            ↗
                        </span>
                    </div>
                </a>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto max-w-full rounded-xl object-cover"
                />
            )}
        </div>
    );
}
