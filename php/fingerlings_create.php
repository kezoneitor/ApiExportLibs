<?php
      if(isset($_POST['code']) 
      && isset($_POST['description'])
      && isset($_POST['library_name'])
      && isset($_POST['script'])
      && isset($_POST['library_user'])
      && isset($_POST['tags'])
      && isset($_POST['dependencies'])
      && isset($_POST['library_url'])
      ){
            $conn_string = "host=localhost port=5432 dbname=fingerlings user=postgres password=12345";
            $dbconn = pg_connect($conn_string) or die("Error de conexion con la base de datos");
            //conectarse por el puerto 5432 a una base de datos llamada "test" en el host "sheep" con el nombre de usuario y password

            $query = "insert into fingerlings(code, description, library_name, script, library_user, tags, dependencies, library_url) 
                        values ('".$_POST['code']."', '".$_POST['description']."', '".$_POST['library_name']."',
                                '".$_POST['script']."', '".$_POST['library_user']."', '".$_POST['tags']."',
                                '".$_POST['dependencies']."', '".$_POST['library_url']."')";
            // formato de datos >> ('1', 'test lib', 'testing', 'function(script){}', 'kezo', '{\"test\"}', '{}', 'http://fingerlings.com/')
            $result = pg_query($dbconn, $query);
            if (!$result) {
                  echo "Ocurrió un error.\n";
                  exit;
            }
      }   
?>