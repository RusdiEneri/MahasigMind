import { SelectHTMLAttributes, forwardRef, useId } from 'react';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    hint?: string;
    options?: SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, hint, options = [], className = '', id, disabled, children, ...props }, ref) => {
        const generatedId = useId();
        const selectId = id || generatedId;

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    id={selectId}
                    disabled={disabled}
                    className={`block w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 bg-white transition duration-150 ease-in-out focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                        error
                            ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500'
                            : 'border-slate-300'
                    } ${disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''} ${className}`}
                    {...props}
                >
                    {children ? (
                        children
                    ) : (
                        options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))
                    )}
                </select>
                {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
                {!error && hint && <p className="text-xs text-slate-500">{hint}</p>}
            </div>
        );
    },
);

Select.displayName = 'Select';

export default Select;
