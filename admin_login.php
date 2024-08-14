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
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';
$department = $input['department'] ?? '';

if (empty($username) || empty($password) || empty($department)) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos']);
    exit();
}

// Consultar si el usuario (tabla "operadores") existe y pertenece al departamento seleccionado y si el departamento está habilitado
$sql = $conn->prepare("SELECT o.contrasena, s.dashboard_url, o.id_operador, o.primer_nombre, o.primer_apellido, o.correo_electronico
                       FROM operadores o 
                       JOIN secciones s ON o.departamento = s.departamento 
                       WHERE o.correo_electronico = ? AND o.departamento = ? AND s.estado = 1");
$sql->bind_param('ss', $username, $department);
$sql->execute();
$sql->store_result();

if ($sql->num_rows > 0) {
    $sql->bind_result($hashed_password, $dashboard_url, $user_id, $first_name, $last_name, $email);
    $sql->fetch();

    // Verificar la contraseña encriptada utilizando password_verify
    if (password_verify($password, $hashed_password)) {
        // Iniciar sesión y almacenar la información del usuario
        $_SESSION['user_id'] = $user_id;
        $_SESSION['first_name'] = $first_name;
        $_SESSION['last_name'] = $last_name;
        $_SESSION['email'] = $email;
        $_SESSION['department'] = $department;

        echo json_encode(['success' => true, 'dashboard_url' => $dashboard_url]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no registrado o departamento incorrecto']);
}

$sql->close();
$conn->close();
?>