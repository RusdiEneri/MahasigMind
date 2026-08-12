import BottomSheet from '@/Components/ui/BottomSheet';
import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';

export interface ArticleData {
    id: number;
    title: string;
    category: string;
    content: string;
    author?: {
        name: string;
    };
    created_at?: string;
}

export interface ArticleSheetProps {
    open: boolean;
    onClose: () => void;
    article?: ArticleData | null;
}

export default function ArticleSheet({
    open,
    onClose,
    article,
}: ArticleSheetProps) {
    if (!article) return null;

    return (
        <BottomSheet open={open} onClose={onClose} title={article.category || 'Artikel Edukasi'}>
            <div className="space-y-4 py-2">
                <div className="space-y-1.5">
                    <Badge tone="info">{article.category}</Badge>
                    <h2 className="text-lg font-bold text-brand-950 leading-snug">
                        {article.title}
                    </h2>
                    {article.author && (
                        <p className="text-xs text-slate-500 font-medium">
                            Ditulis oleh: <span className="text-brand-700">{article.author.name}</span>
                        </p>
                    )}
                </div>

                <div className="border-t border-b border-slate-100 py-3 text-xs text-slate-700 leading-relaxed whitespace-pre-line max-h-[50vh] overflow-y-auto pr-1">
                    {article.content}
                </div>

                <div className="pt-1">
                    <Button variant="primary" fullWidth onClick={onClose}>
                        Tutup Artikel
                    </Button>
                </div>
            </div>
        </BottomSheet>
    );
}
