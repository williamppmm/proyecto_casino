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

// Consulta para obtener los usuarios registrados
$sql = "SELECT id_operador, primer_nombre, primer_apellido, correo_electronico FROM operadores";
$result = $conn->query($sql);

$users = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// Enviar la respuesta en formato JSON
echo json_encode(['success' => true, 'data' => $users]);

// Cerrar la conexión a la base de datos
$conn->close();
?>