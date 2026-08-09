import { useState } from 'react';
import { router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

const emojis = [
    { emoji: '😄', label: 'Senang', color: 'bg-yellow-400' },
    { emoji: '😊', label: 'Baik', color: 'bg-green-400' },
    { emoji: '😐', label: 'Biasa', color: 'bg-blue-400' },
    { emoji: '😢', label: 'Sedih', color: 'bg-indigo-400' },
    { emoji: '😡', label: 'Marah', color: 'bg-red-400' },
];

interface Props {
    hasTrackedToday: boolean;
}

export default function MoodTracker({ hasTrackedToday }: Props) {
    const [hasTracked, setHasTracked] = useState(hasTrackedToday);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleSelect = (emoji: string) => {
        if (hasTracked || processing) return;

        setSelectedEmoji(emoji);
        setProcessing(true);

        router.post(
            '/moods',
            { mood_emoji: emoji },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setHasTracked(true);
                    setProcessing(false);
                },
                onError: () => setProcessing(false),
            }
        );
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
                {hasTracked ? 'Mood Kamu Hari Ini' : 'Gimana Perasaanmu Hari Ini?'}
            </h3>

            <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
                {emojis.map((item) => (
                    <div key={item.emoji} className="relative flex flex-col items-center">
                        <AnimatePresence>
                            {selectedEmoji === item.emoji &&
                                [...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={`absolute w-3 h-3 rounded-full ${item.color}`}
                                        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                                        animate={{
                                            scale: [0, 1, 0.5],
                                            x: Math.cos(i * (Math.PI / 4)) * 60,
                                            y: Math.sin(i * (Math.PI / 4)) * 60,
                                            opacity: [1, 1, 0],
                                        }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                    />
                                ))}
                        </AnimatePresence>

                        <motion.button
                            type="button"
                            whileHover={{ scale: hasTracked ? 1 : 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                                scale: selectedEmoji === item.emoji ? [1, 1.4, 1.2] : 1,
                                rotate: selectedEmoji === item.emoji ? [0, -10, 10, 0] : 0,
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            onClick={() => handleSelect(item.emoji)}
                            disabled={hasTracked || processing}
                            className={`text-4xl md:text-5xl p-2 rounded-full ${
                                hasTracked && selectedEmoji !== item.emoji
                                    ? 'grayscale opacity-50'
                                    : ''
                            } ${processing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            title={item.label}
                        >
                            {item.emoji}
                        </motion.button>
                        <span className="text-xs text-gray-500 mt-1">{item.label}</span>
                    </div>
                ))}
            </div>

            {hasTracked && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-sm text-green-600 font-medium"
                >
                    ✅ Terima kasih sudah bercerita! Sampai jumpa besok.
                </motion.p>
            )}
        </div>
    );
}