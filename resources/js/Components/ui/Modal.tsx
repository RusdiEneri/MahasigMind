import { ReactNode, useEffect } from 'react';

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
                onClick={onClose}
            />
            <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl transition-all">
                {title && (
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                        <h3 className="text-lg font-semibold text-brand-950">{title}</h3>
                        <button
                            onClick={onClose}
                            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
