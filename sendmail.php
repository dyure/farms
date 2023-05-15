<?php
error_reporting(E_ALL); 
ini_set("display_errors", 1);
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
// require 'phpmailer/src/PHPMailer.php';
// require 'phpmailer/src/SMTP.php';

//Load Composer's autoloader
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.mail.ru';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'sobranieinfo@mail.ru';                     //SMTP username
    $mail->Password   = 'ybaw5mmQ68LmBmwha2B1';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Other settings
    $mail->CharSet = 'UTF-8';

    //Recipients
    $mail->setFrom('sobranieinfo@mail.ru', 'Mailer');
    $mail->addAddress('sobranieinfo@mail.ru', 'Joe User');     //Add a recipient
    // $mail->addAddress('ellen@example.com');               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Это письмо с сайта Металлические фермы';
    $mail->Body    = 'Телефон: ';
    if (trim(!empty($_POST['fldPhone']))){
        $mail->Body .= $_POST['fldPhone'];
    }
    // //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    $message = 'Message has been sent';
} catch (Exception $e) {
    $message = 'Message could not be sent. Mailer Error: {$mail->ErrorInfo}';
}

$response = ['message' => $message];
header('Content-Type: application/json');
echo json_encode($response);