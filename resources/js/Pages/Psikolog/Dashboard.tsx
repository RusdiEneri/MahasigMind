import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Card from '@/Components/ui/Card';
import StatCard from '@/Components/ui/StatCard';
import ConsultationRow, { ConsultationRowData } from '@/Components/app/ConsultationRow';

export interface PsikologDashboardProps extends PageProps {
    stats?: {
        activeClients: number;
        sessionsToday: number;
        journalsReceived: number;
        myArticles: number;
    };
    pendingConsultations?: ConsultationRowData[];
    todaysSchedule?: { time: string; studentName: string; category: string }[];
}

export default function Dashboard({
    auth,
    stats = {
        activeClients: 4,
        sessionsToday: 2,
        journalsReceived: 8,
        myArticles: 3,
    },
    pendingConsultations = [],
    todaysSchedule = [
        { time: '09:00 - 10:00', studentName: 'Rizky Pratama', category: 'Kecemasan Akademik' },
        { time: '14:00 - 15:00', studentName: 'Siti Nurhaliza', category: 'Relasi Pertemanan' },
    ],
}: PsikologDashboardProps) {
    return (
        <AuthenticatedLayout user={auth.user} title="Dashboard Psikolog">
            <Head title="Dashboard - Psikolog" />

            <div className="space-y-5">
                {/* Header Gradient Card */}
                <Card className="border-0 bg-gradient-to-br from-brand-700 to-brand-500 text-white shadow-md">
                    <div className="p-1 space-y-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-brand-100">
                            Dashboard Konselor
                        </span>
                        <h2 className="text-xl font-bold text-white">
                            Halo, {auth.user.name} 👋
                        </h2>
                        <p className="text-xs text-brand-100 leading-relaxed pt-1">
                            Selamat datang kembali di panel psikolog MahasigMind. Pantau jadwal dan permintaan mahasiswa.
                        </p>
                    </div>
                </Card>

                {/* StatCards Grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <StatCard
                        label="Klien Aktif"
                        value={stats.activeClients}
                    />
                    <StatCard
                        label="Sesi Hari Ini"
                        value={stats.sessionsToday}
                    />
                    <StatCard
                        label="Jurnal Masuk"
                        value={stats.journalsReceived}
                    />
                    <StatCard
                        label="Artikel Saya"
                        value={stats.myArticles}
                    />
                </div>

                {/* Schedule Today Preview */}
                <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-brand-950">Jadwal Sesi Hari Ini</h3>
                        <Link href={route('psikolog.schedule')} className="text-xs font-semibold text-brand-700">
                            Kelola Slot
                        </Link>
                    </div>

                    <div className="space-y-2">
                        {todaysSchedule.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3.5 shadow-xs"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="rounded-xl bg-brand-100 px-2.5 py-1 text-xs font-bold text-brand-700">
                                        {item.time}
                                    </span>
                                    <div>
                                        <h5 className="text-xs font-bold text-brand-950">{item.studentName}</h5>
                                        <span className="text-[11px] text-slate-400">{item.category}</span>
                                    </div>
                                </div>
                                <Link
                                    href={route('psikolog.chat.index')}
                                    className="text-xs font-semibold text-brand-700 hover:text-brand-950"
                                >
                                    Buka Chat →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending Consultation Requests Preview */}
                <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-brand-950">Permintaan Konsultasi Baru</h3>
                        <Link href={route('psikolog.consultations')} className="text-xs font-semibold text-brand-700">
                            Lihat Semua
                        </Link>
                    </div>

                    {pendingConsultations.length === 0 ? (
                        <div className="p-4 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-100">
                            Belum ada permintaan konsultasi baru yang menunggu persetujuan.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {pendingConsultations.map((item) => (
                                <ConsultationRow key={item.id} consultation={item} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
