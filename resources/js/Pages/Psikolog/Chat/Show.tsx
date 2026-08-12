import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import ChatBubble from '@/Components/app/ChatBubble';
import ChatInput from '@/Components/app/ChatInput';
import EmptyState from '@/Components/ui/EmptyState';

export interface ChatMessageItem {
    id: number;
    sender_id: number;
    body: string;
    created_at: string;
    sender?: User;
}

export interface ConsultationDetail {
    id: number;
    category: string;
    user?: User;
    psychologist?: User;
}

export interface PsikologChatShowProps extends PageProps {
    consultation: ConsultationDetail;
    messages?: ChatMessageItem[];
}

export default function Show({
    auth,
    consultation,
    messages = [],
}: PsikologChatShowProps) {
    // 5-second polling for real-time message updates
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['messages'] });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleSendMessage = (body: string) => {
        router.post(
            route('psikolog.chat.message', consultation.id),
            { body },
            { preserveScroll: true }
        );
    };

    const studentName = consultation.user?.name || 'Mahasiswa';

    return (
        <AuthenticatedLayout user={auth.user} title={studentName} showBack>
            <Head title={`Sesi Chat - ${studentName}`} />

            <div className="flex flex-col h-[calc(100vh-140px)] justify-between">
                {/* Messages List Area */}
                <div className="flex-1 overflow-y-auto px-1 py-2 space-y-2">
                    {messages.length === 0 ? (
                        <EmptyState
                            title="Sesi Chat Dimulai"
                            description="Belum ada pesan dalam sesi ini. Berikan sapaan empati pertama untuk mahasiswa."
                        />
                    ) : (
                        messages.map((msg) => (
                            <ChatBubble
                                key={msg.id}
                                mine={msg.sender_id === auth.user.id}
                                body={msg.body}
                                timestamp={new Date(msg.created_at).toLocaleTimeString('id-ID', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                                senderName={msg.sender?.name}
                            />
                        ))
                    )}
                </div>

                {/* Input Bar */}
                <ChatInput onSend={handleSendMessage} />
            </div>
        </AuthenticatedLayout>
    );
}
