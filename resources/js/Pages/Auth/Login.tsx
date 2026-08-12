import { useEffect, FormEventHandler, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Button from '@/Components/ui/Button';
import Input from '@/Components/ui/Input';
import RolePicker from '@/Components/app/RolePicker';
import { UserRole } from '@/types';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword?: boolean;
}) {
    const [selectedRole, setSelectedRole] = useState<UserRole>('student');

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        role: 'student' as UserRole,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleRoleChange = (role: UserRole) => {
        setSelectedRole(role);
        setData('role', role);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Masuk ke Akun" />

            <div className="space-y-5">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-brand-950">Selamat Datang Kembali</h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Silakan masuk untuk melanjutkan sesi kesehatan mentalmu
                    </p>
                </div>

                {status && (
                    <div className="rounded-lg bg-emerald-50 p-3 text-xs font-medium text-emerald-700 border border-emerald-200 text-center">
                        {status}
                    </div>
                )}

                {/* Display general login error if credential failure occurs */}
                {errors.email && (
                    <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
                        {errors.email}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    {/* Role Picker ("Masuk Sebagai") */}
                    <RolePicker
                        value={selectedRole}
                        onChange={handleRoleChange}
                    />

                    {/* Email Input */}
                    <Input
                        label="Alamat Email"
                        type="email"
                        name="email"
                        placeholder="contoh@mahasigmind.id"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                        required
                    />

                    {/* Password Input */}
                    <Input
                        label="Kata Sandi"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                        required
                    />

                    <div className="flex items-center justify-between text-xs pt-1">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                            />
                            <span>Ingat Saya</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-brand-700 hover:underline font-medium"
                            >
                                Lupa kata sandi?
                            </Link>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="primary"
                        loading={processing}
                        className="py-3 text-base font-semibold"
                    >
                        Masuk
                    </Button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-4">
                    <div className="w-full border-t border-slate-200" />
                    <span className="absolute bg-white px-3 text-xs text-slate-400 uppercase tracking-wider">
                        atau
                    </span>
                </div>

                {/* Google Login Button */}
                <a
                    href={route('google.redirect')}
                    className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-slate-300 bg-white py-2.5 px-4 text-sm font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    <span>Masuk dengan Google</span>
                </a>

                {/* Footer Link */}
                <p className="text-center text-xs text-slate-500 pt-2">
                    Belum memiliki akun?{' '}
                    <Link
                        href={route('register')}
                        className="font-semibold text-brand-700 hover:underline"
                    >
                        Daftar sekarang
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
