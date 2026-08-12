import { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    header?: ReactNode;
    footer?: ReactNode;
}

export default function Card({
    header,
    footer,
    className = '',
    children,
    ...props
}: CardProps) {
    return (
        <div
            className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md ${className}`}
            {...props}
        >
            {header && (
                <div className="bg-brand-100 px-4 py-3 border-b border-brand-300/40 font-medium text-brand-950">
                    {header}
                </div>
            )}
            <div className="p-4 sm:p-5">{children}</div>
            {footer && (
                <div className="bg-slate-50/50 px-4 py-3 border-t border-slate-100 text-xs text-slate-500">
                    {footer}
                </div>
            )}
        </div>
    );
}
