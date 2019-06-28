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
    $script = pg_fetch_object($result);
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
} else if ($postdata = json_decode(file_get_contents("php://input"))) {
    if (
        isset($postdata->description) &&
        isset($postdata->f_name) &&
        isset($postdata->script) &&
        isset($postdata->function_user) &&
        isset($postdata->tags) &&
        isset($postdata->dependencies)
    ) {
        $tagsStr = "{" . implode(",", $postdata->tags) . "}";
        $depsStr = "{" . implode(",", $postdata->dependencies) . "}";

        $sql = "insert into fingerlings(description, script, f_name, function_user, tags, dependencies) values 
        ('$postdata->description',
        '$postdata->script',
        '$postdata->f_name',
        '$postdata->function_user',
        '$tagsStr',
        '$depsStr')";
        connection($sql) or die("false");
        echo json_encode("true");
    } else {
        echo json_encode("false");
    }
}
//No detectó ningún parámetro
else {
    echo json_encode("alert(The params did isn't detected);");
}
