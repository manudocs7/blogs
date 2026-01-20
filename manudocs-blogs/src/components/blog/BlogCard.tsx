import Link from "next/link";
import { BlogMeta } from "@/lib/getBlogs";

type Props = {
    blog: BlogMeta;
};

export default function BlogCard({ blog }: Props) {
    return (
        <Link href={`/${blog.slug}`}>
            <div className="border rounded-xl p-4 hover:shadow-md transition">
                {blog.cover && (
                    <img
                        src={blog.cover}
                        alt={blog.title}
                        className="mb-3 rounded-lg w-full h-48 object-cover"
                    />
                )}

                <h3 className="text-lg font-semibold mb-1">
                    {blog.title}
                </h3>

                {blog.summary && (
                    <p className="text-sm text-gray-600 mb-2">
                        {blog.summary}
                    </p>
                )}

                <div className="text-xs text-gray-500">
                    {blog.date}
                </div>
            </div>
        </Link>
    );
}
