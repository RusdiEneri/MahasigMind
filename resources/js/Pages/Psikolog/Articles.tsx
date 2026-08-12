import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import EmptyState from '@/Components/ui/EmptyState';
import Modal from '@/Components/ui/Modal';
import Input from '@/Components/ui/Input';
import Textarea from '@/Components/ui/Textarea';
import Select from '@/Components/ui/Select';

export interface ArticleItem {
    id: number;
    title: string;
    category: string;
    content: string;
    status: 'draft' | 'pending' | 'published' | 'rejected';
    created_at: string;
}

export interface PsikologArticlesProps extends PageProps {
    articles?: ArticleItem[];
}

export default function Articles({ auth, articles = [] }: PsikologArticlesProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        category: 'Kesehatan Mental',
        content: '',
        status: 'published' as 'draft' | 'pending' | 'published' | 'rejected',
    });

    const handleOpenCreateModal = () => {
        setEditingArticle(null);
        reset();
        setModalOpen(true);
    };

    const handleOpenEditModal = (article: ArticleItem) => {
        setEditingArticle(article);
        setData({
            title: article.title,
            category: article.category,
            content: article.content,
            status: article.status,
        });
        setModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingArticle) {
            put(route('psikolog.articles.update', editingArticle.id), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('psikolog.articles.store'), {
                onSuccess: () => {
                    setModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDeleteArticle = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            router.delete(route('psikolog.articles.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Artikel Edukasi Saya">
            <Head title="Kelola Artikel Edukasi" />

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-brand-950">Artikel Edukasi</h2>
                        <p className="text-xs text-slate-500">Publikasikan tulisan edukatif untuk mahasiswa</p>
                    </div>

                    <Button variant="primary" onClick={handleOpenCreateModal} className="text-xs">
                        + Tulis Artikel
                    </Button>
                </div>

                {articles.length === 0 ? (
                    <EmptyState
                        title="Belum Ada Artikel"
                        description="Anda belum memiliki artikel edukasi yang dipublikasikan."
                        action={
                            <Button variant="primary" onClick={handleOpenCreateModal}>
                                Tulis Artikel Pertama
                            </Button>
                        }
                    />
                ) : (
                    <div className="space-y-3">
                        {articles.map((item) => (
                            <Card key={item.id}>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Badge tone="info">{item.category}</Badge>
                                        <Badge
                                            tone={
                                                item.status === 'published'
                                                    ? 'success'
                                                    : item.status === 'rejected'
                                                    ? 'danger'
                                                    : 'warning'
                                            }
                                        >
                                            {item.status === 'published'
                                                ? 'Terbit'
                                                : item.status === 'rejected'
                                                ? 'Ditolak'
                                                : item.status === 'draft'
                                                ? 'Draf'
                                                : 'Menunggu Review'}
                                        </Badge>
                                    </div>

                                    <h4 className="text-sm font-bold text-brand-950">{item.title}</h4>
                                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                        {item.content}
                                    </p>

                                    <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                                        <button
                                            onClick={() => handleOpenEditModal(item)}
                                            className="text-xs font-semibold text-brand-700 hover:text-brand-950"
                                        >
                                            Edit Artikel
                                        </button>
                                        <button
                                            onClick={() => handleDeleteArticle(item.id)}
                                            className="text-xs font-semibold text-red-600 hover:text-red-800"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Form Artikel */}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingArticle ? 'Edit Artikel Edukasi' : 'Tulis Artikel Edukasi Baru'}
            >
                <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                    <Input
                        label="Judul Artikel"
                        placeholder="Contoh: Seni Mengelola Stres Menjelang Ujian..."
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        error={errors.title}
                        required
                    />

                    <Select
                        label="Kategori Artikel"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        error={errors.category}
                        required
                    >
                        <option value="Kesehatan Mental">Kesehatan Mental</option>
                        <option value="Akademik">Akademik</option>
                        <option value="Relasi">Relasi</option>
                        <option value="Self Improvement">Self Improvement</option>
                        <option value="Pola Hidup">Pola Hidup</option>
                    </Select>

                    <Textarea
                        label="Isi Konten Artikel"
                        placeholder="Tuliskan materi edukatif yang bermanfaat..."
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        error={errors.content}
                        rows={7}
                        required
                    />

                    <Select
                        label="Status Publikasi"
                        value={data.status}
                        onChange={(e) =>
                            setData('status', e.target.value as 'draft' | 'pending' | 'published' | 'rejected')
                        }
                        error={errors.status}
                    >
                        <option value="published">Terbitkan Langsung</option>
                        <option value="pending">Kirim untuk Review</option>
                        <option value="draft">Simpan Draf</option>
                    </Select>

                    <div className="pt-2 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                            Batal
                        </Button>
                        <Button type="submit" variant="primary" loading={processing}>
                            {editingArticle ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
