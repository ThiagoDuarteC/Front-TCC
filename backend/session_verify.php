<?php

session_start();

if(!isset($_SESSION['user']) && $_POST['url'] != 'index' && $_POST['url'] != 'cadastro'){
    echo 'not session';
    exit();
} elseif (isset($_SESSION['user']) && ($_POST['url'] == 'index' || $_POST['url'] == 'cadastro')) {
    echo 'session';
    exit();
}
