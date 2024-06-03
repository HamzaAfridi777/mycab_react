<?php

namespace App\Helpers;

class EmailHelper 
{
    public static function sendEmail($name, $email, $template, $subject)
    {
        $api_key = env('RESET_EMAIL_KEY');

        // Endpoint URL
        $endpoint = 'https://api.brevo.com/v3/smtp/email';
        
        // Data to send in the request
        $data = array(
            "sender" => array(
                "name" => "My Cab",
                "email" => "penoo8188@gmail.com"
            ),
            "to" => array(
                array(
                    "email" => $email,
                    "name" => isset($name) ? $name : ''
                )
            ),
            "subject" => $subject,
            "htmlContent" => $template
        );
        
        // Convert data to JSON format
        $data_json = json_encode($data);
        
        // Initialize cURL session
        $ch = curl_init($endpoint);
        
        // Set cURL options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'accept: application/json',
            'api-key: ' . $api_key,
            'content-type: application/json',
        ));
        
        // Execute cURL request and get the response
        $response = curl_exec($ch);
        
        // Check for cURL errors
        if (curl_errno($ch)) {
            // Handle cURL error here
            echo 'cURL error: ' . curl_error($ch);
        }
        
        // Close cURL session
        curl_close($ch);
        
        // Decode the JSON response
        $result = json_decode($response, true);
        return $result;
    }
}
