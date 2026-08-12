import Badge from '@/Components/ui/Badge';
import { User } from '@/types';

export interface ForumCategoryData {
    id: number;
    name: string;
}

export interface ForumPostData {
    id: number;
    title: string;
    content: string;
    created_at: string;
    user?: User;
    category?: ForumCategoryData;
    replies_count?: number;
}

export interface ForumPostCardProps {
    post: ForumPostData;
    onReplyClick?: (post: ForumPostData) => void;
    className?: string;
}

export default function ForumPostCard({
    post,
    onReplyClick,
    className = '',
}: ForumPostCardProps) {
    const formattedDate = new Date(post.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div
            className={`rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition hover:shadow-md ${className}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-xs">
                        {post.user?.name ? post.user.name.charAt(0) : 'U'}
                    </div>
                    <div>
                        <h5 className="text-xs font-semibold text-brand-950">
                            {post.user?.name || 'Mahasiswa'}
                        </h5>
                        <span className="text-[10px] text-slate-400">{formattedDate}</span>
                    </div>
                </div>
                {post.category && <Badge tone="info">{post.category.name}</Badge>}
            </div>

            <h4 className="mt-3 text-sm font-bold text-brand-950">{post.title}</h4>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed break-words">
                {post.content}
            </p>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <svg className="h-4 w-4 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.replies_count ?? 0} Balasan
                </span>

                {onReplyClick && (
                    <button
                        onClick={() => onReplyClick(post)}
                        className="text-xs font-semibold text-brand-700 hover:text-brand-950 transition"
                    >
                        + Balas
                    </button>
                )}
            </div>
        </div>
    );
}
