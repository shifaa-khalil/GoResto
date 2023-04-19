<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestoRequest extends Model
{
    use HasFactory;

    protected $table = 'requests';
    
    public function restaurant(){
        return $this->belongsTo(Restaurant::class);
    }
}
