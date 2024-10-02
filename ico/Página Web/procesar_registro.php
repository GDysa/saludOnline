<?php
$archivo = 'registros.txt';

$nombre = $_POST['nombre'];
$direccion = $_POST['direccion'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];

if (!empty($nombre) && !empty($direccion) && !empty($telefono) && !empty($correo)) {
    $contenido = "Nombre: $nombre\nDirección: $direccion\nTeléfono: $telefono\nCorreo Electrónico: $correo\n\n";
    file_put_contents($archivo, $contenido, FILE_APPEND);
    echo "Registro exitoso";
} else {
    echo "Por favor, complete todos los campos.";
}
?>
