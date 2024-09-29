<?php

$servername = "localhost";
$username = "root";
$password = "";

$connection = new mysqli($servername, $username, $password);

if ($connection->connect_error) {
    die("Erro na conexão: " . $connection->connect_error);
}

$sql_create_db = "CREATE DATABASE IF NOT EXISTS gestan";

if ($connection->query($sql_create_db) === TRUE) {
    echo "Banco de dados 'gestan' criado com sucesso!<br>";
} else {
    echo "Erro ao criar o banco de dados: " . $connection->error . "<br>";
}

$connection->select_db("gestan");

$sql_users = "CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    username VARCHAR(255),
    phone VARCHAR(25),
    email VARCHAR(100),
    password VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
)";

if ($connection->query($sql_users) === TRUE) {
    echo "Tabela 'users' criada com sucesso!<br>";
} else {
    echo "Erro ao criar a tabela 'users': " . $connection->error . "<br>";
}

$sql_groups = "CREATE TABLE IF NOT EXISTS groups (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    code VARCHAR(15),
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (created_by) REFERENCES users(id)
)";

if ($connection->query($sql_groups) === TRUE) {
    echo "Tabela 'groups' criada com sucesso!<br>";
} else {
    echo "Erro ao criar a tabela 'groups': " . $connection->error . "<br>";
}

$sql_categories = "CREATE TABLE IF NOT EXISTS categories (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    background_color VARCHAR(16),
    font_color VARCHAR(16),
    group_id INT(11),
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
)";

if ($connection->query($sql_categories) === TRUE) {
    echo "Tabela 'categories' criada com sucesso!<br>";
} else {
    echo "Erro ao criar a tabela 'categories': " . $connection->error . "<br>";
}

$sql_accounts = "CREATE TABLE IF NOT EXISTS accounts (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    initial_balance DOUBLE,
    actual_balance DOUBLE,
    created_by INT(11),
    group_id INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (group_id) REFERENCES groups(id)
)";

if ($connection->query($sql_accounts) === TRUE) {
    echo "Tabela 'accounts' criada com sucesso!<br>";
} else {
    echo "Erro ao criar a tabela 'accounts': " . $connection->error . "<br>";
}

$sql_transactions = "CREATE TABLE IF NOT EXISTS transactions (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    value DOUBLE,
    status VARCHAR(16),
    type VARCHAR(6),
    group_id INT(11),
    category_id INT(11),
    account_id INT(11),
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
)";

if ($connection->query($sql_transactions) === TRUE) {
    echo "Tabela 'transactions' criada com sucesso!<br>";
} else {
    echo "Erro ao criar a tabela 'transactions': " . $connection->error . "<br>";
}

$sql_goals = "CREATE TABLE IF NOT EXISTS goals (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    group_id INT(11),
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
)";

if ($connection->query($sql_goals) === TRUE) {
    echo "Tabela 'goals' criada com sucesso!<br>";
} else {
    echo "Erro ao criar a tabela 'goals': " . $connection->error . "<br>";
}

$connection->close();

?>
