<?php
/**
* Requires the "PHP Email Form" library
* The "PHP Email Form" library is available only in the pro version of the template
* The library should be uploaded to: vendor/php-email-form/php-email-form.php
* For more info and help: https://bootstrapmade.com/php-email-form/
*/

// Replace contact@example.com with your real receiving email address
$receiving_email_address = 'info@kunlux.hu';

if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
    include($php_email_form);
} else {
    die('Unable to load the "PHP Email Form" Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

$contact->to = $receiving_email_address;
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];
$contact->from_phone = $_POST['phone'];
$contact->subject = $_POST['subject'];

// Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
/*
  $contact->smtp = array(
  'host' => 'example.com',
  'username' => 'example',
  'password' => 'pass',
  'port' => '587'
  );
 */

 $contact->add_message('<div style="font-weight: bold; padding:5px;">Ügyfél neve:</div> <div style="margin: 5px;">' . $_POST['name'] . '</div>', '');
 $contact->add_message('<div style="font-weight: bold; padding:5px;">Ügyfél Email címe:</div> <div style="margin: 5px;">' . $_POST['email'] . '</div>', '');
 $contact->add_message('<div style="font-weight: bold; padding:5px;">Ügyfél Telefonszáma:</div> <div style="margin: 5px;">' . $_POST['phone'] . '</div>', '');
 $contact->add_message('<div style="font-weight: bold; padding:5px;">Üzenet:</div><div style="margin: 5px;">' . $_POST['message'] . '</div>', '');

echo $contact->send();
?>
