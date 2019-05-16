<?php
      if(isset($_GET['code'])){
            $conn_string = "host=localhost port=5432 dbname=fingerlings user=postgres password=12345";
            $dbconn = pg_connect($conn_string) or die("Error to connection with the database");
            
            $query = "select script, dependencies from fingerlings where code = '".$_GET['code']."'";
            $result = pg_query($dbconn, $query);
            if (!$result) {
                  echo NULL;
                  exit;
            }
            $script = pg_fetch_result($result, 0);
            echo $script;
      }
      else if(isset($_GET['dependencies'])){
            $conn_string = "host=localhost port=5432 dbname=fingerlings user=postgres password=12345";
            $dbconn = pg_connect($conn_string) or die("Error to connection with the database");
            
            $query = "select dependencies from fingerlings where code = '".$_GET['dependencies']."'";
            $result = pg_query($dbconn, $query);
            if (!$result) {
                  echo NULL;
                  exit;
            }
            $dependencies = pg_fetch_result($result, 0);
            echo $dependencies;
      }
      else {
            echo "The params did isn't detected";
      }
?>