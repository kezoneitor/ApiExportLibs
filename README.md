ApiExportLibs


#folder library
Contiene la funci�n de crear funciones de forma din�mica(Sujeto a cambios, se aceptan sugerencias)

-> fingerlings.js:
	descripci�n: Este archivo se debe poner a la vista para que el usuario pueda descargarlo, es c�digo abierto por lo que
		    puede modificarlo a su gusto y por que no, dar sugerencias.
	Funcionalidad: Realiza 2 tipos de consultas al php por medio de "ajax" tipo GET, una de ellas es para obtener 
		    las funciones, dependencias y hasta para cambiar la funci�n de validaci�n si existe una funci�n
		    principal con el mismo nombre y la otra para crear una lista de dependencias, la cual contiene todos
		    los c�digos de funciones para ser buscados y agregados.
	Funciones
	$fingerlings(...codes)
		--Funci�n principal para realizar la b�squeda de las funciones a utilizar y las dependecias necesarios
	
	$implement_lib(code, check)
		--Esta funci�n es un apoyo para hacer la llamada por ajax al archivo .php para utilizar agregar los 
		scripts al proyecto.

	$search_deps(code)
		--Esta funci�n es un apoyo para hacer la llamada po ajax al archivo -php para crear la lista de 
		dependencias necesarios para el proyecto.
	
	Nota: Dentro del archivo se detalla mejor el funcionamiento de cada una de las funciones
	
# folder php

-> search.php: 
	descripci�n: Este archivo ya esta subido al servidor por lo que simplemente se debe de hacer la consulta.
	Funcionalidad: Recibe 2 par�metros para hacer la consulta postgresql correcta y un par�metro m�s que es esencial para el 
		     script que tiene la funci�n de importar, en nuestro caso la funci�n se llama "fingerlings".
		Par�metros
		$code: Enviar el c�digo de la funci�n a utilizar ...?code=[c�digo]
		$dependecies: Devuelve las dependecias de un c�digo ...?dependencies=[c�digo]
		$check: El usuario tiene la libertad de crear su funci�n para validar si existe una funci�n 
		       principal con el mismo nombre ...?code=[c�digo]&check=[funci�n js]
		

# folder public
Contiene el proyecto angular 7 para agregar varias funcionalidades


/**
 * Seguir agregando contenido
*/