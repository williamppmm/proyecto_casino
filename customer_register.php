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
$password = $_POST['password'] ?? '';
$fechaNacimiento = $_POST['birthdate'] ?? '';
$genero = normalizeUppercase($_POST['gender'] ?? '');
$nacionalidad = normalizeUppercase($_POST['nationality'] ?? '');
$direccion = normalizeUppercase($_POST['address'] ?? '');
$municipio = normalizeUppercase($_POST['municipality'] ?? '');
$interdicto = normalizeUppercase($_POST['interdicted'] ?? '');
$pep = normalizeUppercase($_POST['pep'] ?? '');
$consentimientoDatos = isset($_POST['dataConsent']);
$comunicacionesComerciales = isset($_POST['commercialCommunications']);
$terminosCondiciones = isset($_POST['termsAndConditions']);
$captcha = isset($_POST['captcha']);

// Verificar si algún campo requerido está vacío
if (empty($tipoDocumento) || empty($numeroDocumento) || empty($fechaExpedicion) || empty($lugarExpedicion) ||
    empty($primerNombre) || empty($primerApellido) || empty($correoElectronico) || empty($telefonoMovil) ||
    empty($password) || empty($fechaNacimiento) || empty($genero) || empty($nacionalidad) || empty($direccion) ||
    empty($municipio) || empty($interdicto) || empty($pep) || !$consentimientoDatos || !$comunicacionesComerciales ||
    !$terminosCondiciones || !$captcha) {
    echo json_encode(['success' => false, 'message' => 'Error: Todos los campos marcados con * son obligatorios.']);
    exit();
}

// Verificar si el correo electrónico o el número de documento ya están registrados
$sqlCheck = $conn->prepare("SELECT id_cliente FROM clientes WHERE correo_electronico = ? OR numero_documento = ?");
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

// Hashear la contraseña usando bcrypt
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Insertar el nuevo cliente en la base de datos
$sql = $conn->prepare("INSERT INTO clientes (
    tipo_documento, numero_documento, fecha_expedicion, primer_nombre, segundo_nombre,
    primer_apellido, segundo_apellido, lugar_expedicion, correo_electronico, telefono_movil,
    user_pass, fecha_nacimiento, genero, nacionalidad, direccion, municipio,
    interdicto, pep, consentimiento_datos, comunicaciones_comerciales,
    terminos_condiciones, captcha
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$sql->bind_param(
    "sssssssssssssssssiiiii",
    $tipoDocumento, $numeroDocumento, $fechaExpedicion, $primerNombre, $segundoNombre,
    $primerApellido, $segundoApellido, $lugarExpedicion, $correoElectronico, $telefonoMovil,
    $hashedPassword, $fechaNacimiento, $genero, $nacionalidad, $direccion, $municipio,
    $interdicto, $pep, $consentimientoDatos, $comunicacionesComerciales,
    $terminosCondiciones, $captcha
);

if ($sql->execute()) {
    echo json_encode(['success' => true, 'message' => 'Registro exitoso.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al registrar el cliente: ' . $sql->error]);
}

$sql->close();
$conn->close();
?>