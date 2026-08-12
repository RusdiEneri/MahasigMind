import { ReactNode } from 'react';
import Logo from '@/Components/app/Logo';

export interface TopBarProps {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    actions?: ReactNode;
    onNotificationClick?: () => void;
    hasUnreadNotifications?: boolean;
}

export default function TopBar({
    title,
    showBack = false,
    onBack,
    actions,
    onNotificationClick,
    hasUnreadNotifications = false,
}: TopBarProps) {
    const handleBack = () => {
        if (onBack) {
            onBack();
        } else if (typeof window !== 'undefined') {
            window.history.back();
        }
    };

    return (
        <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-slate-100 bg-white/90 px-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
                {showBack ? (
                    <button
                        onClick={handleBack}
                        className="rounded-full p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-brand-500"
                        aria-label="Kembali"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                ) : null}

                {title ? (
                    <h1 className="text-base font-semibold text-brand-950 truncate max-w-[200px] sm:max-w-xs">
                        {title}
                    </h1>
                ) : (
                    <Logo size="sm" variant="withText" />
                )}
            </div>

            <div className="flex items-center gap-2">
                {actions ? (
                    actions
                ) : (
                    <button
                        onClick={onNotificationClick}
                        className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition focus:outline-none focus:ring-2 focus:ring-brand-500"
                        aria-label="Notifikasi"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {hasUnreadNotifications && (
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
                        )}
                    </button>
                )}
            </div>
        </header>
    );
}
