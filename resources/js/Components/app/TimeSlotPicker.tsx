export interface TimeSlotItem {
    time: string;
    is_available: boolean;
}

export interface TimeSlotPickerProps {
    slots: TimeSlotItem[];
    onToggleSlot: (time: string, isAvailable: boolean) => void;
    className?: string;
}

export default function TimeSlotPicker({
    slots,
    onToggleSlot,
    className = '',
}: TimeSlotPickerProps) {
    const defaultSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

    // Map slot items or default fallback
    const slotList = defaultSlots.map((time) => {
        const existing = slots.find((s) => s.time === time);
        return {
            time,
            is_available: existing ? existing.is_available : true,
        };
    });

    return (
        <div className={`space-y-3 ${className}`}>
            <h4 className="text-xs font-semibold text-brand-950 uppercase tracking-wider">
                Slot Jam Operasional
            </h4>
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                {slotList.map((slot) => (
                    <button
                        key={slot.time}
                        type="button"
                        onClick={() => onToggleSlot(slot.time, !slot.is_available)}
                        className={`flex flex-col items-center justify-center rounded-xl p-3 text-xs font-bold transition border ${
                            slot.is_available
                                ? 'bg-brand-100 text-brand-700 border-brand-300 hover:bg-brand-300/40 shadow-xs'
                                : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100 line-through'
                        }`}
                    >
                        <span>{slot.time}</span>
                        <span className="mt-1 text-[9px] font-medium no-underline">
                            {slot.is_available ? 'Tersedia' : 'Tutup'}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
