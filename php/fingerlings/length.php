<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


//Funcion para crear la conexión a la base de datos con un query enviado por parámetro
include 'connection.php';
//String query de ejecución
$query = "";
if(isset($_GET['UserID'])){
      $query = "select count(*) from fingerlings where function_user = '".$_GET['UserID']."'";
}
else {
      $query = "select count(*) from fingerlings";
}
//Ejecutar conexión
$result = connection($query);
//Tomar los valores de la consulta [función, dependencias, nombre_función]
$length = pg_fetch_result($result, 0);
//Validar si el usuario no envió un tipo de validación propia a la creada
echo intval(($length ? $length : 0));