<?php

declare(strict_types=1);
$host = 'localhost';
$banco = 'doppio_mocha';
$usuario = 'root';
$senha = '';
$dsn = "mysql:host={$host};dbname={$banco};charset=utf8mb4";
try {
    $pdo = new PDO($dsn, $usuario, $senha, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    exit('Não foi possível conectar ao banco. Confira config/conexao.php e importe database/doppio_mocha.sql.');
}
