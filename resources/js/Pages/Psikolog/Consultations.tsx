import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import EmptyState from '@/Components/ui/EmptyState';
import ConsultationRow, { ConsultationRowData } from '@/Components/app/ConsultationRow';
import Modal from '@/Components/ui/Modal';
import Button from '@/Components/ui/Button';

export interface PsikologConsultationsProps extends PageProps {
    consultations?: ConsultationRowData[];
}

export default function Consultations({
    auth,
    consultations = [],
}: PsikologConsultationsProps) {
    const [selectedConsultation, setSelectedConsultation] = useState<ConsultationRowData | null>(null);
    const [actionType, setActionType] = useState<'accept' | 'reject' | null>(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const handlePromptAction = (consultation: ConsultationRowData, type: 'accept' | 'reject') => {
        setSelectedConsultation(consultation);
        setActionType(type);
        setConfirmModalOpen(true);
    };

    const handleConfirmAction = () => {
        if (!selectedConsultation || !actionType) return;

        const routeName =
            actionType === 'accept'
                ? 'psikolog.consultations.accept'
                : 'psikolog.consultations.reject';

        router.post(
            route(routeName, selectedConsultation.id),
            {},
            {
                onSuccess: () => {
                    setConfirmModalOpen(false);
                    setSelectedConsultation(null);
                    setActionType(null);
                },
            }
        );
    };

    const filteredConsultations = consultations.filter((item) => {
        if (statusFilter === 'all') return true;
        if (statusFilter === 'pending') return item.status === 'pending';
        if (statusFilter === 'accepted') return item.status === 'processed' || item.status === 'accepted';
        if (statusFilter === 'rejected') return item.status === 'cancelled' || item.status === 'rejected';
        return true;
    });

    return (
        <AuthenticatedLayout user={auth.user} title="Permintaan Konsultasi">
            <Head title="Permintaan Konsultasi Mahasiswa" />

            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-bold text-brand-950">Permintaan Konsultasi</h2>
                    <p className="text-xs text-slate-500">Kelola persetujuan bimbingan dari mahasiswa</p>
                </div>

                {/* Filter Status Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {[
                        { key: 'all', label: 'Semua Status' },
                        { key: 'pending', label: 'Menunggu Persetujuan' },
                        { key: 'accepted', label: 'Disetujui' },
                        { key: 'rejected', label: 'Ditolak' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setStatusFilter(tab.key)}
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition ${
                                statusFilter === tab.key
                                    ? 'bg-brand-500 text-white shadow-xs'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {filteredConsultations.length === 0 ? (
                    <EmptyState
                        title="Tidak Ada Permintaan"
                        description="Belum ada data permintaan konsultasi pada kategori status ini."
                    />
                ) : (
                    <div className="space-y-3">
                        {filteredConsultations.map((item) => (
                            <ConsultationRow
                                key={item.id}
                                consultation={item}
                                onAccept={(c) => handlePromptAction(c, 'accept')}
                                onReject={(c) => handlePromptAction(c, 'reject')}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            <Modal
                open={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                title={actionType === 'accept' ? 'Setujui Permintaan Konsultasi' : 'Tolak Permintaan Konsultasi'}
            >
                <div className="space-y-3 pt-2">
                    <p className="text-xs text-slate-600 leading-relaxed">
                        Apakah Anda yakin ingin{' '}
                        <strong>{actionType === 'accept' ? 'menyetujui' : 'menolak'}</strong> permintaan
                        konsultasi dari <strong>{selectedConsultation?.user?.name || 'Mahasiswa'}</strong>?
                    </p>

                    <div className="pt-2 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>
                            Batal
                        </Button>
                        <Button
                            variant={actionType === 'accept' ? 'primary' : 'danger'}
                            onClick={handleConfirmAction}
                        >
                            {actionType === 'accept' ? 'Ya, Setujui' : 'Ya, Tolak'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
