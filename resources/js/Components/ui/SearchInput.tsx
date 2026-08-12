import { InputHTMLAttributes, forwardRef } from 'react';

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onClear?: () => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className = '', placeholder = 'Cari...', value, onClear, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-slate-400">
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <input
                    ref={ref}
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    className={`block w-full rounded-xl border border-slate-200 bg-white ps-10 pe-10 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-xs transition duration-150 ease-in-out focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 ${className}`}
                    {...props}
                />
                {value && onClear && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400 hover:text-slate-600"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        );
    },
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
