<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
