<?php
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

// Función para normalizar y convertir a mayúsculas
function normalizeUppercase($string) {
    $string = strtoupper($string);
    $string = str_replace(
        ['Á', 'á', 'É', 'é', 'Í', 'í', 'Ó', 'ó', 'Ú', 'ú', 'Ü', 'ü', 'Ñ', 'ñ'],
        ['A', 'A', 'E', 'E', 'I', 'I', 'O', 'O', 'U', 'U', 'U', 'U', 'Ñ', 'Ñ'],
        $string
    );
    return $string;
}

// Leer los datos enviados en la solicitud
$tipoDocumento = normalizeUppercase($_POST['documentType'] ?? '');
$numeroDocumento = normalizeUppercase($_POST['documentNumber'] ?? '');
$fechaExpedicion = $_POST['documentIssueDate'] ?? '';
$lugarExpedicion = normalizeUppercase($_POST['documentIssuePlace'] ?? '');
$primerNombre = normalizeUppercase($_POST['firstName'] ?? '');
$segundoNombre = normalizeUppercase($_POST['secondName'] ?? '');
$primerApellido = normalizeUppercase($_POST['firstSurname'] ?? '');
$segundoApellido = normalizeUppercase($_POST['secondSurname'] ?? '');
$correoElectronico = strtolower($_POST['email'] ?? '');
$telefonoMovil = normalizeUppercase($_POST['mobilePhone'] ?? '');
$direccion = normalizeUppercase($_POST['address'] ?? '');
$codigoAutorizacion = normalizeUppercase($_POST['authorizationCode'] ?? '');

// Verificar si algún campo requerido está vacío
if (empty($tipoDocumento) || empty($numeroDocumento) || empty($fechaExpedicion) || empty($lugarExpedicion) ||
    empty($primerNombre) || empty($primerApellido) || empty($correoElectronico) || empty($telefonoMovil) ||
    empty($direccion) || empty($codigoAutorizacion)) {
    echo json_encode(['success' => false, 'message' => 'Error: Todos los campos marcados con * son obligatorios.']);
    exit();
}

// Verificar el código de autorización
$sqlAuth = $conn->prepare("SELECT id_autorizacion FROM autorizaciones_registro WHERE codigo_autorizacion = ? AND estado = 1");
$sqlAuth->bind_param("s", $codigoAutorizacion);
$sqlAuth->execute();
$sqlAuth->store_result();

if ($sqlAuth->num_rows == 0) {
    echo json_encode(['success' => false, 'message' => 'Error: Código de autorización inválido o ya usado.']);
    $sqlAuth->close();
    $conn->close();
    exit();
}

// Marcar el código de autorización como usado solo si el registro es exitoso
$sqlAuth->bind_result($idAutorizacion);
$sqlAuth->fetch();
$sqlAuth->close();

// Verificar si el correo electrónico o el número de documento ya están registrados
$sqlCheck = $conn->prepare("SELECT id_operador FROM operadores WHERE correo_electronico = ? OR numero_documento = ?");
$sqlCheck->bind_param("ss", $correoElectronico, $numeroDocumento);
$sqlCheck->execute();
$sqlCheck->store_result();

if ($sqlCheck->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Error: El correo electrónico o el número de documento ya están registrados.']);
    $sqlCheck->close();
    $conn->close();
    exit();
}
$sqlCheck->close();

// Insertar el nuevo administrador en la base de datos
$sql = $conn->prepare("INSERT INTO operadores (
    tipo_documento, numero_documento, fecha_expedicion, primer_nombre, segundo_nombre, primer_apellido,
    segundo_apellido, lugar_expedicion, correo_electronico, telefono_movil, direccion
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$sql->bind_param(
    "sssssssssss",
    $tipoDocumento, $numeroDocumento, $fechaExpedicion, $primerNombre, $segundoNombre,
    $primerApellido, $segundoApellido, $lugarExpedicion, $correoElectronico, $telefonoMovil, $direccion
);

if ($sql->execute()) {
    // Actualizar el estado del código de autorización
    $sqlUpdateAuth = $conn->prepare("UPDATE autorizaciones_registro SET estado = 0 WHERE id_autorizacion = ?");
    $sqlUpdateAuth->bind_param("i", $idAutorizacion);
    $sqlUpdateAuth->execute();
    $sqlUpdateAuth->close();

    echo json_encode(['success' => true, 'message' => 'Registro de administrador exitoso.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al registrar el administrador: ' . $sql->error]);
}

$sql->close();
$conn->close();
?>