<?php
require_once __DIR__ . '/../config/sessao.php';
$_SESSION = []; session_destroy(); header('Location: ../html/index.php'); exit;
