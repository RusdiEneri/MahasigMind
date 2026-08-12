import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Button from '@/Components/ui/Button';
import Input from '@/Components/ui/Input';
import Textarea from '@/Components/ui/Textarea';
import Select from '@/Components/ui/Select';
import Card from '@/Components/ui/Card';

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'Refleksi Harian',
        content: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('journals.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Tulis Jurnal Baru" showBack>
            <Head title="Tulis Jurnal Baru" />

            <div className="space-y-4">
                <Card>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Judul Catatan"
                            placeholder="Contoh: Hal yang membuetku tersenyum hari ini..."
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            required
                        />

                        <Select
                            label="Kategori Refleksi"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            error={errors.category}
                            required
                        >
                            <option value="Refleksi Harian">Refleksi Harian</option>
                            <option value="Rasa Syukur">Rasa Syukur</option>
                            <option value="Tantangan Akademik">Tantangan Akademik</option>
                            <option value="Ekspresi Emosi">Ekspresi Emosi</option>
                        </Select>

                        <Textarea
                            label="Isi Jurnal"
                            placeholder="Ceritakan dengan bebas apa yang kamu rasakan, alami, atau pikirkan hari ini..."
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            error={errors.content}
                            rows={7}
                            required
                        />

                        <div className="pt-2 flex items-center justify-end gap-3">
                            <Link href={route('mahasiswa.journal.index')}>
                                <Button type="button" variant="outline">
                                    Batal
                                </Button>
                            </Link>

                            <Button type="submit" variant="primary" loading={processing}>
                                Simpan Jurnal
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
