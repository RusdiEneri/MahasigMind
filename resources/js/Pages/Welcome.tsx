import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import Card from '@/Components/ui/Card';

export default function Welcome({ auth }: PageProps) {
    return (
        <GuestLayout>
            <Head title="Selamat Datang - MahasigMind" />
            
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <Badge tone="info">Platform Kesehatan Mental Mahasiswa</Badge>
                </div>

                <h1 className="text-2xl font-bold text-brand-950">
                    Ruang Aman untuk Pikiran & Jiwamu
                </h1>
                
                <p className="text-sm text-slate-600 leading-relaxed">
                    Pantau suasana hati harianmu, tulis jurnal pribadi, dan terhubung dengan psikolog profesional kapan saja.
                </p>

                <Card className="text-left bg-gradient-to-br from-brand-700 to-brand-500 text-white border-0 my-6 shadow-md">
                    <div className="p-1">
                        <span className="text-xs uppercase tracking-wider text-brand-100 font-semibold">
                            Fitur Utama
                        </span>
                        <h3 className="text-lg font-bold mt-1 text-white">Mood Tracker & Journaling</h3>
                        <p className="text-xs text-brand-100 mt-1">
                            Catat perasaanmu hari ini dan dapatkan wawasan emosional secara berkala.
                        </p>
                    </div>
                </Card>

                <div className="pt-2 space-y-3">
                    {auth.user ? (
                        <Link href={route('dashboard')}>
                            <Button fullWidth variant="primary" className="text-base font-semibold py-3">
                                Buka Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="block">
                                <Button fullWidth variant="primary" className="text-base font-semibold py-3">
                                    Masuk Ke Akun
                                </Button>
                            </Link>
                            
                            <Link href={route('register')} className="block">
                                <Button fullWidth variant="outline" className="text-base font-semibold py-3">
                                    Daftar Sekarang
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
