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
    psychologist?: User;
    user?: User;
}

export interface ChatShowProps extends PageProps {
    consultation: ConsultationDetail;
    messages?: ChatMessageItem[];
}

export default function Show({
    auth,
    consultation,
    messages = [],
}: ChatShowProps) {
    // 5-second polling for real-time message updates
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['messages'] });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleSendMessage = (body: string) => {
        router.post(
            route('mahasiswa.chat.message', consultation.id),
            { body },
            {
                preserveScroll: true,
            }
        );
    };

    const psyName = consultation.psychologist?.name || 'Psikolog MahasigMind';

    return (
        <AuthenticatedLayout user={auth.user} title={psyName} showBack>
            <Head title={`Sesi Chat - ${psyName}`} />

            <div className="flex flex-col h-[calc(100vh-140px)] justify-between">
                {/* Messages List Area */}
                <div className="flex-1 overflow-y-auto px-1 py-2 space-y-2">
                    {messages.length === 0 ? (
                        <EmptyState
                            title="Sesi Chat Dimulai"
                            description="Belum ada pesan. Mulai sapa psikolog kamu untuk membuka percakapan aman."
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
