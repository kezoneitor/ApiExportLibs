<?php

require 'database.php';

      $lings = [];

      // Función para prepara la consulta de búsqueda, con base a la categoría y los parámetros
      function prepararConsulta($category, $parameters){
     
            //$equal = " = ";
            $equal = " ~ ";; // Para comparar sin importar mayúsculas y minúsculas 
            $OR = " OR ";
            $query = "";

            //echo "<br>"; //* Esto es un salto de linea
            $parameters_ar = explode(' ', $parameters); // Convierto los parámetros

            if(strcmp($category, 'tags') == 0){ // Si se busca por tags

              //    echo("Buscar en tags");

                  foreach ($parameters_ar as $key => $value) {
                        
                        //echo(strlen($value));
                        
                        if (strlen($value) > 0) { // Construyo el siguiente formato para la consulta
                              //                     'valor'         ILIKE     ANY(tags)          OR
                              $query = $query . "UPPER(ARRAY_TO_STRING(".$category.", '||'))" .$equal . "'". $value . "'" . $OR . "LOWER(ARRAY_TO_STRING(".$category.", '||'))" .$equal . "'". $value . "'" . $OR;
                              //echo($value);
                              //echo("<br>");
                        }

                  }

//                  echo($query);
  //                echo("<br>");
            }
            else {

                  foreach ($parameters_ar as $key => $value) { // Si se busca por el resto de opciones
                        
                        //echo(strlen($value));
                        
                        if (strlen($value) > 0) {// Construyo el siguiente formato para la consulta
                              //                categoria = ' valor '
                              $query = $query . $category . $equal . "'" . $value . "'" . $OR;
                              //echo($value);
                              //echo("<br>");
                        }

                  }
            }

     //       echo($query);
       //     echo("<br>");
            // Remuevo la cadena extra OR que se concatena al final
            $i = strlen($query)-4;
            $query = substr_replace($query, '', $i, 4);
 //           echo($query);
   //         echo("<br>");
            return $query;
      } 

      if(isset($_GET['category']) && isset($_GET['parameters'])){
            
            // Se prepara la consulta en base a la categoría y los parámetros
            $query = prepararConsulta($_GET['category'],$_GET['parameters']);
            
            $sql="select * from fingerlings where ". $query;    // Se realiza la consulta respectiva
            //$sql = "select * from fingerlings where code = '2'";
            $result=pg_query($conn,$sql);

            $i = 0;

            while ($row=pg_fetch_row($result))
            {     
                  /*
                  echo("Funcion # ". '<br/>');
                  echo ("code : ". $row[0].'<br />');
                  echo ("description : ".$row[1].'<br />');
                  echo ("f_name : ".$row[2].'<br />');
                  echo ("script : ".$row[3].'<br />');
                  echo ("f_user : ".$row[4].'<br />');
                  echo ("tags : ".$row[5].'<br />');
                  echo ("dependencies : ".$row[6].'<br />');
                  echo('<br/>');*/

                  $lings[$i]['code']    = $row[0];
                  $lings[$i]['description'] = $row[1];
                  $lings[$i]['f_name'] = $row[2];
                  $lings[$i]['script'] = $row[3];
                  $lings[$i]['f_user'] = $row[4];
                  $lings[$i]['f_tags'] = $row[5];
                  $lings[$i]['dependencies'] = $row[6];
                  $i++;

            }

            echo json_encode($lings);

      }
      else
      {
        http_response_code(404);
      }
      
      

?>