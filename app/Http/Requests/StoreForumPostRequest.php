<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreForumPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'category_id' => 'required|exists:forum_categories,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:5',
            'image' => 'nullable|string',
        ];
    }
}
