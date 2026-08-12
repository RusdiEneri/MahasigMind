import { ReactNode } from 'react';

export interface StatCardProps {
    label: string;
    value: string | number;
    icon?: ReactNode;
    trend?: string;
    className?: string;
}

export default function StatCard({
    label,
    value,
    icon,
    trend,
    className = '',
}: StatCardProps) {
    return (
        <div
            className={`rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md ${className}`}
        >
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    {label}
                </span>
                {icon && (
                    <div className="rounded-xl bg-brand-100 p-2 text-brand-700">
                        {icon}
                    </div>
                )}
            </div>
            <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-brand-950">{value}</span>
                {trend && (
                    <span className="text-xs font-medium text-emerald-600">
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}
