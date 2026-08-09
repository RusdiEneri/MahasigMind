import { useEffect, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import JournalModal from '@/Components/JournalModal';

const categoryColors = {
    Akademik: 'bg-blue-100 text-blue-700',
    Sosial: 'bg-purple-100 text-purple-700',
    Keluarga: 'bg-orange-100 text-orange-700',
    Pribadi: 'bg-pink-100 text-pink-700',
    Lainnya: 'bg-gray-100 text-gray-700',
};

export default function Index({ auth, journals }) {
    const { flash } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [toast, setToast] = useState(null);

    // Toast flash message
    useEffect(() => {
        if (flash?.success) {
            setToast(flash.success);
            const t = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(t);
        }
    }, [flash?.success]);

    const openCreate = () => { setEditing(null); setShowModal(true); };
    const openEdit = (journal) => { setEditing(journal); setShowModal(true); };

    const handleDelete = (journal) => {
        if (window.confirm(`Yakin mau menghapus jurnal "${journal.title}"?`)) {
            router.delete(`/journals/${journal.id}`, { preserveScroll: true });
        }
    };

    const formatDate = (iso) =>
        new Date(iso).toLocaleDateString('id-ID', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Jurnal Harian</h2>}
        >
            <Head title="Jurnal Harian" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {toast && (
                        <div className="rounded-md bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm">
                            {toast}
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Total {journals.total} jurnal • Halaman {journals.current_page} dari {journals.last_page}
                        </p>
                        <PrimaryButton onClick={openCreate}>+ Tulis Jurnal</PrimaryButton>
                    </div>

                    {journals.data.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                            <p className="text-4xl mb-3">📔</p>
                            <p className="text-gray-600 font-medium">Belum ada jurnal.</p>
                            <p className="text-sm text-gray-400 mt-1">Mulai tulis cerita pertamamu hari ini!</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {journals.data.map((journal) => (
                                <div key={journal.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
                                    <div>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[journal.category] ?? categoryColors.Lainnya}`}>
                                            {journal.category}
                                        </span>
                                        <h3 className="mt-2 font-bold text-gray-800">{journal.title}</h3>
                                        <p className="text-xs text-gray-400 mt-1">{formatDate(journal.created_at)}</p>
                                    </div>

                                    <p className="text-sm text-gray-600 whitespace-pre-line line-clamp-4">
                                        {journal.content}
                                    </p>

                                    <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                                        <button
                                            onClick={() => openEdit(journal)}
                                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 px-2 py-1"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(journal)}
                                            className="text-xs font-semibold text-red-500 hover:text-red-700 px-2 py-1"
                                        >
                                            🗑️ Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {journals.last_page > 1 && (
                        <div className="flex flex-wrap gap-1 justify-center pt-4">
                            {journals.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    preserveScroll
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1.5 rounded-md text-sm ${
                                        link.active
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <JournalModal
                show={showModal}
                onClose={() => setShowModal(false)}
                journal={editing}
            />
        </AuthenticatedLayout>
    );
}