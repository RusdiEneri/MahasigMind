import { PropsWithChildren } from 'react';
import Logo from '@/Components/app/Logo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-brand-100 via-brand-100 to-white flex flex-col items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md flex flex-col items-center">
                <div className="mb-6 flex justify-center">
                    <Link href="/" className="transition hover:opacity-90">
                        <Logo size="lg" variant="withText" />
                    </Link>
                </div>

                <div className="w-full rounded-2xl border border-slate-100 bg-white/95 p-6 shadow-lg backdrop-blur-sm sm:p-8">
                    {children}
                </div>

                <p className="mt-6 text-center text-xs text-slate-500">
                    &copy; {new Date().getFullYear()} MahasigMind. Platform Kesehatan Mental Mahasiswa.
                </p>
            </div>
        </div>
    );
}
