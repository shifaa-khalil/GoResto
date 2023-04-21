<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'logo',
        'location',
        'number_of_tables',
        'approved',
        'deposit',
        'rating',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function menu()
    {
        return $this->hasOne(Menu::class);
    }
}

