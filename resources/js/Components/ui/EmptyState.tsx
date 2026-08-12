import { ReactNode } from 'react';

export interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export default function EmptyState({
    icon,
    title,
    description,
    action,
    className = '',
}: EmptyStateProps) {
    return (
        <div
            className={`flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200 ${className}`}
        >
            <div className="mb-3 rounded-full bg-brand-100 p-4 text-brand-700">
                {icon ? (
                    icon
                ) : (
                    <svg
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                    </svg>
                )}
            </div>
            <h4 className="text-base font-semibold text-brand-950">{title}</h4>
            {description && (
                <p className="mt-1 text-xs text-slate-500 max-w-xs">{description}</p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
