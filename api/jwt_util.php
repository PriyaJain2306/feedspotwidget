<?php
function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64UrlDecode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

function generate_jwt($payload, $secret = 'your_secret_key') {
    $header = ['typ' => 'JWT', 'alg' => 'HS256'];
    $segments = [
        base64UrlEncode(json_encode($header)),
        base64UrlEncode(json_encode($payload))
    ];
    $signature = hash_hmac('sha256', implode('.', $segments), $secret, true);
    $segments[] = base64UrlEncode($signature);
    return implode('.', $segments);
}

function validate_jwt($jwt, $secret = 'your_secret_key') {
    $parts = explode('.', $jwt);
    if (count($parts) !== 3) return false;

    list($header64, $payload64, $signature64) = $parts;
    $validSig = base64UrlEncode(hash_hmac('sha256', "$header64.$payload64", $secret, true));

    if ($validSig !== $signature64) return false;

    $payload = json_decode(base64UrlDecode($payload64), true);
    return ($payload && $payload['exp'] > time()) ? $payload : false;
}
