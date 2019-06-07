<?php


//Tomar como un Javascript el echo del php
header('Content-Type: application/javascript');
header("Access-Control-Allow-Origin: *");
//Funcion para crear la conexión a la base de datos con un query enviado por parámetro
include 'connection.php';
include 'lings_functions.php';
//Validar que envió un código
if(isset($_GET['code'])){
      $codes = [$_GET['code']];
      if(isset($_GET['check'])){
            fingerlings($codes, $_GET['check']);
      }
      else{
            fingerlings($codes, "");
      }
}
//No detectó ningún parámetro
else {
      echo "alert(The params isn't detected);";
}
?>