--Tabla de usuarios
create table users (
	user_name varchar(20) Primary key,
	user_password varchar(50),
	user_email varchar(50) unique
);
--tabla de funciones
create table fingerlings (
	code varchar(20) Primary Key,
	description varchar(100),
	f_name varchar(20),
	script text,
	function_user varchar(20) References users(user_name),
	tags varchar(20) Array,
	dependencies varchar(20) Array
);
--Posible tabla de versiones(se debe adaptar aun)

--Contrasena de usuario usr_keslerth
ALTER USER usr_keslerth WITH PASSWORD 'f1ng3rl1ngs@2019';

select * from fingerlings

select script, dependencies from fingerlings where code = '1';

select script from fingerlings where function_user = (select user_name from users where user_name =  'kezo') 

insert into users values ('kezo', md5('12345'), 'keslerth.c@gmail.com')

insert into fingerlings(code, description, f_name, script, function_user, tags, dependencies) 
	values 	('2', 'Pio Calcu', 'calcular', 'function calcular(a, b, sym){let calc;if(sym == "+"){calc = suma(a, b);}return calc;}', 'kezo', Array['math'], Array['xa']),
		('xa', 'Pio Calcu', 'suma', 'function suma(a, b){return a+b;}', 'kezo', Array['math'], null)

drop table fingerlings;
drop table users;
--delete from fingerlings where code = 'xa';