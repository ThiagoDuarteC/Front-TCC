<?php

if((isset($_POST["email"]) && !empty($_POST["email"])) && (isset($_POST["password"]) && !empty($_POST["password"]))){
    
    require_once('connection.php');
    require 'class/user.class.php';

    $user = new User();

    $email = addslashes($_POST["email"]);
    $password = addslashes($_POST["password"]);

    if($user->signin($email, $password) == true){
        if(isset($_SESSION['user'])){
            echo 'Logado com sucesso';
        } else {
            echo 'Ocorreu um erro, tente novamente mais tarde!';
        }
    } else {
        echo 'E-mail ou senha incorreto!';
    }

} else {
    echo 'E-mail ou senha incorreto!';
}