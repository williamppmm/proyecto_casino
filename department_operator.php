<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "casinolafortuna";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Conexión fallida: ' . $conn->connect_error]));
}

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? $_GET['action'] ?? null;

$response = ['success' => false, 'message' => 'Acción no válida'];

if ($action) {
    switch ($action) {
        case 'enable':
        case 'disable':
        case 'delete':
            handleDepartmentAction($conn, $data);
            break;
        case 'generate_authorization_code':
            handleGenerateAuthorizationCode($conn, $data);
            break;
        case 'activate_authorization_code':
        case 'deactivate_authorization_code':
        case 'delete_authorization_code':
            handleAuthorizationCodeAction($conn, $data);
            break;
        case 'get_authorization_codes':
            handleGetAuthorizationCodes($conn);
            break;
        default:
            echo json_encode($response);
            break;
    }
} else {
    echo json_encode($response);
}

$conn->close();

function handleDepartmentAction($conn, $data) {
    $id = $data['id'];
    $action = $data['action'];

    $initialDepartments = ['ADMINISTRACION', 'CONTABILIDAD', 'MAQUINAS TRAGAMONEDAS', 'JUEGOS EN LINEA', 'APUESTAS DEPORTIVAS', 'ALIMENTOS Y BEBIDAS', 'CAJA', 'MARKETING'];

    $sql = "SELECT departamento FROM secciones WHERE id_seccion = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $department = $result->fetch_assoc()['departamento'];

    if ($action == 'delete' && in_array($department, $initialDepartments)) {
        echo json_encode(['success' => false, 'message' => 'No se puede eliminar un departamento inicial.']);
        $stmt->close();
        return;
    }

    if ($action == 'enable') {
        $sql = "UPDATE secciones SET estado = 1 WHERE id_seccion = ?";
    } elseif ($action == 'disable') {
        $sql = "UPDATE secciones SET estado = 0 WHERE id_seccion = ?";
    } elseif ($action == 'delete') {
        $sql = "DELETE FROM secciones WHERE id_seccion = ?";
    }

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al ejecutar la acción.']);
    }

    $stmt->close();
}

function handleGenerateAuthorizationCode($conn, $data) {
    $authorizationCode = $data['authorizationCode'];
    $authorizationDescription = strtoupper($data['authorizationDescription']);

    $sql = "INSERT INTO autorizaciones_registro (codigo_autorizacion, descripcion, estado) VALUES (?, ?, 1)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $authorizationCode, $authorizationDescription);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Código de autorización generado exitosamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al generar el código de autorización: ' . $stmt->error]);
    }

    $stmt->close();
}

function handleAuthorizationCodeAction($conn, $data) {
    $authorizationCode = $data['authorizationCode'];
    $action = $data['action'];

    if ($action == 'activate_authorization_code') {
        $sql = "UPDATE autorizaciones_registro SET estado = 1 WHERE codigo_autorizacion = ?";
    } elseif ($action == 'deactivate_authorization_code') {
        $sql = "UPDATE autorizaciones_registro SET estado = 0 WHERE codigo_autorizacion = ?";
    } elseif ($action == 'delete_authorization_code') {
        $sql = "DELETE FROM autorizaciones_registro WHERE codigo_autorizacion = ?";
    }

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $authorizationCode);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Acción realizada con éxito']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al ejecutar la acción: ' . $stmt->error]);
    }

    $stmt->close();
}

function handleGetAuthorizationCodes($conn) {
    $sql = "SELECT codigo_autorizacion, descripcion FROM autorizaciones_registro";
    $result = $conn->query($sql);

    $codes = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $codes[] = $row;
        }
    }

    echo json_encode(['success' => true, 'data' => $codes]);
}
?>