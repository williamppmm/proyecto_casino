<?php
header('Content-Type: application/json');

// Establecer la conexión con la base de datos y maneja posibles errores de conexión.
function connectToDatabase($servername, $username, $password, $dbname) {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        error_log('Error de conexión: ' . $conn->connect_error);
        echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']);
        exit();
    }
    $conn->set_charset("utf8");  // Asegurar la codificación correcta de caracteres.
    return $conn;
}

// Normalizar los strings para eliminar acentos y convertirlos a mayúsculas.
function normalizeUppercase($string) {
    return str_replace(
        ['Á', 'á', 'É', 'é', 'Í', 'í', 'Ó', 'ó', 'Ú', 'ú', 'Ü', 'ü', 'Ñ', 'ñ'],
        ['A', 'A', 'E', 'E', 'I', 'I', 'O', 'O', 'U', 'U', 'U', 'U', 'N', 'N'],
        strtoupper($string)
    );
}

// Generar una contraseña aleatoria segura.
function generateRandomPassword($length = 8) {
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%$!';
    $password = '';
    for ($i = 0; $i < $length; $i++) {
        $password .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $password;
}

// Preparación de variables para la conexión
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "casinolafortuna";

// Conexión a la base de datos
$conn = connectToDatabase($servername, $username, $password, $dbname);

// Decodificar los datos recibidos del cliente.
$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['user'];
$position = normalizeUppercase($data['position']);
$entryDate = $data['entryDate'];
$department = $data['department'];

// Validación de los campos requeridos.
if (empty($userId) || empty($position) || empty($department) || empty($entryDate)) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
    exit();
}

// Generar y cifrar una contraseña nueva.
$password = generateRandomPassword();
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Prepara y ejecuta la actualización de datos en la base de datos.
$sql = "UPDATE operadores SET cargo = ?, fecha_ingreso = ?, departamento = ?, contrasena = ? WHERE id_operador = ?";
$stmt = $conn->prepare($sql);
if ($stmt) {
    $stmt->bind_param("ssssi", $position, $entryDate, $department, $hashedPassword, $userId);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Rol asignado exitosamente', 'password' => $password]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al asignar el rol: ' . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Error en la preparación de la consulta: ' . $conn->error]);
}

// Cierra la conexión a la base de datos.
$conn->close();
?>