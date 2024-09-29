<?php

session_start();

$server = "localhost";
$user = "root";
$password = "";
$database = "gestan";

global $pdo;

try{

    $pdo = new PDO("mysql:dbname=" . $database . "; host=" . $server, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}catch(PDOException $e){

    echo "Erro de conexão: " . $e->getMessage();
    exit;

}
