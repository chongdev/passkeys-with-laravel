<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Authenticator extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'credential_id',
        'public_key',
        'last_used_at',
    ];

    protected $casts = [
        'credential_id' => 'encrypted',
        'public_key'    => 'encrypted:json',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function credentialId(): Attribute
    {
        return new Attribute(
            function ($value) {
                return base64_decode($value);
            },
            function ($value) {
                return base64_encode($value);
            }
        );
    }
}