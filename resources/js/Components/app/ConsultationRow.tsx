import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import { User } from '@/types';
import { Link } from '@inertiajs/react';

export interface ConsultationRowData {
    id: number;
    category: string;
    description: string;
    status: string;
    preferred_time: string;
    user?: User;
}

export interface ConsultationRowProps {
    consultation: ConsultationRowData;
    onAccept?: (consultation: ConsultationRowData) => void;
    onReject?: (consultation: ConsultationRowData) => void;
    className?: string;
}

export default function ConsultationRow({
    consultation,
    onAccept,
    onReject,
    className = '',
}: ConsultationRowProps) {
    const formattedDate = new Date(consultation.preferred_time).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });

    const isPending = consultation.status === 'pending';
    const isAccepted = consultation.status === 'processed' || consultation.status === 'accepted';
    const isRejected = consultation.status === 'cancelled' || consultation.status === 'rejected';

    return (
        <div
            className={`rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition hover:shadow-md ${className}`}
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-sm">
                        {consultation.user?.name ? consultation.user.name.charAt(0) : 'M'}
                    </div>

                    <div className="space-y-0.5">
                        <Link
                            href={
                                consultation.user
                                    ? route('psikolog.students.show', consultation.user.id)
                                    : '#'
                            }
                            className="text-sm font-semibold text-brand-950 hover:text-brand-700 transition"
                        >
                            {consultation.user?.name || 'Mahasiswa'}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>{consultation.category}</span>
                            <span>•</span>
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                </div>

                <Badge
                    tone={
                        isAccepted
                            ? 'success'
                            : isRejected
                            ? 'danger'
                            : 'warning'
                    }
                >
                    {isAccepted ? 'Disetujui' : isRejected ? 'Ditolak' : 'Menunggu'}
                </Badge>
            </div>

            <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                "{consultation.description}"
            </p>

            {isPending && (onAccept || onReject) && (
                <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-100 pt-2.5">
                    {onReject && (
                        <Button
                            variant="outline"
                            className="text-xs py-1.5 px-3 border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => onReject(consultation)}
                        >
                            Tolak
                        </Button>
                    )}
                    {onAccept && (
                        <Button
                            variant="primary"
                            className="text-xs py-1.5 px-3"
                            onClick={() => onAccept(consultation)}
                        >
                            Setujui Konsultasi
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
