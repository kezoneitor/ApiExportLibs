'use strict'

/**
 * 
 * @param {codigo para agregar código} code
 * @description 
 * Llamada ajax async, el onreadystatechange verifica que allá 
 * llegado texto(verificar que sea codigo js) y crea una etiqueta script con el código dentro 
 * y lo agrega al head y si no existe lo crea para agregar el script
 */
function implement_lib(code) {
      let xhttp = new XMLHttpRequest();
      xhttp.open("GET", `http://localhost/fingerlings_search.php?code=${code}`, true);
      xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                  if (this.responseText != "") {
                        var script = document.createElement("script");
                        script.innerHTML = this.responseText;
                        if (document.getElementsByTagName("head") != undefined) {
                              document.getElementsByTagName("head")[0].appendChild(script);
                        } else {
                              document.createElement("head").appendChild(script);
                        }
                  } else {
                        console.log(`library ${code} isn't exist`);
                  }
            }
      };
      xhttp.send();
}
/**
 *
 * @param {string} code
 * @description
 * Llamada ajax secuencial, el onreadystatechange verifica que allá
 * llegado texto(verificar que sea codigo js) y convierte el string en una lista
 * para retornarla a la función que fue llamada
 *  
 */
function search_deps(code) {
      var deps;
      let xhttp = new XMLHttpRequest();
      xhttp.open("GET", `http://localhost/fingerlings_search.php?dependencies=${code}`, false);
      xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                  if (this.responseText != "" && this.responseText != "{}") {
                        deps = this.responseText.replace(/[{}]/g, "").split(',');
                  }
                  else {
                        deps = [];
                  }
            }
      };
      xhttp.send();
      return deps;
}

/**
 * 
 * @param  {...any} codes 
 * @description
 * Busca todas las dependencias para crear una lista de códigos
 * los cuales se ejecutan para ser creados en la página
 */
function fingerlings(...codes) {
      /**
       * Validación para la llamada recursiva
       *    En la recursiva envía una lista con la lista de parametros
       *    por lo que se iguala a el mismo en la posición "0"
       */
      if(typeof codes[0] == 'object'){
            codes = codes[0];
      }
      //lista de dependencias encontradas
      let temp_deps = [];
      //Recorrido de codigos para buscar dependencias
      for (let code of codes) {
            //llamada para ir a la bd a encontrar dependencias
            let deps = search_deps(code);
            //validación de dependencias
            if (deps.length > 0) {
                  //Recorrido para que no repetir dependencias
                  deps.forEach(dep => {
                        let exist = false;
                        for (let d of codes) {
                              if (dep == d) {
                                    exist = true;
                                    break;
                              }
                        }
                        //Si no existen las dependencias se agregan a la lista temp_deps
                        if (!exist) {
                              temp_deps.push(dep);
                        }
                  });
            }
      }
      //Si existen dependencias nuevas se llama recursivo para buscar más en las nuevas dependecias
      if (temp_deps.length > 0) {
            //Se unen la lista de codigos antigua con la nueva para no repetir dependencias
            let join = codes.concat(temp_deps);
            fingerlings(join);
      }
      //Cuando ya no existen más dependencias nuevas crea las funciones de la lista de codigos
      else {
            codes.forEach(code => {
                  implement_lib(code);
            });        
      }
}