import Badge from '@/Components/ui/Badge';
import { Journal } from '@/types';
import { Link } from '@inertiajs/react';

export interface JournalCardProps {
    journal: Journal;
    onDelete?: (id: number) => void;
    className?: string;
}

export default function JournalCard({
    journal,
    onDelete,
    className = '',
}: JournalCardProps) {
    const formattedDate = new Date(journal.created_at).toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div
            className={`overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition hover:shadow-md ${className}`}
        >
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <span className="text-[11px] font-medium text-slate-400">
                    {formattedDate}
                </span>
                <Badge tone="info">{journal.category || 'Refleksi'}</Badge>
            </div>

            <Link href={route().has('mahasiswa.journal.show') ? route('mahasiswa.journal.show', journal.id) : '#'}>
                <h4 className="mt-2.5 text-base font-semibold text-brand-950 hover:text-brand-700 transition">
                    {journal.title}
                </h4>
                <p className="mt-1 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {journal.content}
                </p>
            </Link>

            {onDelete && (
                <div className="mt-3 flex justify-end border-t border-slate-50 pt-2">
                    <button
                        onClick={() => onDelete(journal.id)}
                        className="text-xs font-medium text-red-500 hover:text-red-700 transition"
                    >
                        Hapus Jurnal
                    </button>
                </div>
            )}
        </div>
    );
}
