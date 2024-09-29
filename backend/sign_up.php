<?php

if((isset($_POST["name"]) && !empty($_POST["name"])) && (isset($_POST["last_name"]) && !empty($_POST["last_name"])) && (isset($_POST["date_of_birth"]) && !empty($_POST["date_of_birth"])) && (isset($_POST["email"]) && !empty($_POST["email"])) && (isset($_POST["password"]) && !empty($_POST["password"]))){
    
    require_once('connection.php');
    require 'class/user.class.php';

    $user = new User();

    $name = addslashes(trim($_POST["name"]));
    $last_name = addslashes(trim($_POST["last_name"]));
    $date_of_birth = addslashes(trim($_POST["date_of_birth"]));
    $email = addslashes(trim($_POST["email"]));
    $password = addslashes(trim($_POST["password"]));

    if($user->signup($name, $last_name, $date_of_birth, $email, $password) == true){
        echo 'Cadastrado com sucesso';
    } else {
        echo 'Ocorreu um erro, tente novamente mais tarde!';
    }

} else {
    echo 'Os dados não podem ser vazios!';
}