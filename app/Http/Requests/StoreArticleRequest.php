<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && ($this->user()->isPsikolog() || $this->user()->isAdmin());
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'content' => 'required|string|min:10',
            'status' => 'nullable|in:draft,pending,published,rejected',
            'scheduled_at' => 'nullable|date',
        ];
    }
}
