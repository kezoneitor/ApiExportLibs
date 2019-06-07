ApiExportLibs


#folder library
Contiene la función de crear funciones de forma dinámica(Sujeto a cambios, se aceptan sugerencias)

-> fingerlings.js:
	descripción: Este archivo se debe poner a la vista para que el usuario pueda descargarlo, es código abierto por lo que
		    puede modificarlo a su gusto y por que no, dar sugerencias.
	Funcionalidad: Realiza 2 tipos de consultas al php por medio de "ajax" tipo GET, una de ellas es para obtener 
		    las funciones, dependencias y hasta para cambiar la función de validación si existe una función
		    principal con el mismo nombre y la otra para crear una lista de dependencias, la cual contiene todos
		    los códigos de funciones para ser buscados y agregados.
	Funciones
	$fingerlings(...codes)
		--Función principal para realizar la búsqueda de las funciones a utilizar y las dependecias necesarios
	
	$implement_lib(code, check)
		--Esta función es un apoyo para hacer la llamada por ajax al archivo .php para utilizar agregar los 
		scripts al proyecto.

	$search_deps(code)
		--Esta función es un apoyo para hacer la llamada po ajax al archivo -php para crear la lista de 
		dependencias necesarios para el proyecto.
	
	Nota: Dentro del archivo se detalla mejor el funcionamiento de cada una de las funciones
	
# folder php

-> search.php: 
	descripción: Este archivo ya esta subido al servidor por lo que simplemente se debe de hacer la consulta.
	Funcionalidad: Recibe 2 parámetros para hacer la consulta postgresql correcta y un parámetro más que es esencial para el 
		     script que tiene la función de importar, en nuestro caso la función se llama "fingerlings".
		Parámetros
		$code: Enviar el código de la función a utilizar ...?code=[código]
		$dependecies: Devuelve las dependecias de un código ...?dependencies=[código]
		$check: El usuario tiene la libertad de crear su función para validar si existe una función 
		       principal con el mismo nombre ...?code=[código]&check=[función js]
		

# folder public
Contiene el proyecto angular 7 para agregar varias funcionalidades


/**
 * Seguir agregando contenido
*/