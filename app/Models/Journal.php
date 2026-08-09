<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'category',
        'content',
        'is_shared_with_psychologist',
    ];

    protected $casts = [
        'is_shared_with_psychologist' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}