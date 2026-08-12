import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import EmptyState from '@/Components/ui/EmptyState';
import PsychologistPickerSheet from '@/Components/app/PsychologistPickerSheet';
import Modal from '@/Components/ui/Modal';
import Input from '@/Components/ui/Input';
import Textarea from '@/Components/ui/Textarea';

export interface ConsultationItem {
    id: number;
    category: string;
    description: string;
    status: string;
    preferred_time: string;
    psychologist?: User;
}

export interface ChatIndexProps extends PageProps {
    consultations?: ConsultationItem[];
    psychologists?: User[];
}

export default function Index({
    auth,
    consultations = [],
    psychologists = [],
}: ChatIndexProps) {
    const [pickerOpen, setPickerOpen] = useState(false);
    const [selectedPsy, setSelectedPsy] = useState<User | null>(null);
    const [formModalOpen, setFormModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        psychologist_id: '',
        category: 'Akademik & Stres Kuliah',
        preferred_time: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
        description: '',
    });

    const handleSelectPsychologist = (psy: User) => {
        setSelectedPsy(psy);
        setData('psychologist_id', String(psy.id));
        setFormModalOpen(true);
    };

    const handleConsultationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('mahasiswa.consultation.store'), {
            onSuccess: () => {
                setFormModalOpen(false);
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Konsultasi Psikolog">
            <Head title="Konsultasi Psikolog" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-brand-950">Sesi Konsultasi Saya</h2>
                        <p className="text-xs text-slate-500">Terhubung dengan psikolog profesional</p>
                    </div>

                    <Button variant="primary" onClick={() => setPickerOpen(true)}>
                        + Konsultasi Baru
                    </Button>
                </div>

                {consultations.length === 0 ? (
                    <EmptyState
                        title="Belum Ada Sesi Konsultasi"
                        description="Kamu belum memiliki sesi konsultasi aktif. Klik tombol di bawah untuk memilih psikolog."
                        action={
                            <Button variant="primary" onClick={() => setPickerOpen(true)}>
                                Pilih Psikolog
                            </Button>
                        }
                    />
                ) : (
                    <div className="space-y-3">
                        {consultations.map((item) => (
                            <Link
                                key={item.id}
                                href={route('mahasiswa.chat.show', item.id)}
                                className="block rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700 text-sm">
                                            {item.psychologist?.name ? item.psychologist.name.charAt(0) : 'P'}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-brand-950">
                                                {item.psychologist?.name || 'Psikolog MahasigMind'}
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
                                            ? 'Aktif'
                                            : item.status === 'cancelled'
                                            ? 'Ditolak'
                                            : 'Menunggu'}
                                    </Badge>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Overlay Picker Sheet */}
            <PsychologistPickerSheet
                open={pickerOpen}
                onClose={() => setPickerOpen(false)}
                psychologists={psychologists}
                onSelectPsychologist={handleSelectPsychologist}
            />

            {/* Modal Form Permintaan Konsultasi */}
            <Modal
                open={formModalOpen}
                onClose={() => setFormModalOpen(false)}
                title={`Ajukan Konsultasi (${selectedPsy?.name ?? ''})`}
            >
                <form onSubmit={handleConsultationSubmit} className="space-y-3 pt-2">
                    <Input
                        label="Topik / Kategori"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        error={errors.category}
                        required
                    />

                    <Input
                        label="Waktu yang Diinginkan"
                        type="datetime-local"
                        value={data.preferred_time}
                        onChange={(e) => setData('preferred_time', e.target.value)}
                        error={errors.preferred_time}
                        required
                    />

                    <Textarea
                        label="Keluhan / Cerita Singkat"
                        placeholder="Tuliskan alasan atau topik yang ingin didiskusikan..."
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        error={errors.description}
                        required
                    />

                    <div className="pt-2 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setFormModalOpen(false)}>
                            Batal
                        </Button>
                        <Button type="submit" variant="primary" loading={processing}>
                            Kirim Permintaan
                        </Button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
