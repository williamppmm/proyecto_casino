# proyecto_casino
proyecto de aprendizaje, ADSO SENA 2758315, William Pérez Muñoz, Hernan Darío Pérez Higuita, Penélope Noreña Ramos

Casino La Fortuna

Descripción del Proyecto

Casino La Fortuna es un software contable integral diseñado para la gestión financiera y operativa de un casino. Este sistema está desarrollado para manejar la contabilidad diaria de diversas actividades del casino, incluyendo máquinas tragamonedas, apuestas deportivas online y servicios adicionales. El objetivo principal del proyecto es proporcionar una solución unificada que facilite el control, registro y análisis de las transacciones financieras del casino, permitiendo a los administradores tomar decisiones informadas basadas en datos precisos y actualizados.

Funcionalidades Principales

- Gestión de Máquinas Tragamonedas: Registro y seguimiento de la actividad de cada máquina, incluyendo entradas, salidas, premios mayores y balance.
- Gestión de Juegos Online: Control y registro de las ganancias y pérdidas diarias generadas por los juegos online.
- Apuestas Deportivas: Control y registro de las ganancias y pérdidas diarias generadas por las apuestas deportivas.
- Servicios Adicionales: Gestión de las ventas de servicios adicionales ofrecidos por el casino, como recargas y pines.
- Gestión de Gastos y Pagos: Registro detallado de todos los gastos operativos del casino, incluyendo nómina, arriendo, y pagos a proveedores.
- Generación de Informes Financieros: Creación de informes diarios, mensuales y anuales que detallan los ingresos, gastos y beneficios del casino.
- Control de Inventario: Seguimiento y gestión del inventario relacionado con las actividades de juego y servicios adicionales.
  
Tecnologías Utilizadas

- Lenguaje de Programación: PHP, JavaScript
- Base de Datos: MySQL
- Servidor Web: Apache (XAMPP)
- Herramientas de Desarrollo: MySQL Workbench, Visual Studio Code

Requisitos del Sistema

- Sistema Operativo: Windows 10 o superior
- Memoria RAM: 4 GB mínimo
- Almacenamiento: 500 GB mínimo
- Otros: Conexión a Internet para la sincronización de datos y copias de seguridad.

Instalación

Clonar el repositorio desde GitHub:

git clone https://github.com/williamppmm/proyecto_casino

Configurar el entorno en XAMPP:

- Colocar los archivos del proyecto en la carpeta htdocs de XAMPP.
- Crear la base de datos en MySQL usando el archivo SQL proporcionado en el repositorio.
- Configurar los archivos de conexión a la base de datos:
  Editar los archivos de configuración para asegurarse de que apuntan a la base de datos correcta.
  Iniciar el servidor Apache y MySQL desde el panel de control de XAMPP.
- Acceder al proyecto desde el navegador en http://localhost/proyecto_casino/

Uso

Acceso al Sistema
1. Usuarios: El sistema permite la creación de usuarios con diferentes roles, como operadores, administradores y técnicos.
2. Gestión de Máquinas: Los operadores pueden ingresar datos relacionados con las máquinas tragamonedas, incluyendo las métricas diarias como COINS IN, COINS OUT, JACKPOTS y YIELD.
3. Generación de Informes: Los administradores pueden generar informes financieros detallados que resumen las operaciones diarias y mensuales.

Contribuciones

Las contribuciones son bienvenidas. Para contribuir, por favor sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (git checkout -b feature-nueva-funcionalidad).
3. Realiza tus cambios y haz commit (git commit -m "Añadir nueva funcionalidad").
4. Sube tus cambios (git push origin feature-nueva-funcionalidad).
5. Abre un Pull Request.

Licencia

- Este proyecto está desarrollado bajo una licencia personalizada con fines educativos. El software desarrollado como parte del proyecto Casino la Fortuna ha sido creado por un grupo de aprendices con el objetivo de adquirir experiencia en el desarrollo de software. Por lo tanto, su uso, distribución y modificación están permitidos únicamente con la autorización explícita de los autores.
- Si deseas utilizar este software o partes del mismo para propósitos educativos, personales o comerciales, te pedimos que contactes a los autores para obtener el permiso necesario.
- Este proyecto es compartido bajo los principios de la colaboración y el aprendizaje, y estamos abiertos a contribuir y colaborar con otros en un ambiente educativo.

Contacto

Para más información sobre este proyecto, puedes contactar a:

William Pérez Muñoz- Desarrollador Principal - williamppmm@hotmail.com

Dado que este proyecto es de aprendizaje anexare algunas instrucciones en lenguaje no tecnico para poner en marcha el proyecto desde mi punto de vista de aprendiz, adicionalmente el script de la base de datos que utilizamos, algunas correcciones o cambios estan comentadas a la fecha es funcional con el prototipo para hacer las consultas:

Instrucciones para el prototipo

El prototipo se inicia desde index.html (http://localhost/proyecto_casino/index.html), después de ejecutar Apache y MySQL desde XAMPP, el script de la base de datos lo ejecutamos (necesario para ver funcionalidad) a traves de MySQL Workbench, de lo cual podemos rescatar. el correo y contraseña para el login del administrador del sistema: 

Correo electrónico: williamperez_admin@casinofortuna.com
Contraseña: Ln$6snVB
Departamento: ADMINISTRACION

Desde su dashboard (Dashboard de Administración) se pueden generar códigos de registros para los empleados (en este caso "operadores" del sistema o empleados en la realidad), de igual manera el script genera dos códigos de registro para "operadores", los clientes tienen libertad de registrarse y crear su contraseña.


y toda la información relevante de todas las secciones implementadas (en construcción)

Desde el index se puede hacer:

Registro y Login de clientes, almacenando las contraseñas encriptadas en la DB, y validando las contraseñas al ingreso

Registro de Operadores (solo con un código de registro activo, el administrador puede generar nuevos o activar códigos ya existentes)

Login de Operadores (para el login inicial del operador se requiere haberse registrado previamente y que el administrador del sistema otorgue un Rol, Departamento y contraseña inicial desde su dashboard "Dashboard de administración"), cuando ya se le han sido asignados puede hacer el login sin restricciones, esta en construcción ajustes del sistema, para que el usuario pueda cambiar su correo, dirección, teléfono y cambiar su contraseña (en construcción)

Es de recordar que el index también enlaza con redes sociales y contactos o servicio al cliente (aun en construcción pero con enlaces funcionales)

Script de la base de datos

/* Eliminar la base de datos si existe */
DROP SCHEMA IF EXISTS casinolafortuna;

/* Creación de la base de datos para Casino la Fortuna */
CREATE SCHEMA IF NOT EXISTS casinolafortuna DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

/* Usar el esquema creado */
USE casinolafortuna;

/* Creación de la tabla secciones */
CREATE TABLE secciones (
    id_seccion INT(11) NOT NULL AUTO_INCREMENT,
    departamento VARCHAR(45) NOT NULL,
    dashboard_url VARCHAR(255) NOT NULL,
    estado TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (id_seccion),
    UNIQUE KEY (departamento)
);



/* Insertar las secciones con las rutas a sus dashboards correspondientes 
Por razones funcionales determine que el software debería trabajar con 5 dashboards iniciales
Se pueden crear e insertar nuevos dashboards pero se registraran de manera inicial estos desde el script por funcionalidad*/

INSERT INTO secciones (departamento, dashboard_url) VALUES ('ADMINISTRACION', 'admin_dashboard.html');
INSERT INTO secciones (departamento, dashboard_url) VALUES ('CONTABILIDAD', 'financial_dashboard.html');
INSERT INTO secciones (departamento, dashboard_url) VALUES ('MAQUINAS TRAGAMONEDAS', 'slot_machines_dashboard.html');
INSERT INTO secciones (departamento, dashboard_url) VALUES ('JUEGOS EN LINEA', 'online_games_dashboard.html');
INSERT INTO secciones (departamento, dashboard_url) VALUES ('APUESTAS DEPORTIVAS', 'sports_betting_dashboard.html');
INSERT INTO secciones (departamento, dashboard_url) VALUES ('ALIMENTOS Y BEBIDAS', 'restaurant_management_dashboard.html');
INSERT INTO secciones (departamento, dashboard_url) VALUES ('CAJA', 'cashier_dashboard.html');
INSERT INTO secciones (departamento, dashboard_url) VALUES ('MARKETING', 'marketing_dashboard.html');

/* Para evitar el registro indiscriminado y sin autorización cree la tabla de autorizaciones */
CREATE TABLE autorizaciones_registro (
    id_autorizacion INT(11) NOT NULL AUTO_INCREMENT,
    codigo_autorizacion VARCHAR(20) NOT NULL,
    descripcion VARCHAR(100),
    estado BOOLEAN NOT NULL DEFAULT 1,  /* 1 = Disponible, 0 = Usado */
    PRIMARY KEY (id_autorizacion)
);

/* Insertar códigos de autorización como ejemplo */

/* Los codigos se pueden generar desde el dashboard administrativo

INSERT INTO autorizaciones_registro (codigo_autorizacion, descripcion) VALUES
('ADMIN2024CODE', 'Código para registro de administradores'),
('SUPERADMIN2024', 'Código para registro de superadministrador');
*/

/* Creación de la tabla de operadores */
CREATE TABLE operadores (
  id_operador INT(11) NOT NULL AUTO_INCREMENT,
  cargo VARCHAR(30),
  fecha_ingreso DATE,
  tipo_documento VARCHAR(10) NOT NULL,
  numero_documento VARCHAR(20) NOT NULL,
  fecha_expedicion DATE NOT NULL,
  primer_nombre VARCHAR(50) NOT NULL,
  segundo_nombre VARCHAR(50),
  primer_apellido VARCHAR(50) NOT NULL,
  segundo_apellido VARCHAR(50),
  lugar_expedicion VARCHAR(100) NOT NULL,
  correo_electronico VARCHAR(100) NOT NULL,
  telefono_movil VARCHAR(20) NOT NULL,
  direccion VARCHAR(45) NOT NULL,
  contrasena VARCHAR(255),
  departamento VARCHAR(45),
  PRIMARY KEY (id_operador),
  FOREIGN KEY (departamento) REFERENCES secciones(departamento)
);

/* Insertar el primer operador (William) */
INSERT INTO operadores (
    cargo,
    fecha_ingreso,
    tipo_documento,
    numero_documento,
    fecha_expedicion,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    lugar_expedicion,
    correo_electronico,
    telefono_movil,
    direccion,
    contrasena,
    departamento
) VALUES (
    'SUPER ADMINISTRADOR',
    '2023-01-01',
    'CC',
    '10291775',
    '1999-08-13',
    'WILLIAM',
    '',
    'PEREZ',
    'MUÑOZ',
    'POPAYAN',
    'williamperez_admin@casinofortuna.com',
    '3152728882',
    'CR 25 42A-20',
    '$2y$10$zr35VUqhRrc3t6ujjsr1AufZjbF9BQS0a1ymjuyb86U6eaG/feqXW', /* Contraseña Ln$6snVB */
    'ADMINISTRACION'
);

/* Prueba de actualización de contraseñas encriptadas, no me funcionaba el login, solucionado!

/* Desactivar el Safe Update Mode Temporalmente 
SET SQL_SAFE_UPDATES = 0;


/* Reemplazar las contraseñas encriptadas
UPDATE operadores SET contrasena = '$2y$10$7Z8WlXeFG6ZTLgb8s82Giejiqx60u3Rv79L5D2Dma.wRwr5H75Lkm' WHERE cargo = 'SUPER ADMINISTRADOR';
UPDATE operadores SET contrasena = '$2y$10$4v1Xa1gYxZk1Gk5CEUu5H.OFghJ0/lhbd7sgFfYQoE3Zka2W5pWWu' WHERE cargo = 'CONTADOR';

/* Activar el Safe Update Mode
SET SQL_SAFE_UPDATES = 1;

*/

/* Creamos la tabla de clientes del casino */
CREATE TABLE clientes (
    id_cliente INT(11) NOT NULL AUTO_INCREMENT,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo_documento VARCHAR(2) NOT NULL,
    numero_documento VARCHAR(20) NOT NULL,
    fecha_expedicion DATE NOT NULL,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    lugar_expedicion VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    telefono_movil VARCHAR(20) NOT NULL,
    user_pass VARCHAR(255) NOT NULL, /* contraseña para no crear conflicto con la tabla operadores */
    fecha_nacimiento DATE NOT NULL,
    genero CHAR(1) NOT NULL,
    nacionalidad VARCHAR(2) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    interdicto ENUM('yes', 'no') NOT NULL,
    pep ENUM('yes', 'no') NOT NULL,
    consentimiento_datos BOOLEAN NOT NULL,
    comunicaciones_comerciales BOOLEAN NOT NULL,
    terminos_condiciones BOOLEAN NOT NULL,
    captcha BOOLEAN NOT NULL,
    PRIMARY KEY (id_cliente)
);

/*
Ya hice el html con el formulario funcional que me registra los clientes y los registra con php
en la DB pero requiero comprobar los datos registrados para probar el customer_login

USE casinolafortuna;

SELECT * FROM clientes;

SELECT correo_electronico, user_pass FROM clientes;

*/

/* Creacion de la tabla máquinas tragamonedas */
CREATE TABLE maquinas_tragamonedas (
  id_maquina INT(11) NOT NULL AUTO_INCREMENT,
  operador_asignado INT(11),
  seccion INT(11),
  serie VARCHAR(20) NOT NULL,
  descripcion VARCHAR(20),
  denominacion INT(11) NOT NULL,
  estado TINYINT(4) NULL,
  ultimo_mantenimiento DATE NULL,
  PRIMARY KEY (id_maquina),
  FOREIGN KEY (operador_asignado) REFERENCES operadores(id_operador),
  FOREIGN KEY (seccion) REFERENCES secciones(id_seccion)
);

/* Relacion de los clientes con las maquinas */
CREATE TABLE registro_jugadores_maquinas (
  id_registro INT(11) NOT NULL AUTO_INCREMENT,
  operador INT(11) NOT NULL,
  cliente INT(11) NOT NULL,
  maquina INT(11) NOT NULL,
  fecha_registro DATE NOT NULL,
  PRIMARY KEY (id_registro),
  FOREIGN KEY (operador) REFERENCES operadores(id_operador),
  FOREIGN KEY (cliente) REFERENCES clientes(id_cliente),
  FOREIGN KEY (maquina) REFERENCES maquinas_tragamonedas(id_maquina)
);

CREATE TABLE recaudo_maquinas (
  id_recaudo INT(11) NOT NULL AUTO_INCREMENT,
  maquina_numero INT(11) NOT NULL,
  fecha_registro DATE NOT NULL,
  coin_in INT(11) NOT NULL,
  coin_out INT(11) NOT NULL,
  jackpot INT(11) NOT NULL,
  yield INT(11) GENERATED ALWAYS AS (coin_in - coin_out - jackpot) STORED,
  PRIMARY KEY (id_recaudo),
  FOREIGN KEY (maquina_numero) REFERENCES maquinas_tragamonedas(id_maquina)
);

CREATE TABLE juegos_online (
  id_juego INT(11) NOT NULL AUTO_INCREMENT,
  operador_asignado INT(11) NOT NULL,
  seccion INT(11) NOT NULL,
  descripcion VARCHAR(20) NOT NULL,
  denominacion INT(11) NOT NULL,
  PRIMARY KEY (id_juego),
  FOREIGN KEY (operador_asignado) REFERENCES operadores(id_operador),
  FOREIGN KEY (seccion) REFERENCES secciones(id_seccion)
);

CREATE TABLE recaudo_online (
  id_recaudo INT(11) NOT NULL AUTO_INCREMENT,
  juego_online INT(11) NOT NULL,
  fecha_registro DATE NOT NULL,
  ingresos INT(11) NOT NULL,
  egresos INT(11) NOT NULL,
  balance INT(11) GENERATED ALWAYS AS (ingresos - egresos) STORED,
  PRIMARY KEY (id_recaudo),
  FOREIGN KEY (juego_online) REFERENCES juegos_online(id_juego)
);

CREATE TABLE apuestas_deportivas (
  id_deportiva INT(11) NOT NULL AUTO_INCREMENT,
  operador_asignado INT(11) NOT NULL,
  seccion INT(11) NOT NULL,
  descripcion VARCHAR(20) NOT NULL,
  denominacion INT(11) NOT NULL,
  PRIMARY KEY (id_deportiva),
  FOREIGN KEY (operador_asignado) REFERENCES operadores(id_operador),
  FOREIGN KEY (seccion) REFERENCES secciones(id_seccion)
);

CREATE TABLE recaudo_deportivas (
  id_recaudo INT(11) NOT NULL AUTO_INCREMENT,
  deportiva INT(11) NOT NULL,
  fecha_registro DATE NOT NULL,
  ingresos INT(11) NOT NULL,
  egresos INT(11) NOT NULL,
  balance INT(11) GENERATED ALWAYS AS (ingresos - egresos) STORED,
  PRIMARY KEY (id_recaudo),
  FOREIGN KEY (deportiva) REFERENCES apuestas_deportivas(id_deportiva)
);

CREATE TABLE bonificaciones (
  id_registro INT(11) NOT NULL AUTO_INCREMENT,
  seccion INT(11) NOT NULL,
  operador_asignado INT(11) NOT NULL,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  cliente INT(11) NOT NULL,
  valor_bonificacion INT(11),
  PRIMARY KEY (id_registro),
  FOREIGN KEY (seccion) REFERENCES secciones(id_seccion),
  FOREIGN KEY (operador_asignado) REFERENCES operadores(id_operador),
  FOREIGN KEY (cliente) REFERENCES clientes(id_cliente)
);