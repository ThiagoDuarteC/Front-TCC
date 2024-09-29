<?php

class User{

    public function signin($email, $password){

        global $pdo;

        $sql = "SELECT id, email, password FROM users WHERE email = :email AND password = :password";
        $sql = $pdo->prepare($sql);
        $sql->bindValue("email", $email);
        $sql->bindValue("password", $password);
        $sql->execute();

        if($sql->rowCount() > 0){
            $data = $sql->fetch();

            $_SESSION['user'] = $data['id'];

            return true;
        } else {
            return false;
        }

    }

    public function signup($name, $last_name, $date_of_birth, $email, $password){

        global $pdo;

        $sql = "INSERT INTO users (name, last_name, date_of_birth, email, password, created_at, updated_at) VALUES ('$name', '$last_name', '$date_of_birth', '$email', '$password', NOW(), NOW())";
        $sql = $pdo->prepare($sql);

        try {
            $sql->execute();
            $_SESSION['user'] = $pdo->lastInsertId();
        } catch (PDOException $e) {
            return false;
        }

        return true;


    }

}