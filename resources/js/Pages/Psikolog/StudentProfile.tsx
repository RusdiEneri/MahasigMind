import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Journal, PageProps, User } from '@/types';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import JournalCard from '@/Components/app/JournalCard';

export interface StudentProfileProps extends PageProps {
    student?: User;
    journals?: Journal[];
    hasRiskWarning?: boolean;
    warningReason?: string;
}

export default function StudentProfile({
    auth,
    student,
    journals = [],
    hasRiskWarning = false,
    warningReason = '',
}: StudentProfileProps) {
    if (!student) {
        return (
            <AuthenticatedLayout user={auth.user} title="Profil Mahasiswa" showBack>
                <Card className="py-8 text-center">
                    <p className="text-xs text-slate-500">Data mahasiswa tidak ditemukan.</p>
                </Card>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout user={auth.user} title="Profil Mahasiswa" showBack>
            <Head title={`Profil Mahasiswa - ${student.name}`} />

            <div className="space-y-4">
                {/* Student Header Card */}
                <Card className="bg-white">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700 text-xl border border-brand-300/50">
                            {student.name.charAt(0)}
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-base font-bold text-brand-950">{student.name}</h2>
                            <p className="text-xs text-slate-500">{student.email}</p>
                            <Badge tone="info">Mahasiswa MahasigMind</Badge>
                        </div>
                    </div>
                </Card>

                {/* Risk Assessment Yellow Warning Card */}
                {hasRiskWarning && (
                    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-950 shadow-xs">
                        <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-800 font-bold">
                                ⚠️
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                                    Catatan Peringatan Risiko Emosional
                                </h4>
                                <p className="text-xs text-amber-800 leading-relaxed">
                                    {warningReason || 'Mahasiswa ini mencatatkan tingkat kecemasan atau mood rendah berturut-turut.'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Student Journals List */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-brand-950">Jurnal Refleksi Mahasiswa</h3>
                        <span className="text-xs text-slate-400 font-medium">
                            {journals.length} Catatan
                        </span>
                    </div>

                    {journals.length === 0 ? (
                        <div className="p-4 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-100">
                            Mahasiswa ini belum mempublikasikan catatan jurnal.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {journals.map((journal) => (
                                <JournalCard key={journal.id} journal={journal} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
