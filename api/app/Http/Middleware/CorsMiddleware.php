<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    public function handle($request, Closure $next)
    {
        $origin = $request->headers->get('Origin');

        if ($request->getMethod() === "OPTIONS") {
            return response('', 200)
                ->withHeaders([
                    'Access-Control-Allow-Origin' => $origin ?? 'http://localhost:4200',
                    'Access-Control-Allow-Credentials' => 'true',
                    'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers' => 'Origin, Content-Type, X-Auth-Token, Authorization, Accept',
                ]);
        }

        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', $origin ?? 'http://localhost:4200');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Authorization, Accept');

        return $response;
    }
}
