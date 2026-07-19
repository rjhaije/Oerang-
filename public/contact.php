<?php
/**
 * Oerang.nl - Lead Mailer Handler for Hostinger
 * --------------------------------------------
 * This file is automatically placed in public_html and serves as the backend endpoint
 * for contact form and quotation calculator submissions.
 */

// Allow Cross-Origin Requests (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method " . $_SERVER['REQUEST_METHOD'] . " not allowed."
    ]);
    exit();
}

// Parse the payload (handles both JSON and standard POST data)
$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true);

if (!$data) {
    if (!empty($_POST)) {
        $data = $_POST;
        // If packageConfig was sent as a JSON string, decode it
        if (isset($data['packageConfig']) && is_string($data['packageConfig'])) {
            $data['packageConfig'] = json_decode($data['packageConfig'], true);
        }
    }
}

if (!$data) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Ongeldige of lege gegevens ontvangen. Probeer het opnieuw."
    ]);
    exit();
}

$email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone = strip_tags(trim($data['phone'] ?? ''));
$packageConfig = $data['packageConfig'] ?? null;

// Validate basic inputs
if (!$email || !$phone) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Vul a.u.b. een geldig e-mailadres en telefoonnummer in."
    ]);
    exit();
}

// Email recipient (The owner of oerang.nl)
$to = "rjhaije@protonmail.com";

// Email Subject
$isQuotation = !empty($packageConfig);
$subject = $isQuotation 
    ? "Oerang.nl: Nieuwe Offerte Aanvraag 🚀" 
    : "Oerang.nl: Nieuw Terugbelverzoek 📞";

// Build clean, beautiful HTML Email
$message = "
<html>
<head>
  <title>" . htmlspecialchars($subject) . "</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1c1917; background-color: #fafaf9; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #f97316; padding: 30px 20px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
    .header p { margin: 5px 0 0; font-size: 14px; opacity: 0.9; }
    .content { padding: 30px 24px; }
    .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; color: #f97316; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 2px solid #fed7aa; padding-bottom: 4px; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .data-table td { padding: 8px 0; font-size: 14px; border-bottom: 1px solid #f5f5f4; }
    .data-table td.label { font-weight: bold; color: #78716c; width: 35%; }
    .data-table td.value { color: #1c1917; }
    .package-box { background: #fff7ed; border: 1px solid #ffedd5; border-radius: 8px; padding: 16px; margin-bottom: 24px; }
    .package-item { font-size: 13px; color: #44403c; padding: 4px 0; border-bottom: 1px dashed #fed7aa; }
    .package-item:last-child { border-bottom: none; }
    .price-summary { display: flex; justify-content: space-between; margin-top: 12px; padding-top: 12px; border-top: 1px solid #fed7aa; }
    .price-col { width: 48%; }
    .price-col span { display: block; font-size: 11px; color: #78716c; text-transform: uppercase; font-weight: bold; }
    .price-col strong { font-size: 16px; color: #ea580c; }
    .footer { background: #f5f5f4; text-align: center; padding: 15px; font-size: 11px; color: #78716c; border-top: 1px solid #e7e5e4; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h1>OERANG</h1>
      <p>Budget Websigners Leadnotificatie</p>
    </div>
    <div class='content'>
      
      <div class='section-title'>Contactgegevens</div>
      <table class='data-table'>
        <tr>
          <td class='label'>E-mailadres:</td>
          <td class='value'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></td>
        </tr>
        <tr>
          <td class='label'>Telefoonnummer:</td>
          <td class='value'><a href='tel:" . htmlspecialchars($phone) . "'>" . htmlspecialchars($phone) . "</a></td>
        </tr>
        <tr>
          <td class='label'>Tijdstip:</td>
          <td class='value'>" . date("d-m-Y H:i:s") . " (NL Tijd)</td>
        </tr>
      </table>";

if ($isQuotation) {
    $optionsHtml = "";
    if (isset($packageConfig['options']) && is_array($packageConfig['options'])) {
        foreach ($packageConfig['options'] as $optionName) {
            $optionsHtml .= "<div class='package-item'>✓ " . htmlspecialchars($optionName) . "</div>";
        }
    } else {
        $optionsHtml .= "<div class='package-item'>Geen extra opties geselecteerd</div>";
    }

    $setupPrice = number_format((float)($packageConfig['setupPrice'] ?? 0), 2, ',', '.');
    $monthlyPrice = number_format((float)($packageConfig['monthlyPrice'] ?? 0), 2, ',', '.');

    $message .= "
      <div class='section-title'>Gekozen Pakket Configuraties</div>
      <div class='package-box'>
        <div style='font-size: 12px; font-weight: bold; color: #ea580c; margin-bottom: 8px;'>Geselecteerde Modules:</div>
        " . $optionsHtml . "
        
        <div class='price-summary'>
          <div class='price-col'>
            <span>Eenmalige opstartkosten:</span>
            <strong>€ " . $setupPrice . "</strong>
          </div>
          <div class='price-col'>
            <span>Maandelijkse kosten:</span>
            <strong>€ " . $monthlyPrice . " / mnd</strong>
          </div>
        </div>
      </div>";
}

$message .= "
      <p style='font-size: 13px; color: #78716c; text-align: center; margin-top: 30px;'>
        Neem zo snel mogelijk (binnen 24 uur) contact op met deze klant om de lead op te volgen!
      </p>
    </div>
    <div class='footer'>
      Verzonden via oerang.nl • Live Hostinger Mail Service
    </div>
  </div>
</body>
</html>
";

// Set headers for HTML email
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Oerang Web Leads <no-reply@oerang.nl>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Return-Path: <no-reply@oerang.nl>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send the mail (using the -f parameter to set the envelope sender/Return-Path, which aligns SPF and DMARC)
$mailSent = mail($to, $subject, $message, $headers, "-fno-reply@oerang.nl");

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Bedankt! We hebben je aanvraag ontvangen en nemen snel contact met je op."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Server mail-fout: De mail kon niet worden verzonden vanaf de server. Probeer het later opnieuw."
    ]);
}
?>
