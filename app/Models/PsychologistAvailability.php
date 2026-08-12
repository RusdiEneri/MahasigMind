<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PsychologistAvailability extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'time',
        'is_available',
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
        'is_available' => 'boolean',
    ];

    public function psychologist()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
