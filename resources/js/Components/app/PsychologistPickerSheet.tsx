import BottomSheet from '@/Components/ui/BottomSheet';
import PsychologistCard from '@/Components/app/PsychologistCard';
import Button from '@/Components/ui/Button';
import { User } from '@/types';

export interface PsychologistPickerSheetProps {
    open: boolean;
    onClose: () => void;
    psychologists: User[];
    onSelectPsychologist: (psychologist: User) => void;
}

export default function PsychologistPickerSheet({
    open,
    onClose,
    psychologists,
    onSelectPsychologist,
}: PsychologistPickerSheetProps) {
    return (
        <BottomSheet open={open} onClose={onClose} title="Pilih Psikolog Konsultasi">
            <div className="space-y-3 py-2">
                <p className="text-xs text-slate-500 mb-3">
                    Pilih salah satu psikolog profesional untuk mulai sesi konsultasi pribadi:
                </p>

                {psychologists.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                        Belum ada psikolog yang tersedia saat ini.
                    </div>
                ) : (
                    psychologists.map((psychologist) => (
                        <PsychologistCard
                            key={psychologist.id}
                            psychologist={psychologist}
                            onSelect={(psy) => {
                                onSelectPsychologist(psy);
                                onClose();
                            }}
                        />
                    ))
                )}

                <div className="pt-3">
                    <Button variant="outline" fullWidth onClick={onClose}>
                        Batal
                    </Button>
                </div>
            </div>
        </BottomSheet>
    );
}
