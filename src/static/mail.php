<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'utf-8';

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$name = $input['name'];
$phone = $input['phone'];
//caop
try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = '';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = '';                     //SMTP username
    $mail->Password   = '';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom(''); 
    $mail->addAddress(''); 

    //Content
    $mail->isHTML(true);

    $body = "<p><span style='font-size: 14px;''>Имя пользователя: </span><span style='font-size: 20px;''>$name</span></p>";
    $body .= "<p><span style='font-size: 14px;''>Номер телефона: </span><span style='font-size: 20px;''>$phone</span></p>";

    $mail->Subject = 'Заявка с сайта ЦАОП';
    $mail->Body    =  $body;
    $mail->AltBody = '' .$name . ' оставил(а) заявку, его(её) телефон ' .$phone;

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>