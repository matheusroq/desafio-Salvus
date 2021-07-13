create database apiDesafio;

create table usuarios(
	id int auto_increment primary key,
	nome varchar(50),
    email varchar(150) unique,
    senha varchar(50),
    nascimento date,
    telefone varchar(20),
    cpf varchar(14),
    genero char(1)
);
create table dadosProfissional(
	id int auto_increment primary key,
	profissao varchar(50),
    numero_registro varchar(14),
    especialidade varchar(50),
    localidade varchar(50),
    area_atendimento float(8, 2),
    usuario_id int,
    foreign key (usuario_id) references usuarios (id) on delete cascade on update cascade
);
