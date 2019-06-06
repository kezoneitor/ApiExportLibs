<?php
function connection($query){
      //String de conexión a la base de datos deseada
      $conn_string = "host=leoviquez.com port=8000 dbname=fingerlings_keslerth user=usr_keslerth password=f1ng3rl1ngs@2019";
      //$conn_string = "host=localhost port=5432 dbname=fingerlings user=postgres password=12345";
      
      
      //Conexión a la base de datos destinada en $conn_string
      $dbconn = pg_connect($conn_string) or die("Error to connection with the database");
      //Validar si se ejecutó correctamente el query
      $result = pg_query($dbconn, $query);
      if (!$result) {
            echo NULL;
            exit;
      }
      return $result;
}