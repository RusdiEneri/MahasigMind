import { TextareaHTMLAttributes, forwardRef, useId } from 'react';

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, hint, className = '', id, disabled, rows = 4, ...props }, ref) => {
        const generatedId = useId();
        const textareaId = id || generatedId;

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={textareaId}
                    disabled={disabled}
                    rows={rows}
                    className={`block w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 bg-white transition duration-150 ease-in-out focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                        error
                            ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500'
                            : 'border-slate-300'
                    } ${disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''} ${className}`}
                    {...props}
                />
                {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
                {!error && hint && <p className="text-xs text-slate-500">{hint}</p>}
            </div>
        );
    },
);

Textarea.displayName = 'Textarea';

export default Textarea;
