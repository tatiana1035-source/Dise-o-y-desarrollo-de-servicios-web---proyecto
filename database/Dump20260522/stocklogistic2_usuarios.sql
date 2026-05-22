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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `clave` varchar(355) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Usuario Actualizado','actualizado@correo.com','lider','$2b$10$SOa0bLVr9FzxNVRxqS4fr.0DUdzlAcZJylvLsC85vsfn/d/NBwdti'),(6,'Usuario Actualizado','usuario1@prueba.com','auxiliar','$2b$10$sGyMV4lU/zt6zQiqTGSx..Z486keLwlY8V90hl.6hevtTkdf8rK7m'),(7,'Usuario Test','test_jest@correo.com','auxiliar','$2b$10$CxScFHlCnI.RhRmnoZCRYOg4mhusfSnf6Ws3HXUy4pNlDqbui95FC'),(9,'Usuario Test','test_jest43@correo.com','auxiliar','$2b$10$XyGPfzzjN5znKgpkz2lY4ubL7kl2Ny4h/NegVOqQ7nl728OuRKeSG'),(11,'Usuario Test','test_jest67@correo.com','auxiliar','$2b$10$idRTH.kyHS0ArRhXEyn/f.U18tH.LKy80SOe2xvg4RQ6yvvOBXyaG'),(12,'Usuario Test','test_jest97@correo.com','auxiliar','$2b$10$2ImwpT89l1VgMgbNhRhVC.x.ulhfhLv8jDygJOLMhIprmsXBuXbcS'),(14,'Usuario Test','test_jest99@correo.com','auxiliar','$2b$10$QfjViy2/GqEJt28CEAhJ.eJQhpnjbdOvHoViz8ryQXI7kV3WuTE/W');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-22  7:32:34
