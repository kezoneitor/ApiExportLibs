<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


//Funcion para crear la conexión a la base de datos con un query enviado por parámetro
include 'connection.php';
//String query de ejecución
$query = "";
if (isset($_GET['idUser'])){
    if(isset($_GET['lim']) && isset($_GET['i'])){
        $query = "select fingerlings.*, users.displayName, users.photourl from fingerlings inner join users on fingerlings.function_user = users.uid where users.uid = '" . $_GET['idUser'] . "' limit ".$_GET['lim']." offset ".$_GET['i']." ";
    }
    else{
        $query = "select fingerlings.*, users.displayName, users.photourl from fingerlings inner join users on fingerlings.function_user = users.uid where users.uid = '" . $_GET['idUser'] . "'";
    }
}
else{
    if(isset($_GET['lim']) && isset($_GET['i'])){
        $query = "select fingerlings.*, users.displayName, users.photourl from fingerlings inner join users on fingerlings.function_user = users.uid limit ".$_GET['lim']." offset ".$_GET['i']." ";
    }
    else{
        $query = "select fingerlings.*, users.displayName, users.photourl from fingerlings inner join users on fingerlings.function_user = users.uid";
    }
}
//Ejecutar conexión
$result = connection($query);
//Tomar los valores de la consulta [función, dependencias, nombre_función]
$script = pg_fetch_all($result);
//Validar si el usuario no envió un tipo de validación propia a la creada
echo json_encode($script ? $script : []);
