<?php
//Tomar como un Javascript el echo del php
header('Content-Type: application/javascript');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//Funcion para crear la conexión a la base de datos con un query enviado por parámetro

include 'connection.php';
//Validar que envió un código
if (isset($_GET['code'])) {
    //String query de ejecución
    $query = "select * from fingerlings where code = '" . $_GET['code'] . "'";
    //Ejecutar conexión
    $result = connection($query);
    //Tomar los valores de la consulta [función, dependencias, nombre_función]
    $script = pg_fetch_row($result);
    //retornar la función junto con la validación
    echo json_encode($script);
}
//Validar que envió una dependecia
else if (isset($_GET['idToName'])) {
    //String query de ejecución
    $query = "select f_name from fingerlings where code = '" . $_GET['idToName'] . "'";
    //Ejecutar conexión
    $result = connection($query);
    //Tomar el valor de la consulta
    $dependencies = pg_fetch_result($result, 0);
    //retornar las dependecncias
    echo json_encode($dependencies);
}
//No detectó ningún parámetro
else {
    echo "alert(The params did isn't detected);";
}
