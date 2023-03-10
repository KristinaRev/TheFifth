
/*объявление переменных и подключения к базе данных */
<?php

$host = 'localhost';
$dbname = 'dbname';
$user = 'username';
$password = 'password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
