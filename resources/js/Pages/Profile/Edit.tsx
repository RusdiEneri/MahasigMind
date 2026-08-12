import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Pengaturan Akun">
            <Head title="Pengaturan Akun" />

            <div className="space-y-5">
                {/* Profile Header Card */}
                <Card className="bg-gradient-to-br from-brand-700 to-brand-500 text-white border-0">
                    <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 text-white font-bold text-xl backdrop-blur-xs">
                            {auth.user.name.charAt(0)}
                        </div>
                        <div className="space-y-0.5">
                            <h2 className="text-lg font-bold text-white leading-snug">{auth.user.name}</h2>
                            <p className="text-xs text-brand-100">{auth.user.email}</p>
                            <div className="pt-1">
                                <Badge tone="info" className="bg-white/20 text-white border-white/30">
                                    {auth.user.role === 'psikolog'
                                        ? 'Psikolog Terverifikasi'
                                        : auth.user.role === 'admin'
                                        ? 'Administrator'
                                        : 'Mahasiswa'}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Profile Information Section */}
                <Card header="Informasi Profil">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </Card>

                {/* Password Section */}
                <Card header="Ubah Kata Sandi">
                    <UpdatePasswordForm className="max-w-xl" />
                </Card>

                {/* Danger Zone Section */}
                <Card header="Hapus Akun">
                    <DeleteUserForm className="max-w-xl" />
                </Card>

                {/* Logout Button */}
                <div className="pt-2">
                    <Button variant="danger" fullWidth onClick={handleLogout} className="py-3 font-semibold">
                        Keluar dari Akun
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
