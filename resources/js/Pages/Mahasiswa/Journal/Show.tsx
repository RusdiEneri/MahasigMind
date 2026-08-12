import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Journal, PageProps } from '@/types';
import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import Card from '@/Components/ui/Card';

export interface JournalShowProps extends PageProps {
    journal?: Journal;
}

export default function Show({ auth, journal }: JournalShowProps) {
    if (!journal) {
        return (
            <AuthenticatedLayout user={auth.user} title="Detail Jurnal" showBack>
                <Card className="text-center py-8">
                    <p className="text-xs text-slate-500">Catatan jurnal tidak ditemukan.</p>
                </Card>
            </AuthenticatedLayout>
        );
    }

    const handleDelete = () => {
        if (confirm('Apakah kamu yakin ingin menghapus jurnal ini?')) {
            router.delete(route('journals.destroy', journal.id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Detail Jurnal" showBack>
            <Head title={`Jurnal - ${journal.title}`} />

            <div className="space-y-4">
                <Card>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <Badge tone="info">{journal.category || 'Refleksi'}</Badge>
                            <span className="text-xs text-slate-400">
                                {new Date(journal.created_at).toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>

                        <h2 className="text-lg font-bold text-brand-950">{journal.title}</h2>

                        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pt-2">
                            {journal.content}
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <Link href={route('mahasiswa.journal.index')}>
                                <Button variant="outline" className="text-xs">
                                    Kembali ke Galeri
                                </Button>
                            </Link>

                            <Button variant="danger" className="text-xs" onClick={handleDelete}>
                                Hapus Jurnal
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
