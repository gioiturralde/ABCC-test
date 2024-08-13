-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para tienda
CREATE DATABASE IF NOT EXISTS `tienda` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tienda`;

-- Volcando estructura para procedimiento tienda.ActualizarArticulo
DELIMITER //
CREATE PROCEDURE `ActualizarArticulo`(
    IN p_sku CHAR(6),
    IN p_articulo VARCHAR(15),
    IN p_marca VARCHAR(15),
    IN p_modelo VARCHAR(20),
    IN p_departamento CHAR(1),
    IN p_clase CHAR(2),
    IN p_familia CHAR(3),
    IN p_stock INT,
    IN p_cantidad INT,
    IN p_descontinuado CHAR(1)
)
BEGIN
    UPDATE articulos
    SET 
        articulo = p_articulo,
        marca = p_marca,
        modelo = p_modelo,
        departamento = p_departamento,
        clase = p_clase,
        familia = p_familia,
        stock = p_stock,
        cantidad = p_cantidad,
        descontinuado = p_descontinuado
    WHERE sku = p_sku;
END//
DELIMITER ;

-- Volcando estructura para tabla tienda.articulos
CREATE TABLE IF NOT EXISTS `articulos` (
  `sku` char(6) NOT NULL,
  `articulo` varchar(15) DEFAULT NULL,
  `marca` varchar(15) DEFAULT NULL,
  `modelo` varchar(20) DEFAULT NULL,
  `departamento` char(1) DEFAULT NULL,
  `clase` char(2) DEFAULT NULL,
  `familia` char(3) DEFAULT NULL,
  `fecha_alta` date DEFAULT NULL,
  `stock` char(9) DEFAULT NULL,
  `cantidad` char(9) DEFAULT NULL,
  `descontinuado` char(1) DEFAULT NULL,
  `fecha_baja` date DEFAULT NULL,
  PRIMARY KEY (`sku`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla tienda.articulos: ~2 rows (aproximadamente)
INSERT INTO `articulos` (`sku`, `articulo`, `marca`, `modelo`, `departamento`, `clase`, `familia`, `fecha_alta`, `stock`, `cantidad`, `descontinuado`, `fecha_baja`) VALUES
	('1', 'tele', 'tele', '15', '2', '5', '10', '2024-08-12', '4', '4', '1', '2024-08-12'),
	('3', 'pantalla', 'eeee', 'eeee', '3', '7', '18', '2024-08-12', '4', '2', '0', '1900-01-01'),
	('4', 'radio', 'lg', '1414', '1', '1', '1', '2024-08-12', '4', '3', '0', '1900-01-01');

-- Volcando estructura para tabla tienda.clases
CREATE TABLE IF NOT EXISTS `clases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `departamento_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `departamento_id` (`departamento_id`),
  CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`departamento_id`) REFERENCES `departamentos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla tienda.clases: ~11 rows (aproximadamente)
INSERT INTO `clases` (`id`, `nombre`, `departamento_id`) VALUES
	(1, 'COMESTIBLES', 1),
	(2, 'LICUADORAS', 1),
	(3, 'BATIDORAS', 1),
	(4, 'CAFETERAS', 1),
	(5, 'AMPLIFICADORES CAR AUDIO', 2),
	(6, 'AUTO ESTEREOS', 2),
	(7, 'COLCHON', 3),
	(8, 'JUEGO BOX', 3),
	(9, 'SALAS', 4),
	(10, 'COMPLEMENTOS PARA SALA', 4),
	(11, 'SOFAS CAMA', 4);

-- Volcando estructura para procedimiento tienda.ConsultarArticulo
DELIMITER //
CREATE PROCEDURE `ConsultarArticulo`(
    IN p_sku CHAR(6)
)
BEGIN
    SELECT
        sku, 
        articulo, 
        marca, 
        modelo, 
        departamento, 
        clase, 
        familia, 
        fecha_alta, 
        stock, 
        cantidad, 
        descontinuado, 
        fecha_baja
    FROM articulos
    WHERE sku = p_sku;
END//
DELIMITER ;

-- Volcando estructura para tabla tienda.departamentos
CREATE TABLE IF NOT EXISTS `departamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla tienda.departamentos: ~4 rows (aproximadamente)
INSERT INTO `departamentos` (`id`, `nombre`) VALUES
	(1, 'DOMESTICOS'),
	(2, 'ELECTRONICA'),
	(3, 'MUEBLE SUELTO'),
	(4, 'SALAS, RECAMARAS, COMEDORES');

-- Volcando estructura para procedimiento tienda.EliminarArticulo
DELIMITER //
CREATE PROCEDURE `EliminarArticulo`(IN p_sku VARCHAR(6))
BEGIN
    DELETE FROM articulos WHERE sku = p_sku;
END//
DELIMITER ;

-- Volcando estructura para tabla tienda.familias
CREATE TABLE IF NOT EXISTS `familias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `clase_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clase_id` (`clase_id`),
  CONSTRAINT `familias_ibfk_1` FOREIGN KEY (`clase_id`) REFERENCES `clases` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla tienda.familias: ~30 rows (aproximadamente)
INSERT INTO `familias` (`id`, `nombre`, `clase_id`) VALUES
	(1, 'SIN NOMBRE', 1),
	(2, 'LICUADORAS', 2),
	(3, 'EXCLUSIVOS COPPEL', 2),
	(4, 'BATIDORA MANUAL', 3),
	(5, 'PROCESADOR', 3),
	(6, 'FICADORA', 3),
	(7, 'BATIDORA PEDESTAL', 3),
	(8, 'BATIDORA FUENTE DE SODA', 3),
	(9, 'CAFETERAS', 4),
	(10, 'AMPLIFICADORES CAR AUDIO', 5),
	(11, 'AUTOSTERES CON CD/MP3', 6),
	(12, 'KIT DE INSTALACION', 6),
	(13, 'MARCA AUTOCOSAS', 6),
	(14, 'AUTOESTERES C/BLUETOOTH', 6),
	(15, 'AUTOESTEROS CON BLUETOOTH', 6),
	(16, 'SISTEMAS DE BOCINAS', 6),
	(17, 'AUTOESTERES', 6),
	(18, 'COLCHON', 7),
	(19, 'COLCHON K SIZE', 7),
	(20, 'JUEGO BOX', 8),
	(21, 'STAND', 8),
	(22, 'JUEGO INDIVIDUAL', 8),
	(23, 'JUEGO DOBLE INDIVIDUAL', 8),
	(24, 'SILLA', 9),
	(25, 'SILLON OCCASIONAL', 9),
	(26, 'TABURETE', 10),
	(27, 'SOFA CAMAS', 11),
	(28, 'SOFACAM TAPIZADO CLASICO', 11),
	(29, 'SOFACAMA CLASICO', 11),
	(30, 'ESTUDIO', 11);

-- Volcando estructura para procedimiento tienda.InsertarArticulo
DELIMITER //
CREATE PROCEDURE `InsertarArticulo`(
    IN p_sku CHAR(6),
    IN p_articulo VARCHAR(15),
    IN p_marca VARCHAR(15),
    IN p_modelo VARCHAR(20),
    IN p_departamento CHAR(1),
    IN p_clase CHAR(2),
    IN p_familia CHAR(3),
    IN p_fecha_alta DATE,
    IN p_stock INT,
    IN p_cantidad INT,
    IN p_descontinuado CHAR(1),
    IN p_fecha_baja DATE
)
BEGIN
    INSERT INTO articulos (
        sku, 
        articulo, 
        marca, 
        modelo, 
        departamento, 
        clase, 
        familia, 
        fecha_alta, 
        stock, 
        cantidad, 
        descontinuado, 
        fecha_baja
    ) VALUES (
        p_sku, 
        p_articulo, 
        p_marca, 
        p_modelo, 
        p_departamento, 
        p_clase, 
        p_familia, 
        p_fecha_alta, 
        p_stock, 
        p_cantidad, 
        p_descontinuado, 
        p_fecha_baja
    );
END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
