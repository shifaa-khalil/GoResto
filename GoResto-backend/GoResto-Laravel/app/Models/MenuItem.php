<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable= [
        'description',
        'price',
        'category',
        'enabled',
        'cuisine',
        'image',
    ];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
