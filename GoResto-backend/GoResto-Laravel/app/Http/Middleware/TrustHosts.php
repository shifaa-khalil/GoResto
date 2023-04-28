<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustHosts as Middleware;

class TrustHosts extends Middleware
{
    /**
     * Get the host patterns that should be trusted.
     *
     * @return array<int, string|null>
     */

    // protected $headers = [
    //     Request::HEADER_FORWARDED_HOST,
    //     Request::HEADER_X_FORWARDED_HOST,
    // ];

    public function hosts(): array
    {
        return [
            'laravel.test',
            $this->allSubdomainsOfApplicationUrl(),
        ];
    }
}
