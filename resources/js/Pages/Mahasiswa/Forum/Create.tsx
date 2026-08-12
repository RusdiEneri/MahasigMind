import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Button from '@/Components/ui/Button';
import Input from '@/Components/ui/Input';
import Textarea from '@/Components/ui/Textarea';
import Select from '@/Components/ui/Select';
import Card from '@/Components/ui/Card';

export interface ForumCategoryData {
    id: number;
    name: string;
}

export interface ForumCreateProps extends PageProps {
    categories?: ForumCategoryData[];
}

export default function Create({ auth, categories = [] }: ForumCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: categories.length > 0 ? String(categories[0].id) : '',
        title: '',
        content: '',
        image: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('mahasiswa.forum.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Buat Postingan Forum" showBack>
            <Head title="Buat Postingan Forum" />

            <div className="space-y-4">
                <Card>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Select
                            label="Kategori Topik"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            error={errors.category_id}
                            required
                        >
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </Select>

                        <Input
                            label="Judul Postingan"
                            placeholder="Contoh: Merasa kewalahan dengan jadwal ujian..."
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            required
                        />

                        <Textarea
                            label="Isi Cerita / Pertanyaan"
                            placeholder="Tuliskan pengalaman atau hal yang ingin kamu diskusikan secara terbuka..."
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            error={errors.content}
                            rows={6}
                            required
                        />

                        <Input
                            label="URL Gambar (Opsional)"
                            placeholder="https://..."
                            value={data.image}
                            onChange={(e) => setData('image', e.target.value)}
                            error={errors.image}
                        />

                        <div className="pt-2 flex items-center justify-end gap-3">
                            <Link href={route('mahasiswa.forum.index')}>
                                <Button type="button" variant="outline">
                                    Batal
                                </Button>
                            </Link>

                            <Button type="submit" variant="primary" loading={processing}>
                                Terbitkan Postingan
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
