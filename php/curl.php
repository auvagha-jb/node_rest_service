<?php 

$BASE_URL = 'http://127.0.0.1:5000';

function sendPostRequest($url, $data) {
    // Create a new cURL resource
    $ch = curl_init($url);

    // Setup request to send json via POST
    // $data = array(
    //     'username' => 'codexworld',
    //     'password' => '123456'
    // );
    $payload = json_encode($data);

    // Attach encoded JSON string to the POST fields
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

    // Set the content type to application/json
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));

    // Return response instead of outputting
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the POST request
    $result = curl_exec($ch);

    // Close cURL resource
    curl_close($ch);

    return $result;
}

function sendGetRequest($url) {
    $curl = curl_init();

    // OPTIONS:
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        // 'APIKEY: 111111111111111111111',
        'Content-Type: application/json',
    ));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    // EXECUTE:
    $result = curl_exec($curl);
    // if(!$result){die("Connection Failure");}
    curl_close($curl);
    return $result;
}