import { UserRole } from '@/types';

export interface RolePickerProps {
    value: UserRole;
    onChange: (role: UserRole) => void;
    className?: string;
}

interface RoleOption {
    id: UserRole;
    title: string;
    description: string;
    icon: JSX.Element;
}

const roleOptions: RoleOption[] = [
    {
        id: 'student',
        title: 'Mahasiswa',
        description: 'Jurnal, mood tracker & konsultasi',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
        ),
    },
    {
        id: 'psychologist',
        title: 'Psikolog',
        description: 'Kelola jadwal & sesi konseling',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
];

export default function RolePicker({
    value,
    onChange,
    className = '',
}: RolePickerProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Masuk Sebagai
            </label>
            <div className="grid grid-cols-2 gap-3">
                {roleOptions.map((opt) => {
                    const isSelected = value === opt.id || (value === 'mahasiswa' && opt.id === 'student') || (value === 'psikolog' && opt.id === 'psychologist');
                    return (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => onChange(opt.id)}
                            className={`flex flex-col items-start rounded-xl border p-3 text-left transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                                isSelected
                                    ? 'border-brand-500 bg-brand-100/50 text-brand-950 ring-1 ring-brand-500 shadow-xs'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                            <div
                                className={`mb-2 rounded-lg p-2 ${
                                    isSelected
                                        ? 'bg-brand-500 text-white'
                                        : 'bg-slate-100 text-slate-500'
                                }`}
                            >
                                {opt.icon}
                            </div>
                            <span className="text-sm font-semibold">{opt.title}</span>
                            <span className="mt-0.5 text-[11px] text-slate-500 leading-tight">
                                {opt.description}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
