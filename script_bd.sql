--Tabla de usuarios
create table users (
	uid varchar(50) Primary key,
	email varchar(50),
	displayName varchar(30),
	photoURL text
);
--tabla de funciones
create table fingerlings (
	code varchar(20) Primary Key,
	description varchar(100),
	f_name varchar(20),
	script text,
	function_user varchar(50) References users(uid),
	tags varchar(20) Array,
	dependencies varchar(20) Array
);
--Posible tabla de versiones(se debe adaptar aun)

--Contrasena de usuario usr_keslerth
ALTER USER usr_keslerth WITH PASSWORD 'f1ng3rl1ngs@2019';

select fingerlings.*, users.displayName from fingerlings inner join users on fingerlings.function_user = users.uid
SELECT
   A.pka,
   A.c1,
   B.pkb,
   B.c2
FROM
   A
INNER JOIN B ON A .pka = B.fka;

select script, dependencies from fingerlings where code = '1';

select script from fingerlings where function_user = (select user_name from users where user_name =  'kezo') 



insert into users values ('ppuvvNOG27UvG1zK7T7dATZpSR12', 'keslerthc@gmail.com', 'Keslerth Calderón', 'https://lh4.googleusercontent.com/-9HyE2DbCZ3U/AAAAAAAAAAI/AAAAAAAAX1s/suRd8dt9bwE/photo.jpg');

insert into fingerlings(code, description, f_name, script, function_user, tags, dependencies) 
	values 	('2', 'Pio Calcu', 'calcular', 'function calcular(a, b, sym){let calc;if(sym == "+"){calc = suma(a, b);}return calc;}', 'ppuvvNOG27UvG1zK7T7dATZpSR12', Array['math'], Array['xa']),
		('xa', 'Pio Calcu', 'suma', 'function suma(a, b){return a+b;}', 'ppuvvNOG27UvG1zK7T7dATZpSR12', Array['math'], null);

drop table fingerlings;
drop table users;
--delete from fingerlings where code = 'xa';