<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConsultationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'psychologist_id' => 'required|exists:users,id',
            'category' => 'required|string|max:100',
            'preferred_time' => 'required|date',
            'description' => 'required|string|min:5',
        ];
    }
}
