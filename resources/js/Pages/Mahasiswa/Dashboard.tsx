import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Card from '@/Components/ui/Card';
import MoodPicker from '@/Components/app/MoodPicker';
import ArticleSheet, { ArticleData } from '@/Components/app/ArticleSheet';
import { NotificationItem } from '@/Components/app/NotificationSheet';

export interface DashboardProps extends PageProps {
    hasTrackedToday?: boolean;
    articles?: ArticleData[];
    notifications?: NotificationItem[];
}

export default function Dashboard({
    auth,
    hasTrackedToday = false,
    articles = [],
    notifications = [],
}: DashboardProps) {
    const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);
    const [articleSheetOpen, setArticleSheetOpen] = useState(false);

    const handleOpenArticle = (art: ArticleData) => {
        setSelectedArticle(art);
        setArticleSheetOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            title="MahasigMind"
            notifications={notifications}
        >
            <Head title="Beranda Utama" />

            <div className="space-y-5">
                {/* Header Gradient Card */}
                <Card className="border-0 bg-gradient-to-br from-brand-700 to-brand-500 text-white shadow-md">
                    <div className="p-1 space-y-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-brand-100">
                            Selamat Datang
                        </span>
                        <h2 className="text-xl font-bold text-white">
                            Halo, {auth.user.name} 👋
                        </h2>
                        <p className="text-xs text-brand-100 leading-relaxed pt-1">
                            Kamu tidak sendirian. Mari pantau suasana hatimu dan temukan ruang aman untuk bercerita.
                        </p>
                    </div>
                </Card>

                {/* Mood Tracker Component */}
                <MoodPicker hasTrackedToday={hasTrackedToday} />

                {/* Quick Action Navigation Grid */}
                <div className="grid grid-cols-3 gap-3">
                    <Link
                        href={route('mahasiswa.chat.index')}
                        className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-3.5 text-center shadow-xs transition hover:border-brand-300 hover:shadow-md"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700 mb-2">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold text-brand-950">Chat Psikolog</span>
                    </Link>

                    <Link
                        href={route('mahasiswa.forum.index')}
                        className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-3.5 text-center shadow-xs transition hover:border-brand-300 hover:shadow-md"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700 mb-2">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold text-brand-950">Forum Diskusi</span>
                    </Link>

                    <Link
                        href={route('mahasiswa.journal.index')}
                        className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-3.5 text-center shadow-xs transition hover:border-brand-300 hover:shadow-md"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700 mb-2">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <span className="text-xs font-semibold text-brand-950">Jurnal Harian</span>
                    </Link>
                </div>

                {/* Educational Articles Section */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-brand-950">Artikel Edukasi</h3>
                        <Link href={route('mahasiswa.articles.index')} className="text-xs text-brand-700 font-medium">
                            Lihat Semua
                        </Link>
                    </div>

                    {articles.length === 0 ? (
                        <div className="p-5 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-100">
                            Belum ada artikel edukasi diterbitkan.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {articles.map((art) => (
                                <div
                                    key={art.id}
                                    onClick={() => handleOpenArticle(art)}
                                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition hover:shadow-md cursor-pointer"
                                >
                                    <div className="space-y-1">
                                        <span className="inline-block rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                                            {art.category}
                                        </span>
                                        <h4 className="text-sm font-semibold text-brand-950 leading-snug">
                                            {art.title}
                                        </h4>
                                    </div>
                                    <svg className="h-5 w-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay Sheets */}
            <ArticleSheet
                open={articleSheetOpen}
                onClose={() => setArticleSheetOpen(false)}
                article={selectedArticle}
            />
        </AuthenticatedLayout>
    );
}
