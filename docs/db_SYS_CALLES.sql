CREATE TABLE `REGION` (
  `id_region` int,
  `nombre_region` varchar(255)
);

CREATE TABLE `PROVINCIA` (
  `id_provincia` int,
  `nombre_provincia` varchar(255),
  `region_fk` int
);

CREATE TABLE `CIUDAD` (
  `id_ciudad` int,
  `nombre_ciudad` varchar(255),
  `provincia_fk` int
);

CREATE TABLE `CALLE` (
  `id_calle` int PRIMARY KEY AUTO_INCREMENT,
  `nombre_calle` varchar(255),
  `ciudad_fk` int,
  `region_fk` int,
  `provincia_fk` int
);

ALTER TABLE REGION ADD PRIMARY KEY (id_region);
ALTER TABLE `PROVINCIA` ADD FOREIGN KEY (`region_fk`) REFERENCES `REGION` (`id_region`);
ALTER TABLE PROVINCIA ADD PRIMARY KEY (id_provincia);
ALTER TABLE `CIUDAD` ADD FOREIGN KEY (`provincia_fk`) REFERENCES `PROVINCIA` (`id_provincia`);
ALTER TABLE CIUDAD ADD PRIMARY KEY (id_ciudad);
ALTER TABLE `CALLE` ADD FOREIGN KEY (`ciudad_fk`) REFERENCES `CIUDAD` (`id_ciudad`);
ALTER TABLE `CALLE` ADD FOREIGN KEY (`region_fk`) REFERENCES `REGION` (`id_region`);
ALTER TABLE `CALLE` ADD FOREIGN KEY (`provincia_fk`) REFERENCES `PROVINCIA` (`id_provincia`);


# REGION METROPOLITANA
INSERT INTO REGION(id_region,nombre_region)
VALUES (1,"Región Metropolitana de Santiago");

## PROVINCIA DE SANTIAGO
INSERT INTO PROVINCIA(id_provincia,nombre_provincia,region_fk)
VALUES (1,"Provincia de Santiago",1);

## PROVINCIA DE CHACABUCO
INSERT INTO PROVINCIA(id_provincia,nombre_provincia,region_fk)
VALUES (2,"Provincia de Chacabuco",1);

### CIUDAD MAIPU
INSERT INTO CIUDAD(id_ciudad,nombre_ciudad,provincia_fk)
VALUES (1,"MAIPU",1);

### CIUDAD QUINTA NORMAL
INSERT INTO CIUDAD(id_ciudad,nombre_ciudad,provincia_fk)
VALUES (2,"QUINTA NORMAL",1);

### CIUDAD LAMPA
INSERT INTO CIUDAD(id_ciudad,nombre_ciudad,provincia_fk)
VALUES (3,"LAMPA",2);

### CIUDAD COLINA
INSERT INTO CIUDAD(id_ciudad,nombre_ciudad,provincia_fk)
VALUES (4,"COLINA",2);

### CIUDAD TIL-TIL
INSERT INTO CIUDAD(id_ciudad,nombre_ciudad,provincia_fk)
VALUES (5,"Tiltil",2);


###########################################################################

#2REGION DEl BIO-BIO
INSERT INTO REGION(id_region,nombre_region)
VALUES (2,"Región del Bio-bio");

##PROVINCIA DE ARAUCO
INSERT INTO PROVINCIA(id_provincia,nombre_provincia,region_fk)
VALUES (3,"Provincia de Arauco",2);

##PROVINCIA DE CONCEPCION 

INSERT INTO PROVINCIA(id_provincia,nombre_provincia,region_fk)
VALUES (4,"Provincia de Concepcion",2);

### CIUDAD LEBU
INSERT INTO CIUDAD(id_ciudad,nombre_ciudad,provincia_fk)
VALUES (6,"LEBU",3);

### CIUDAD TIRUA
INSERT INTO CIUDAD(id_ciudad,nombre_ciudad,provincia_fk)
VALUES (7,"TIRUA",3);

### CIUDAD HUALPEN
INSERT INTO CIUDAD(id_ciudad,nombre_ciudad,provincia_fk)
VALUES (8,"HUALPEN",4);

### CIUDAD PENCO
INSERT INTO CIUDAD(id_ciudad,nombre_ciudad,provincia_fk)
VALUES (9,"PENCO",4);




