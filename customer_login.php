<?php
session_start();
header('Content-Type: application/json');

// Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "casinolafortuna";

// Crear una conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error]);
    exit();
}

// Leer los datos enviados en la solicitud
$input = json_decode(file_get_contents('php://input'), true);
$username = strtolower($input['username'] ?? '');
$password = $input['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos']);
    exit();
}

// Consultar si el usuario existe
$sql = $conn->prepare("SELECT id_cliente, user_pass FROM clientes WHERE correo_electronico = ?");
if (!$sql) {
    echo json_encode(['success' => false, 'message' => 'Error en la consulta: ' . $conn->error]);
    exit();
}

$sql->bind_param("s", $username);
$sql->execute();
$sql->store_result();
if ($sql->num_rows > 0) {
    $sql->bind_result($id_cliente, $hashed_password);
    $sql->fetch();

    // Verificar la contraseña encriptada utilizando password_verify
    if (password_verify($password, $hashed_password)) {
        // Guardar el ID del cliente en la sesión
        $_SESSION['user_id'] = $id_cliente;
        echo json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no registrado']);
}

$sql->close();
$conn->close();
?>