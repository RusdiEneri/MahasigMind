import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import EmptyState from '@/Components/ui/EmptyState';
import Badge from '@/Components/ui/Badge';

export interface ConsultationItem {
    id: number;
    category: string;
    description: string;
    status: string;
    preferred_time: string;
    user?: User;
}

export interface PsikologChatIndexProps extends PageProps {
    consultations?: ConsultationItem[];
}

export default function Index({ auth, consultations = [] }: PsikologChatIndexProps) {
    return (
        <AuthenticatedLayout user={auth.user} title="Chat Klien">
            <Head title="Chat Klien Konsultasi" />

            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-bold text-brand-950">Daftar Chat Klien</h2>
                    <p className="text-xs text-slate-500">Sesi bimbingan aktif dengan mahasiswa</p>
                </div>

                {consultations.length === 0 ? (
                    <EmptyState
                        title="Belum Ada Chat Aktif"
                        description="Belum ada mahasiswa yang terhubung dalam sesi chat aktif saat ini."
                    />
                ) : (
                    <div className="space-y-3">
                        {consultations.map((item) => (
                            <Link
                                key={item.id}
                                href={route('psikolog.chat.show', item.id)}
                                className="block rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700 text-sm">
                                            {item.user?.name ? item.user.name.charAt(0) : 'M'}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-brand-950">
                                                {item.user?.name || 'Mahasiswa'}
                                            </h4>
                                            <span className="text-[11px] text-slate-400">{item.category}</span>
                                        </div>
                                    </div>

                                    <Badge
                                        tone={
                                            item.status === 'processed'
                                                ? 'success'
                                                : item.status === 'cancelled'
                                                ? 'danger'
                                                : 'warning'
                                        }
                                    >
                                        {item.status === 'processed'
                                            ? 'Sesi Aktif'
                                            : item.status === 'cancelled'
                                            ? 'Dibatalkan'
                                            : 'Menunggu'}
                                    </Badge>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
