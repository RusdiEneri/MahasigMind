<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $psychologist = User::where('role', 'psikolog')->orWhere('role', 'psychologist')->first()
            ?? User::first();

        $articles = [
            [
                'title' => 'Menghadapi Burnout Saat Menyusun Skripsi',
                'category' => 'Akademik',
                'content' => 'Skripsi seringkali menjadi momen paling menantang dalam perjalanan mahasiswa. Ketahui tanda-tanda burnout emosional dan langkah pemulihannya...',
                'status' => 'published',
            ],
            [
                'title' => 'Seni Berkomunikasi Tanpa Rasa Cemas',
                'category' => 'Relasi',
                'content' => 'Kecemasan sosial sering menghambat komunikasi efektif. Belajar teknik grounding dan bernapas tenang sebelum berbicara di depan umum...',
                'status' => 'published',
            ],
            [
                'title' => 'Manajemen Waktu & Kesehatan Mental Mahasiswa',
                'category' => 'Self Improvement',
                'content' => 'Mengatur skala prioritas harian membantu mengurangi tumpukan kecemasan akibat tugas kuliah yang menumpuk...',
                'status' => 'published',
            ],
            [
                'title' => 'Mengenali Burnout Dini pada Perkuliahan Daring',
                'category' => 'Kesehatan Mental',
                'content' => 'Pembelajaran jarak jauh membawa tantangan tersendiri bagi fokus dan emosi mahasiswa...',
                'status' => 'pending',
            ],
            [
                'title' => 'Pentingnya Tidur Cukup Bagi Memori & Mood',
                'category' => 'Pola Hidup',
                'content' => 'Tidur kurang dari 6 jam sehari berisiko menurunkan regulasi emosi dan kemampuan konsentrasi...',
                'status' => 'pending',
            ],
        ];

        foreach ($articles as $art) {
            Article::updateOrCreate(
                ['slug' => Str::slug($art['title'])],
                [
                    'title' => $art['title'],
                    'author_id' => $psychologist->id,
                    'category' => $art['category'],
                    'content' => $art['content'],
                    'status' => $art['status'],
                    'scheduled_at' => now(),
                ]
            );
        }
    }
}
