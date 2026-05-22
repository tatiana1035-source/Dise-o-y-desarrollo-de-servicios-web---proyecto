-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: stocklogistic2
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `precio` decimal(12,2) NOT NULL,
  `cantidad` int NOT NULL DEFAULT '0',
  `stock_minimo` int NOT NULL,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `activo` bit(1) NOT NULL,
  `codigo_producto` varchar(50) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `id_categoria` bigint NOT NULL,
  `id_proveedor` bigint DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `UKprg65xyo6blunyqxq80xaqhlo` (`codigo_producto`),
  KEY `FK50x010ajy2p47hgwnrjhp37sn` (`id_proveedor`),
  CONSTRAINT `FK50x010ajy2p47hgwnrjhp37sn` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (5,'Salsa de tomate * 5000 g ',56.00,439,5000,'2026-03-15 00:00:00.000000',_binary '\0','PRD001',NULL,0,NULL),(6,'Salsa de tomate shefrut 1000 g',11.20,990,3000,'2026-03-15 00:00:00.000000',_binary '\0',NULL,NULL,0,NULL),(8,'Salsa showy ajo zafran * 1000 g',17.00,1500,2000,'2026-03-15 00:00:00.000000',_binary '\0',NULL,NULL,0,NULL),(9,'Salsa inglesa aderezos*1050g',11.70,457,590,'2026-03-22 00:00:00.000000',_binary '\0',NULL,NULL,0,NULL),(10,'Carne de hamburguesa de toto * 500 G',17.90,590,1000,'2026-03-22 00:00:00.000000',_binary '\0',NULL,NULL,0,NULL),(12,'salsa de chocolate shefrut * 1000 g',11.90,56,5,'2026-03-29 18:56:58.963465',_binary '','100','',1,1),(13,'salsa de chicle shefrtut * 500 g',11.00,378,5,'2026-03-29 20:59:13.030989',_binary '\0','67','',1,1),(14,'hamburguesa toto * 900 g',45.00,1600,5,'2026-03-29 21:46:17.872839',_binary '','11','',3,1),(15,'Salchicha long Zenu * cuarenta unidades paquete doble ',47.00,678,5,'2026-03-29 23:50:01.104954',_binary '\0','','',4,NULL),(16,'Portacomidas kangupor c1',15.90,2500,5,'2026-03-30 00:22:57.157441',_binary '','114','',3,1),(23,'Producto Test',1000.00,10,2,'2026-01-01 00:00:00.000000',_binary '','TEST001','Producto de prueba',1,1),(27,'Producto Test',1000.00,10,2,'2026-01-01 00:00:00.000000',_binary '','TEST002','Producto de prueba',1,1),(29,'Producto Test',1000.00,10,2,'2026-01-01 00:00:00.000000',_binary '','TEST003','Producto de prueba',1,1),(31,'Producto Test',1000.00,10,2,'2026-01-01 00:00:00.000000',_binary '','TEST004','Producto de prueba',1,1),(32,'Producto Test',1000.00,10,2,'2026-01-01 00:00:00.000000',_binary '','TEST005','Producto de prueba',1,1),(33,'Producto Test',1000.00,10,2,'2026-01-01 00:00:00.000000',_binary '','TEST006','Producto de prueba',1,1),(35,'Producto Test',1000.00,10,2,'2026-01-01 00:00:00.000000',_binary '','TEST007','Producto de prueba',1,1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-22  7:32:47
