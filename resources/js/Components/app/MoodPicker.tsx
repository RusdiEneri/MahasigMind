import { useState } from 'react';
import { router } from '@inertiajs/react';

export interface MoodItem {
    emoji: string;
    label: string;
    score: number;
}

const moodItems: MoodItem[] = [
    { emoji: '😄', label: 'Senang', score: 5 },
    { emoji: '😊', label: 'Baik', score: 4 },
    { emoji: '😐', label: 'Biasa', score: 3 },
    { emoji: '😢', label: 'Sedih', score: 2 },
    { emoji: '😡', label: 'Marah', score: 1 },
];

export interface MoodPickerProps {
    hasTrackedToday?: boolean;
    className?: string;
}

export default function MoodPicker({
    hasTrackedToday = false,
    className = '',
}: MoodPickerProps) {
    const [hasTracked, setHasTracked] = useState(hasTrackedToday);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSelect = (item: MoodItem) => {
        if (hasTracked || loading) return;

        setSelectedEmoji(item.emoji);
        setLoading(true);

        router.post(
            '/moods',
            { mood_emoji: item.emoji, score: item.score },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setHasTracked(true);
                    setLoading(false);
                },
                onError: () => setLoading(false),
            }
        );
    };

    return (
        <div className={`rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-xs ${className}`}>
            <h3 className="text-sm font-semibold text-brand-950">
                {hasTracked ? 'Mood Kamu Hari Ini' : 'Gimana Perasaanmu Hari Ini?'}
            </h3>

            <div className="mt-4 flex justify-around items-center">
                {moodItems.map((item) => {
                    const isSelected = selectedEmoji === item.emoji;
                    return (
                        <button
                            key={item.emoji}
                            type="button"
                            onClick={() => handleSelect(item)}
                            disabled={hasTracked || loading}
                            className={`group flex flex-col items-center transition duration-150 transform hover:scale-110 focus:outline-none ${
                                hasTracked && !isSelected ? 'opacity-40 grayscale' : ''
                            } ${hasTracked || loading ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                            <span
                                className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition ${
                                    isSelected
                                        ? 'bg-brand-100 ring-2 ring-brand-500 scale-110 shadow-xs'
                                        : 'bg-slate-50 hover:bg-brand-100/50'
                                }`}
                            >
                                {item.emoji}
                            </span>
                            <span className="mt-1 text-[11px] font-medium text-slate-500 group-hover:text-brand-700">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {hasTracked && (
                <div className="mt-4 rounded-xl bg-emerald-50 p-2.5 text-xs font-medium text-emerald-700 border border-emerald-200 animate-fade-in">
                    ✅ Terima kasih sudah mencatat perasaanmu hari ini!
                </div>
            )}
        </div>
    );
}
