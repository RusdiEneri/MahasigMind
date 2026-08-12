import BottomSheet from '@/Components/ui/BottomSheet';
import Button from '@/Components/ui/Button';
import { router } from '@inertiajs/react';
import { UserRole } from '@/types';

export interface NotificationItem {
    id: string;
    data: {
        title?: string;
        message?: string;
    };
    created_at: string;
    read_at?: string | null;
}

export interface NotificationSheetProps {
    open: boolean;
    onClose: () => void;
    notifications?: NotificationItem[];
    role?: UserRole;
}

export default function NotificationSheet({
    open,
    onClose,
    notifications = [],
    role = 'student',
}: NotificationSheetProps) {
    const handleMarkAllRead = () => {
        // Only mahasiswa role has the readAll route
        const isMahasiswa = role === 'student' || role === 'mahasiswa';
        if (isMahasiswa && route().has('mahasiswa.notifications.readAll')) {
            router.post(
                route('mahasiswa.notifications.readAll'),
                {},
                {
                    preserveScroll: true,
                    onSuccess: () => onClose(),
                }
            );
        } else {
            onClose();
        }
    };

    return (
        <BottomSheet open={open} onClose={onClose} title="Notifikasi">
            <div className="space-y-3 py-1">
                {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                        Belum ada notifikasi baru saat ini.
                    </div>
                ) : (
                    <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                        {notifications.map((item) => (
                            <div
                                key={item.id}
                                className={`rounded-xl p-3 border text-xs transition ${
                                    item.read_at
                                        ? 'bg-slate-50 border-slate-100 text-slate-600'
                                        : 'bg-brand-100/50 border-brand-300 text-brand-950 font-medium'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <h5 className="font-semibold">{item.data.title || 'Notifikasi'}</h5>
                                    <span className="text-[10px] text-slate-400">
                                        {new Date(item.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <p className="mt-1 text-slate-600 leading-snug">
                                    {item.data.message || 'Pesan notifikasi'}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {notifications.length > 0 && (
                    <div className="pt-2">
                        <Button variant="outline" fullWidth onClick={handleMarkAllRead}>
                            Tandai semua sudah dibaca
                        </Button>
                    </div>
                )}
            </div>
        </BottomSheet>
    );
}
