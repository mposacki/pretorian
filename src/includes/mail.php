<?php

date_default_timezone_set('Etc/UTC');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require getcwd().'/classes/Exception.php';
require getcwd().'/classes/PHPMailer.php';
require getcwd().'/classes/SMTP.php';

$mail = new PHPMailer;
$mail->CharSet = "UTF-8";
$mail->isSMTP();

$mail->Host = 'mail11.mydevil.net';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = "admin@maciejposacki.usermd.net";
$mail->Password = "Admin123";

$mail->setFrom('test@pretorians.mposacki.pl', $_POST['name']);
if ($_POST['subject'] == 'recruitment') {
    $mail->addAddress('admin@maciejposacki.usermd.net', 'Mailer');
} else {
    $mail->addAddress('test@pretorians.mposacki.pl', 'Mailer');
}
$mail->addReplyTo('noreplay@pretorians.mposacki.pl', 'Information');

$mail->isHTML(true);
$mail->Subject = $_POST['subject'];
$mail->Body    =
'From: ' . $_POST['name'] . ' (' . $_POST['email'] . ')' . "\r\n" .
'Subject: ' . $_POST['subject'] . "\r\n" .
'Message: ' . $_POST['content'] . "\r\n";
$mail->AltBody = $_POST['content'];

if (!$mail->send()) {
    echo "1Wystąpił błąd podczas wysyłania wiadomości: " . $mail->ErrorInfo;
} else {
    echo "Wiadomość została wysłana!";
}