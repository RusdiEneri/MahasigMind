import { HTMLAttributes } from 'react';

export type BadgeTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    tone?: BadgeTone;
}

const toneStyles: Record<BadgeTone, string> = {
    info: 'bg-brand-100 text-brand-700 border-brand-300',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
};

export default function Badge({
    tone = 'info',
    className = '',
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${toneStyles[tone]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}
