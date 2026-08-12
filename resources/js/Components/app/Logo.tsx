export interface LogoProps {
    variant?: 'light' | 'dark' | 'withText';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
};

const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
};

export default function Logo({
    variant = 'withText',
    size = 'md',
    className = '',
}: LogoProps) {
    const isDark = variant === 'dark';

    return (
        <div className={`inline-flex items-center gap-2.5 ${className}`}>
            <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
                <svg
                    className="w-full h-full text-brand-500"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Background glow or circle */}
                    <circle cx="32" cy="32" r="30" fill="currentColor" fillOpacity="0.15" />
                    
                    {/* Brain shape */}
                    <path
                        d="M24 24C21.7909 24 20 25.7909 20 28C20 28.7406 20.2014 29.4343 20.5528 30.0278C18.4727 30.6865 17 32.6179 17 34.9C17 37.6614 19.2386 39.9 22 39.9H23.5M40 24C42.2091 24 44 25.7909 44 28C44 28.7406 43.7986 29.4343 43.4472 30.0278C45.5273 30.6865 47 32.6179 47 34.9C47 37.6614 44.7614 39.9 42 39.9H40.5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <path
                        d="M32 20C27.5 20 24 23.5 24 28V44C24 46.2 25.8 48 28 48H32M32 20C36.5 20 40 23.5 40 28V44C40 46.2 38.2 48 36 48H32"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <path
                        d="M32 20V48"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeDasharray="2 2"
                    />

                    {/* Graduation Cap overlay on top */}
                    <path
                        d="M32 12L16 19L32 26L48 19L32 12Z"
                        fill="currentColor"
                    />
                    <path
                        d="M22 22V27.5C22 30 26.5 31.5 32 31.5C37.5 31.5 42 30 42 27.5V22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M44 20.5V28L46 29.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {variant === 'withText' && (
                <span className={`font-bold tracking-tight ${textSizeClasses[size]} ${isDark ? 'text-white' : 'text-brand-950'}`}>
                    Mahasig<span className="text-brand-500">Mind</span>
                </span>
            )}
        </div>
    );
}
