import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import { User } from '@/types';

export interface PsychologistCardProps {
    psychologist: User;
    specialization?: string;
    estimatedTime?: string;
    onSelect?: (psychologist: User) => void;
    className?: string;
}

export default function PsychologistCard({
    psychologist,
    specialization = 'Konseling Umum & Akademik',
    estimatedTime = '1–3 jam',
    onSelect,
    className = '',
}: PsychologistCardProps) {
    return (
        <div
            className={`flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition hover:shadow-md ${className}`}
        >
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-base border border-brand-300/50">
                    {psychologist.name.charAt(0)}
                </div>

                <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-brand-950 leading-snug">
                        {psychologist.name}
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge tone="info">{specialization}</Badge>
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                            <svg className="h-3.5 w-3.5 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {estimatedTime}
                        </span>
                    </div>
                </div>
            </div>

            {onSelect && (
                <Button
                    variant="primary"
                    onClick={() => onSelect(psychologist)}
                    className="shrink-0 text-xs px-3 py-1.5"
                >
                    Pilih
                </Button>
            )}
        </div>
    );
}
