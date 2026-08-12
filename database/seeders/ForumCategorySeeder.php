<?php

namespace Database\Seeders;

use App\Models\ForumCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ForumCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Kuliah', 'description' => 'Diskusi seputar tugas, akademik, dan kehidupan kampus.'],
            ['name' => 'Keluarga', 'description' => 'Diskusi hubungan keluarga, komunikasi, dan dinamika rumah.'],
            ['name' => 'Relasi', 'description' => 'Diskusi seputar pertemanan, percintaan, dan interaksi sosial.'],
            ['name' => 'Keuangan', 'description' => 'Diskusi manajemen keuangan mahasiswa, kost, dan kebutuhan harian.'],
        ];

        foreach ($categories as $cat) {
            ForumCategory::updateOrCreate(
                ['slug' => Str::slug($cat['name'])],
                [
                    'name' => $cat['name'],
                    'description' => $cat['description'],
                ]
            );
        }
    }
}
