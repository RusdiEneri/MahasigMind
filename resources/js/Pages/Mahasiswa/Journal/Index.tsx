import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Journal, PageProps } from '@/types';
import Button from '@/Components/ui/Button';
import EmptyState from '@/Components/ui/EmptyState';
import JournalCard from '@/Components/app/JournalCard';

export interface JournalIndexProps extends PageProps {
    journals?: Journal[];
}

export default function Index({ auth, journals = [] }: JournalIndexProps) {
    const handleDeleteJournal = (id: number) => {
        if (confirm('Apakah kamu yakin ingin menghapus catatan jurnal ini?')) {
            router.delete(route('journals.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Jurnal Harian">
            <Head title="Jurnal Saya" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-brand-950">Galeri Jurnal Refleksi</h2>
                        <p className="text-xs text-slate-500">Ruang pribadi untuk mencurahkan perasaanmu</p>
                    </div>

                    <Link href={route('mahasiswa.journal.create')}>
                        <Button variant="primary" className="text-xs">
                            + Tulis Jurnal
                        </Button>
                    </Link>
                </div>

                {journals.length === 0 ? (
                    <EmptyState
                        title="Belum Ada Jurnal"
                        description="Kamu belum menulis jurnal refleksi. Mulai tuangkan pikiran dan perasaanmu hari ini."
                        action={
                            <Link href={route('mahasiswa.journal.create')}>
                                <Button variant="primary">Tulis Jurnal Pertama</Button>
                            </Link>
                        }
                    />
                ) : (
                    <div className="space-y-3">
                        {journals.map((journal) => (
                            <JournalCard
                                key={journal.id}
                                journal={journal}
                                onDelete={handleDeleteJournal}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
