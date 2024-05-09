CREATE DATABASE IF NOT EXISTS comtec;

USE comtec;

CREATE TABLE IF NOT EXISTS Sucursal(
    id BIGINT AUTO_INCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Codigo VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Usuario_Sistema(
    id BIGINT AUTO_INCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Apellido_Paterno VARCHAR(50) NOT NULL,
    Apellido_Materno VARCHAR(50),
    Email VARCHAR(50) NOT NULL UNIQUE,
    Contrasena VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE IF NOT EXISTS Union_Usuario_Sistema_Sucursal(
    id BIGINT AUTO_INCREMENT,
    Usuario_Sistema BIGINT NOT NULL,
    Sucursal BIGINT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT Union_Usuario_Sistema_Sucursal_fk_Usuario_Sistema
    FOREIGN KEY(Usuario_Sistema) REFERENCES Usuario_Sistema(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT Union_Usuario_Sistema_Sucursal_fk_Sucursal
    FOREIGN KEY(Sucursal) REFERENCES Sucursal(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Departamento(
    id BIGINT AUTO_INCREMENT,
    Nombre VARCHAR(50) NOT NULL,
    Sucursal BIGINT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT Departamento_fk_Sucursal
    FOREIGN KEY(Sucursal) REFERENCES Sucursal(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Computadora(
    id BIGINT AUTO_INCREMENT,
    Marca VARCHAR(50) NOT NULL,
    Modelo VARCHAR(50) NOT NULL,
    Numero_Serie VARCHAR(50) NOT NULL UNIQUE,
    Host_Name VARCHAR(50) NOT NULL UNIQUE,
    Fecha_Registro DATE NOT NULL,
    RAM INT,
    Tipo_Almacenamiento VARCHAR(50),
    Capacidad_Almacenamiento INT,
    Procesador VARCHAR(50),
    Estado VARCHAR(50) NOT NULL,
    Departamento BIGINT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT Computador_fk_Departamento
    FOREIGN KEY(Departamento) REFERENCES Departamento(id) ON UPDATE CASCADE ON DELETE RESTRICT
);