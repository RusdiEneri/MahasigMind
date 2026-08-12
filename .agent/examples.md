# Examples — pola kode yang WAJIB ditiru

## 1) Component ui (Button)
```tsx
// resources/js/Components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    fullWidth?: boolean;
}

const styles: Record<Variant, string> = {
    primary: 'bg-brand-500 text-white hover:bg-brand-700 disabled:bg-slate-300 disabled:text-slate-500',
    outline: 'border border-slate-300 bg-white text-slate-600 hover:bg-slate-50',
    ghost: 'text-brand-700 hover:bg-brand-100',
    danger: 'bg-red-500 text-white hover:bg-red-600',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', fullWidth = false, className = '', ...props }, ref) => (
        <button
            ref={ref}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-brand-500 ${fullWidth ? 'w-full' : ''} ${styles[variant]} ${className}`}
            {...props}
        />
    ),
);
Button.displayName = 'Button';
export default Button;