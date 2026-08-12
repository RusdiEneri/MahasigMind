import { FormEvent, useState } from 'react';

export interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
    const [body, setBody] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!body.trim() || disabled) return;

        onSend(body);
        setBody('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="sticky bottom-14 z-30 flex items-center gap-2 border-t border-slate-100 bg-white/95 p-3 backdrop-blur-md"
        >
            <input
                type="text"
                placeholder="Tulis pesan..."
                value={body}
                disabled={disabled}
                onChange={(e) => setBody(e.target.value)}
                className="block flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
            <button
                type="submit"
                disabled={!body.trim() || disabled}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white transition hover:bg-brand-700 disabled:bg-slate-200 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-label="Kirim Pesan"
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9-7-9-7-9 7 9 7zm0 0v-7" />
                </svg>
            </button>
        </form>
    );
}
