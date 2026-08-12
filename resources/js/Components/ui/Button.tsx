import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-brand-500 text-white hover:bg-brand-700 active:bg-brand-950 disabled:bg-slate-300 disabled:text-slate-500 shadow-sm',
    outline:
        'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 disabled:bg-slate-100 disabled:text-slate-400',
    ghost:
        'text-brand-700 hover:bg-brand-100 active:bg-brand-300 disabled:text-slate-400 disabled:hover:bg-transparent',
    danger:
        'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 disabled:bg-slate-300 disabled:text-slate-500 shadow-sm',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            fullWidth = false,
            loading = false,
            disabled,
            className = '',
            children,
            ...props
        },
        ref,
    ) => {
        const isDisabled = disabled || loading;

        return (
            <button
                ref={ref}
                disabled={isDisabled}
                className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                    fullWidth ? 'w-full' : ''
                } ${variantStyles[variant]} ${
                    isDisabled ? 'cursor-not-allowed opacity-75' : ''
                } ${className}`}
                {...props}
            >
                {loading && (
                    <svg
                        className="-ms-1 me-2 h-4 w-4 animate-spin text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;
