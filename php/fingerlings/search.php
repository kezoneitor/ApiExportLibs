<?php
      //Tomar como un Javascript el echo del php
      header('Content-Type: application/javascript');
      //Funcion para crear la conexión a la base de datos con un query enviado por parámetro
      function connection($query){
            //String de conexión a la base de datos deseada
            $conn_string = "host=leoviquez.com port=8000 dbname=fingerlings_keslerth user=usr_keslerth password=f1ng3rl1ngs@2019";
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
      //Validar que envió un código
      if(isset($_GET['code'])){
            //String query de ejecución
            $query = "select script, dependencies, f_name from fingerlings where code = '".$_GET['code']."'";
            //Ejecutar conexión
            $result = connection($query);
            //Tomar los valores de la consulta [función, dependencias, nombre_función]
            $script = pg_fetch_row($result);
            //Validar si el usuario no envió un tipo de validación propia a la creada
            $validate = "if(window.".$script[2]."){if(".$script[2].".name === window.".$script[2].".name){window.".$script[2]."_".$_GET['code']." = ".$script[2].";}}else{window.".$script[2]." = ".$script[2].";}";
            $validate = (isset($_GET['check']) ? $_GET['check'] : $validate); // returns true;
            //retornar la función junto con la validación
            echo $script[0];
            echo $validate;
      }
      //Validar que envió una dependecia
      else if(isset($_GET['dependencies'])){
            //String query de ejecución
            $query = "select dependencies from fingerlings where code = '".$_GET['dependencies']."'";
            //Ejecutar conexión
            $result = connection($query);
            //Tomar el valor de la consulta
            $dependencies = pg_fetch_result($result, 0);
            //retornar las dependecncias
            echo $dependencies;
      }
      //No detectó ningún parámetro
      else {
            echo "alert(The params did isn't detected);";
      }
?>