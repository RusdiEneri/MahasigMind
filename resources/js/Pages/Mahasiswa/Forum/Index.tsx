import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import Button from '@/Components/ui/Button';
import EmptyState from '@/Components/ui/EmptyState';
import ForumPostCard, { ForumPostData } from '@/Components/app/ForumPostCard';
import Modal from '@/Components/ui/Modal';
import Textarea from '@/Components/ui/Textarea';

export interface ForumCategoryData {
    id: number;
    name: string;
    slug: string;
}

export interface ForumIndexProps extends PageProps {
    posts?: ForumPostData[];
    categories?: ForumCategoryData[];
    selectedCategoryId?: number | string | null;
}

export default function Index({
    auth,
    posts = [],
    categories = [],
    selectedCategoryId = null,
}: ForumIndexProps) {
    const [selectedPost, setSelectedPost] = useState<ForumPostData | null>(null);
    const [replyModalOpen, setReplyModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
    });

    const handleFilterCategory = (catId: number | null) => {
        router.get(
            route('mahasiswa.forum.index'),
            catId ? { category_id: catId } : {},
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleOpenReplyModal = (forumPost: ForumPostData) => {
        setSelectedPost(forumPost);
        setReplyModalOpen(true);
    };

    const handleReplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPost) return;

        post(route('mahasiswa.forum.reply', selectedPost.id), {
            onSuccess: () => {
                setReplyModalOpen(false);
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} title="Forum Diskusi">
            <Head title="Forum Diskusi Mahasiswa" />

            <div className="space-y-4">
                {/* Header & Create Post Button */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-brand-950">Ruang Diskusi</h2>
                        <p className="text-xs text-slate-500">Berbagi cerita dan dukungan antar mahasiswa</p>
                    </div>

                    <Link href={route('mahasiswa.forum.create')}>
                        <Button variant="primary" className="text-xs">
                            + Postingan Baru
                        </Button>
                    </Link>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    <button
                        onClick={() => handleFilterCategory(null)}
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition ${
                            selectedCategoryId === null
                                ? 'bg-brand-500 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        Semua Topik
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleFilterCategory(cat.id)}
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition ${
                                Number(selectedCategoryId) === cat.id
                                    ? 'bg-brand-500 text-white shadow-xs'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Posts List */}
                {posts.length === 0 ? (
                    <EmptyState
                        title="Belum Ada Diskusi"
                        description="Belum ada postingan diskusi pada topik ini. Jadilah yang pertama memulai cerita."
                        action={
                            <Link href={route('mahasiswa.forum.create')}>
                                <Button variant="primary">Buat Postingan Pertama</Button>
                            </Link>
                        }
                    />
                ) : (
                    <div className="space-y-3">
                        {posts.map((postItem) => (
                            <ForumPostCard
                                key={postItem.id}
                                post={postItem}
                                onReplyClick={handleOpenReplyModal}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Balas Postingan */}
            <Modal
                open={replyModalOpen}
                onClose={() => setReplyModalOpen(false)}
                title={`Balas: ${selectedPost?.title ?? ''}`}
            >
                <form onSubmit={handleReplySubmit} className="space-y-3 pt-2">
                    <Textarea
                        label="Tanggapan / Balasan Kamu"
                        placeholder="Tuliskan kata-kata empati atau saran pendukung..."
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        error={errors.content}
                        required
                    />

                    <div className="pt-2 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setReplyModalOpen(false)}>
                            Batal
                        </Button>
                        <Button type="submit" variant="primary" loading={processing}>
                            Kirim Balasan
                        </Button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
