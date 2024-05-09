-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: localhost    Database: comtec
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Computadora`
--

DROP TABLE IF EXISTS `Computadora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Computadora` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `Marca` varchar(50) NOT NULL,
  `Modelo` varchar(50) NOT NULL,
  `Numero_Serie` varchar(50) NOT NULL,
  `Host_Name` varchar(50) NOT NULL,
  `Fecha_Registro` date NOT NULL,
  `RAM` int DEFAULT NULL,
  `Tipo_Almacenamiento` varchar(50) DEFAULT NULL,
  `Capacidad_Almacenamiento` int DEFAULT NULL,
  `Procesador` varchar(50) DEFAULT NULL,
  `Estado` varchar(50) NOT NULL,
  `Departamento` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Numero_Serie` (`Numero_Serie`),
  UNIQUE KEY `Host_Name` (`Host_Name`),
  KEY `Computador_fk_Departamento` (`Departamento`),
  CONSTRAINT `Computador_fk_Departamento` FOREIGN KEY (`Departamento`) REFERENCES `Departamento` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Computadora`
--

LOCK TABLES `Computadora` WRITE;
/*!40000 ALTER TABLE `Computadora` DISABLE KEYS */;
INSERT INTO `Computadora` VALUES (1,'Lenovo','ThinkPad T410','MXL304010','LAB_001','2024-05-01',8,'SSD',500,'Intel Core i5','Activo',1),(2,'Lenovo','ThinkPad T410','MXL304011','LAB_002','2024-05-01',8,'SSD',500,'Intel Core i5','Activo',1),(3,'Lenovo','ThinkPad T410','MXL304012','LAB_003','2024-05-01',8,'SSD',500,'Intel Core i5','Activo',1),(4,'Lenovo','ThinkCentre M715','MXL331244','LAB_004','2024-05-01',16,'SSD',1000,'Intel Core i7','Activo',1),(6,'Acer','Aspire Tc-1760','ACELDHXML12','LAB_006','2024-05-01',16,'SSD',500,'Intel Core i5','Activo',1),(7,'Acer','Aspire Tc-1760','ACELDHXML15','LAB_007','2024-05-01',32,'SSD',2000,'Intel Core i5','Activo',1);
/*!40000 ALTER TABLE `Computadora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Departamento`
--

DROP TABLE IF EXISTS `Departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Departamento` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Sucursal` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Departamento_fk_Sucursal` (`Sucursal`),
  CONSTRAINT `Departamento_fk_Sucursal` FOREIGN KEY (`Sucursal`) REFERENCES `Sucursal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Departamento`
--

LOCK TABLES `Departamento` WRITE;
/*!40000 ALTER TABLE `Departamento` DISABLE KEYS */;
INSERT INTO `Departamento` VALUES (1,'Sistemas',1),(2,'Contabilidad',1),(3,'Ingresos',1);
/*!40000 ALTER TABLE `Departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mantenimiento`
--

DROP TABLE IF EXISTS `Mantenimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mantenimiento` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `Fecha` date NOT NULL,
  `Tipo` varchar(50) NOT NULL,
  `Razon` varchar(50) NOT NULL,
  `Descripcion` text NOT NULL,
  `Proximo_Mantenimiento` date DEFAULT NULL,
  `Computadora` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Mantenimiento_fk_Computadora` (`Computadora`),
  CONSTRAINT `Mantenimiento_fk_Computadora` FOREIGN KEY (`Computadora`) REFERENCES `Computadora` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mantenimiento`
--

LOCK TABLES `Mantenimiento` WRITE;
/*!40000 ALTER TABLE `Mantenimiento` DISABLE KEYS */;
INSERT INTO `Mantenimiento` VALUES (1,'2024-05-05','Preventivo','Mantenimiento programado','Limpieza general del equipo y sus componentes',NULL,7),(2,'2024-05-05','Evolutivo','Actualización de memoria RAM','Se realizó upgrade de memoria RAM de 16 a 32GB','2024-05-31',7),(3,'2024-05-05','Preventivo','Mantenimiento programado','Se realiza limpieza general del equipo a hardware y software','2024-06-06',1),(4,'2024-05-05','Evolutivo','Aumento de SSD','Se aumentó el SSD del equipo','2024-07-31',7);
/*!40000 ALTER TABLE `Mantenimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sucursal`
--

DROP TABLE IF EXISTS `Sucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sucursal` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Codigo` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Codigo` (`Codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sucursal`
--

LOCK TABLES `Sucursal` WRITE;
/*!40000 ALTER TABLE `Sucursal` DISABLE KEYS */;
INSERT INTO `Sucursal` VALUES (1,'Instituto Tecnológico de Cancún','5173'),(2,'Instituto Tecnológico de Tizimin','7174');
/*!40000 ALTER TABLE `Sucursal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Union_Usuario_Sistema_Sucursal`
--

DROP TABLE IF EXISTS `Union_Usuario_Sistema_Sucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Union_Usuario_Sistema_Sucursal` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `Usuario_Sistema` bigint NOT NULL,
  `Sucursal` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Union_Usuario_Sistema_Sucursal_fk_Usuario_Sistema` (`Usuario_Sistema`),
  KEY `Union_Usuario_Sistema_Sucursal_fk_Sucursal` (`Sucursal`),
  CONSTRAINT `Union_Usuario_Sistema_Sucursal_fk_Sucursal` FOREIGN KEY (`Sucursal`) REFERENCES `Sucursal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Union_Usuario_Sistema_Sucursal_fk_Usuario_Sistema` FOREIGN KEY (`Usuario_Sistema`) REFERENCES `Usuario_Sistema` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Union_Usuario_Sistema_Sucursal`
--

LOCK TABLES `Union_Usuario_Sistema_Sucursal` WRITE;
/*!40000 ALTER TABLE `Union_Usuario_Sistema_Sucursal` DISABLE KEYS */;
/*!40000 ALTER TABLE `Union_Usuario_Sistema_Sucursal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario_Sistema`
--

DROP TABLE IF EXISTS `Usuario_Sistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuario_Sistema` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Apellido_Paterno` varchar(50) NOT NULL,
  `Apellido_Materno` varchar(50) DEFAULT NULL,
  `Email` varchar(50) NOT NULL,
  `Contrasena` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario_Sistema`
--

LOCK TABLES `Usuario_Sistema` WRITE;
/*!40000 ALTER TABLE `Usuario_Sistema` DISABLE KEYS */;
INSERT INTO `Usuario_Sistema` VALUES (1,'Juan Carlos','Gomez','Felipe','cachorro@gmail.com','$2b$10$sqkNJ/aZGNCIjIIz2qSQqOMfvtgqTY6pyVdGKtXfEucOkg4GqoneO'),(2,'Juan Carlos','Gomez','Felipe','carlosgmz6669@gmail.com','$2b$10$gNK2pUUuhMghzA89SrJVKuS0cA1mVxSQO3FU37uw59FCbs9ZlQBTq');
/*!40000 ALTER TABLE `Usuario_Sistema` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-05 19:03:26
