<?php

// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require 'phpmailer/src/Exception.php';
// require 'phpmailer/src/PHPMailer.php';

// $mail = new PHPMailer(true);
// $mail->CharSet = 'UTF-8';
// $mail->setLanguage('ru', 'phpmailer/language');

//Server settings
// $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
// $mail->isSMTP();                                            //Send using SMTP
// $mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
// $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
// $mail->Username   = 'user@example.com';                     //SMTP username
// $mail->Password   = 'secret';                               //SMTP password
// $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
// $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

//Recipients
// $mail->setFrom('sobranieinfo@yandex.ru', 'dyure');
// $mail->addAddress('sobranieinfo@yandex.ru', 'dyure');     //Add a recipient
// $mail->addAddress('ellen@example.com');               //Name is optional
// $mail->addReplyTo('info@example.com', 'Information');
// $mail->addCC('cc@example.com');
// $mail->addBCC('bcc@example.com');

//Attachments
// $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

//Content
// $mail->isHTML(true);                                  //Set email format to HTML
// $mail->Subject = 'Это письмо с сайта Металлические фермы';
// $mail->Body    = 'Телефон: ';

$to  = 'sobranieinfo@yandex.ru'; 
$subject = 'Это письмо с сайта Металлические фермы'; 
$message = 'Телефон: ';
if (trim(!empty($_POST['fldPhone']))){
    $message .= $_POST['fldPhone'];
}
$headers  = "Content-type: text/html; charset=UTF-8 \r\n"; 
$headers .= "From: От кого письмо <sobranieinfo@yandex.ru>\r\n"; 

//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if (!mail($to, $subject, $message, $headers)) {
    $message = 'Ошибка';
} else {
    $message = 'Письмо отправлено';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);