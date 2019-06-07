<?php

function implement_lib($code, $check) {
      //String query de ejecución
      $query = "select script, dependencies, f_name from fingerlings where code = $code";
      //Ejecutar conexión
      $result = connection($query);
      //Tomar los valores de la consulta [función, dependencias, nombre_función]
      $script = pg_fetch_row($result);
      //Validar si el usuario no envió un tipo de validación propia a la creada
      $validate = "if(window.".$script[2]."){if(".$script[2].".name === window.".$script[2].".name){window.".$script[2]."_".$_GET['code']." = ".$script[2].";}}else{window.".$script[2]." = ".$script[2].";}";
      $validate = (isset($_GET['check']) ? $_GET['check'] : $validate); // returns true;
      //retornar la función junto con la validación
      return $script[0].$validate;
}

function search_deps($code) {
      //String query de ejecución
      $query = "select dependencies from fingerlings where code = $code";
      //Ejecutar conexión
      $result = connection($query);
      //Tomar el valor de la consulta
      $dependencies = explode(",", str_replace(["{","}"], "", pg_fetch_result($result, 0)));
      //retornar las dependecncias
      return $dependencies;
      //deps = this.responseText.replace(/[{}]/g, "").split(',');
}

function fingerlings($codes, $check) {
      /**
       * Validación para la llamada recursiva
       *    En la recursiva envía una lista con la lista de parametros
       *    por lo que se iguala a el mismo en la posición "0"
       */
      //lista de dependencias encontradas
      $temp_deps = [];
      //Recorrido de codigos para buscar dependencias
      foreach ($codes as $code) {     
            //llamada para ir a la bd a encontrar dependencias
            $deps = search_deps($code);
            //validación de dependencias
            if (count($deps) > 0) {
                  //Recorrido para que no repetir dependencias
                  foreach($deps as $dep){
                        $exist = false;
                        foreach ($codes as $d) {
                              if ($dep == $d) {
                                    $exist = true;
                                    break;
                              }
                        }
                        //Si no existen las dependencias se agregan a la lista temp_deps
                        if (!$exist && $dep != "") {
                              array_push($temp_deps, $dep);
                        }
                  }
            }
      }
      //Si existen dependencias nuevas se llama recursivo para buscar más en las nuevas dependecias
      if (count($temp_deps) > 0) {
            //Se unen la lista de codigos antigua con la nueva para no repetir dependencias
            $join = array_merge($codes, $temp_deps);
            fingerlings($join, $check);
      }
      //Cuando ya no existen más dependencias nuevas crea las funciones de la lista de codigos
      else {
            $script = "";
            foreach ($codes as $code) {
                  $script .= implement_lib($code, $check);
            }
            echo $script;
      }
}