create table fingerlings (
	code varchar(20) Primary Key,
	description varchar(100),
	library_name varchar(20),
	script text,
	library_user varchar(20),
	tags varchar(20) Array,
	dependencies varchar(20) Array,
	library_url varchar(100)
)

select script, dependencies from fingerlings where code = '1';

select * from fingerlings

insert into fingerlings(code, description, library_name, script, library_user, tags, dependencies, library_url) 
	values 	('2', 'Pio Calcu', 'calculadora', 'function calcular(a, b, sym){let calc;if(sym == "+"){calc = suma(a, b);}return calc;}', 'kezo', Array['math'], Array['xa'], 'url/xd'),
		('xa', 'Pio Calcu', 'calculadora', 'function suma(a, b){return a+b;}', 'kezo', Array['math'], '{}', 'url/xd')
--drop table fingerlings;
--delete from fingerlings where code = 'xa';