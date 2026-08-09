import { useEffect, FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Journal } from '@/types';

const categories = ['Akademik', 'Sosial', 'Keluarga', 'Pribadi', 'Lainnya'];

interface Props {
    show: boolean;
    onClose: () => void;
    journal?: Journal | null;
}

export default function JournalModal({ show, onClose, journal = null }: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        category: 'Akademik',
        content: '',
    });

    // Isi ulang form setiap modal dibuka (untuk create / edit)
    useEffect(() => {
        if (show) {
            setData({
                title: journal?.title ?? '',
                category: journal?.category ?? 'Akademik',
                content: journal?.content ?? '',
            });
        }
    }, [show, journal]);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (journal) {
            put(`/journals/${journal.id}`, {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        } else {
            post('/journals', {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                    reset();
                },
            });
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={submit} className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    {journal ? '✏️ Edit Jurnal' : '📔 Tulis Jurnal Baru'}
                </h2>

                <div>
                    <InputLabel htmlFor="title" value="Judul" />
                    <TextInput
                        id="title"
                        className="mt-1 w-full"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Contoh: Presentasi sidang hari ini..."
                        required
                    />
                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="category" value="Kategori" />
                    <select
                        id="category"
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                    >
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <InputError message={errors.category} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="content" value="Cerita / Isi Jurnal" />
                    <textarea
                        id="content"
                        rows={6}
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        placeholder="Tuliskan apa yang kamu rasakan hari ini..."
                        required
                    />
                    <InputError message={errors.content} className="mt-2" />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <SecondaryButton type="button" onClick={onClose} disabled={processing}>
                        Batal
                    </SecondaryButton>
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Menyimpan...' : journal ? 'Perbarui' : 'Simpan'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}