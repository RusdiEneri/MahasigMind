import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import Card from '@/Components/ui/Card';
import Input from '@/Components/ui/Input';
import TimeSlotPicker, { TimeSlotItem } from '@/Components/app/TimeSlotPicker';

export interface SchedulePageProps extends PageProps {
    date?: string;
    availabilities?: TimeSlotItem[];
}

export default function Schedule({
    auth,
    date = new Date().toISOString().slice(0, 10),
    availabilities = [],
}: SchedulePageProps) {
    const [selectedDate, setSelectedDate] = useState(date);

    const handleDateChange = (newDate: string) => {
        setSelectedDate(newDate);
        router.get(
            route('psikolog.schedule'),
            { date: newDate },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleToggleSlot = (time: string, isAvailable: boolean) => {
        router.post(
            route('psikolog.schedule.update'),
            {
                date: selectedDate,
                time: time,
                is_available: isAvailable,
            },
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Jadwal Ketersediaan">
            <Head title="Kelola Jadwal Konsultasi" />

            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-bold text-brand-950">Kelola Slot Konsultasi</h2>
                    <p className="text-xs text-slate-500">Atur jam operasional ketersediaan bimbingan Anda</p>
                </div>

                <Card>
                    <div className="space-y-4">
                        <Input
                            label="Pilih Tanggal Operasional"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => handleDateChange(e.target.value)}
                        />

                        <TimeSlotPicker
                            slots={availabilities}
                            onToggleSlot={handleToggleSlot}
                        />

                        <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 border border-slate-100">
                            💡 <strong>Petunjuk:</strong> Klik pada slot jam untuk menghidupkan (Tersedia) atau mematikan (Tutup) slot bagi mahasiswa.
                        </div>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
