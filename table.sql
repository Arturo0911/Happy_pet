create table employees (
	id int(11) PRIMARY KEY auto_increment,
    	ced varchar(20) not null,
    	name varchar(30) not null,
    	lname varchar(40) not null,
    	image varchar(50) not null,
    	email varchar(30) not null,
     	address varchar(50) not null,
    	phone varchar(50) not null,
    	apartment varchar(20) not null,
    	turno varchar(20) not null,
    	user varchar(20) not null,
    	password varchar(150) not null);


create table clients (

	id int(11) PRIMARY KEY auto_increment,
	ced varchar(20) not null,
	fullname varchar(30) not null,
	pet_name varchar(30) not null,
	email varchar(30) not null,
	image varchar(30) not null,
	address varchar(20) not null, 
	phone varchar(20) not null,
	motivo_visita varchar(4000) not null
);

create table horarios_visitas (

	horario_id int(11) PRIMARY KEY auto_increment,
	rango varchar(50) not null,
	disponibilidad varchar(10) default "YES"
);

create table asig_visitas (

	visita_id int(11) PRIMARY KEY auto_increment,
	ced_cliente 
	fullname 
	pet_name 
	email 
	phone 
	address 
	id_medico 
	fullname_medic 
	id_horario_visita 
	horario_visita 
	motivo_visita ,

	FOREIGN KEY(id_horario_visita) REFERENCES horarios_visitas(horario_id)


);



create table stock (
	name varchar(30) not null,
	manufacturer_name varchar(30) not null,
	tipo_alimento varchar(30) not null,
	rango_edad_mascota int,
	foto varchar(30) not null,
	descripcion varchar(400) not null,
	ingredientes_nutricion varchar(30) not null,
	proteina_cruda_min decimal(13,4),
	grasa_cruda_min decimal(13,4),
	fibra_cruda_max decimal(13,4),
	humedad_max decimal(13,4),
	cenizas_max decimal(13,4),
	calcio_min decimal(13,4),
	calcio_max decimal(13,4),
	fosforo_min decimal(13,4),
	fosforo_max decimal(13,4),
	fecha_elaboracion datetime,
	fecha_caducidad datetime
);