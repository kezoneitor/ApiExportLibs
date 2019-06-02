<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//Funcion para crear la conexión a la base de datos con un query enviado por parámetro
function connection(){
    //String de conexión a la base de datos deseada
    $conn_string = "host=leoviquez.com port=8000 dbname=fingerlings_keslerth user=usr_keslerth password=f1ng3rl1ngs@2019";

    //Conexión a la base de datos destinada en $conn_string
    $dbconn = pg_connect($conn_string) or die("Error to connection with the database");
    
    return $dbconn;
} 

$conn = connection();

?>