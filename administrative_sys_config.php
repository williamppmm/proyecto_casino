<?php
header('Content-Type: application/json');
include 'db_config.php';

// Preparación de variables para la conexión
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "casinolafortuna";

$userId = $_SESSION['user_id']; // Asumiendo que el ID del usuario está almacenado en la sesión
$email = $_POST['email'];
$password = $_POST['password'];
$telefono = $_POST['telefono'];
$direccion = $_POST['direccion'];
$image = $_FILES['image'];

// Verificar si el correo electrónico y el número de teléfono ya existen en la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']);
    exit();
}

$sqlCheck = "SELECT * FROM operadores WHERE (correo_electronico = ? OR telefono_movil = ?) AND id_operador != ?";
$stmtCheck = $conn->prepare($sqlCheck);
$stmtCheck->bind_param("ssi", $email, $telefono, $userId);
$stmtCheck->execute();
$result = $stmtCheck->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'El correo electrónico o el número de teléfono ya están en uso']);
    exit();
}

if (!empty($password)) {
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
}

$sql = "UPDATE operadores SET correo_electronico = ?, telefono_movil = ?, direccion = ?, contrasena = ? WHERE id_operador = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssi", $email, $telefono, $direccion, $hashedPassword, $userId);

if ($stmt->execute()) {
    // Manejo de la carga de la imagen
    if (isset($image) && $image['error'] == 0) {
        $targetDir = "img/Users/";
        $targetFile = $targetDir . uniqid() . '_' . basename($image['name']);
        if (move_uploaded_file($image['tmp_name'], $targetFile)) {
            echo json_encode(['success' => true, 'message' => 'Perfil actualizado correctamente, imagen cargada']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Perfil actualizado, error al cargar imagen']);
        }
    } else {
        echo json_encode(['success' => true, 'message' => 'Perfil actualizado correctamente']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar el perfil: ' . $stmt->error]);
}

$conn->close();
?>