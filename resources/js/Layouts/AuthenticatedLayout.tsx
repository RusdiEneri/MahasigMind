import { PropsWithChildren, ReactNode, useState } from 'react';
import TopBar from '@/Components/app/TopBar';
import BottomNavigation from '@/Components/app/BottomNavigation';
import NotificationSheet, { NotificationItem } from '@/Components/app/NotificationSheet';
import { User, UserRole } from '@/types';

export interface AuthenticatedProps extends PropsWithChildren {
    user: User;
    header?: ReactNode;
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    topBarActions?: ReactNode;
    notifications?: NotificationItem[];
}

export default function Authenticated({
    user,
    title,
    showBack = false,
    onBack,
    topBarActions,
    notifications = [],
    children,
}: AuthenticatedProps) {
    const role: UserRole = user.role || 'student';
    const [notifSheetOpen, setNotifSheetOpen] = useState(false);

    const hasUnread = notifications.some((n) => !n.read_at);

    return (
        <div className="min-h-screen w-full bg-slate-100/70 font-sans antialiased text-slate-800">
            {/* Mobile-first centered frame wrapper */}
            <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white shadow-xl relative pb-20">
                {/* Header TopBar */}
                <TopBar
                    title={title}
                    showBack={showBack}
                    onBack={onBack}
                    actions={topBarActions}
                    onNotificationClick={() => setNotifSheetOpen(true)}
                    hasUnreadNotifications={hasUnread}
                />

                {/* Main Content Area */}
                <main className="flex-1 px-4 py-5 sm:px-6">
                    {children}
                </main>

                {/* Fixed Bottom Navigation */}
                <BottomNavigation role={role} />

                {/* Mount container for Sheets / Modals */}
                <div id="sheet-mount" />
            </div>

            {/* Notification Sheet (rendered outside inner container for proper overlay) */}
            <NotificationSheet
                open={notifSheetOpen}
                onClose={() => setNotifSheetOpen(false)}
                notifications={notifications}
                role={role}
            />
        </div>
    );
}
