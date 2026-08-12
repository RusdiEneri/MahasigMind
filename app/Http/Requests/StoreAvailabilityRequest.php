<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAvailabilityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isPsikolog();
    }

    public function rules(): array
    {
        return [
            'date' => 'required|date',
            'time' => 'required|string',
            'is_available' => 'required|boolean',
        ];
    }
}
