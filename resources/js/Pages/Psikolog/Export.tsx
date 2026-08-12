import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import SearchInput from '@/Components/ui/SearchInput';
import Badge from '@/Components/ui/Badge';
import EmptyState from '@/Components/ui/EmptyState';
import { ConsultationRowData } from '@/Components/app/ConsultationRow';

export interface PsikologExportProps extends PageProps {
    consultations?: ConsultationRowData[];
    search?: string;
}

export default function Export({
    auth,
    consultations = [],
    search = '',
}: PsikologExportProps) {
    const [searchQuery, setSearchQuery] = useState(search);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        router.get(
            route('psikolog.export'),
            query ? { search: query } : {},
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleDownloadCsv = () => {
        window.open(route('psikolog.export.download'), '_blank');
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Ekspor Data Konsultasi">
            <Head title="Ekspor Data Konsultasi" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-brand-950">Laporan Rekapitulasi</h2>
                        <p className="text-xs text-slate-500">Unduh data riwayat bimbingan & konsultasi</p>
                    </div>

                    <Button variant="primary" onClick={handleDownloadCsv} className="text-xs">
                        📥 Unduh CSV
                    </Button>
                </div>

                <Card>
                    <div className="space-y-4">
                        <SearchInput
                            placeholder="Cari berdasarkan nama atau email mahasiswa..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            onClear={() => handleSearch('')}
                        />

                        {consultations.length === 0 ? (
                            <EmptyState
                                title="Data Tidak Ditemukan"
                                description="Tidak ada data konsultasi yang cocok dengan kueri pencarian."
                            />
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs text-slate-600">
                                    <thead className="bg-slate-50 text-brand-950 font-bold uppercase tracking-wider border-b border-slate-100">
                                        <tr>
                                            <th className="py-3 px-3">Mahasiswa</th>
                                            <th className="py-3 px-3">Kategori</th>
                                            <th className="py-3 px-3">Tanggal</th>
                                            <th className="py-3 px-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {consultations.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                                <td className="py-3 px-3 font-semibold text-brand-950">
                                                    {item.user?.name || '-'}
                                                </td>
                                                <td className="py-3 px-3">{item.category}</td>
                                                <td className="py-3 px-3">
                                                    {new Date(item.preferred_time).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </td>
                                                <td className="py-3 px-3">
                                                    <Badge
                                                        tone={
                                                            item.status === 'processed' || item.status === 'accepted'
                                                                ? 'success'
                                                                : item.status === 'cancelled' || item.status === 'rejected'
                                                                ? 'danger'
                                                                : 'warning'
                                                        }
                                                    >
                                                        {item.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
