import { ReactNode, useEffect } from 'react';

export interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export default function BottomSheet({
    open,
    onClose,
    title,
    children,
}: BottomSheetProps) {
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
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:items-center sm:justify-center">
            {/* Scrim backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in"
                onClick={onClose}
            />

            {/* Sheet Card */}
            <div className="relative z-10 w-full max-w-md rounded-t-2xl sm:rounded-2xl bg-white p-5 shadow-xl transition-transform animate-slide-up max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    {title ? (
                        <h3 className="text-base font-semibold text-brand-950">{title}</h3>
                    ) : (
                        <div className="h-1 w-12 rounded-full bg-slate-300 mx-auto" />
                    )}
                    <button
                        onClick={onClose}
                        className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition focus:outline-none focus:ring-2 focus:ring-brand-500"
                        aria-label="Tutup"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
