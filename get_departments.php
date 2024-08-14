<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "casinolafortuna";

// Crear conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => "Conexión fallida: " . $conn->connect_error]));
}

// Función para obtener todos los departamentos
function getDepartments($conn) {
    $sql = "SELECT id_seccion, departamento, estado FROM secciones";
    $result = $conn->query($sql);

    $departments = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $departments[] = $row;
        }
    }
    return $departments;
}

// Determinar la acción a realizar basada en los parámetros
$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : null);

$response = ['success' => false, 'message' => 'Acción no válida'];

if ($action) {
    switch ($action) {
        case 'get_departments':
            $departments = getDepartments($conn);
            $response = ['success' => true, 'data' => $departments];
            break;

        default:
            $response = ['success' => false, 'message' => 'Acción no reconocida'];
            break;
    }
} else {
    $response = ['success' => false, 'message' => 'Falta el parámetro de acción'];
}

// Enviar la respuesta en formato JSON
echo json_encode($response);

// Cerrar la conexión a la base de datos
$conn->close();
?>