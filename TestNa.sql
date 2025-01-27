CREATE DATABASE test_na;
USE test_na;


CREATE TABLE `client` (
  `cl_code` int NOT NULL AUTO_INCREMENT,
  `cl_name` varchar(255) DEFAULT NULL,
  `cl_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cl_code`),
  UNIQUE KEY `cl_code` (`cl_code`),
  UNIQUE KEY `cl_id` (`cl_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `detail_order` (
  `do_code` int NOT NULL AUTO_INCREMENT,
  `do_cod_header` int DEFAULT NULL,
  `do_subtotal` double DEFAULT NULL,
  `do_iva` tinyint(1) DEFAULT NULL,
  `do_total` double DEFAULT NULL,
  PRIMARY KEY (`do_code`),
  UNIQUE KEY `do_code` (`do_code`),
  KEY `detail_order_header_order_FK` (`do_cod_header`),
  CONSTRAINT `detail_order_header_order_FK` FOREIGN KEY (`do_cod_header`) REFERENCES `header_order` (`ho_code`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `header_order` (
  `ho_code` int NOT NULL AUTO_INCREMENT,
  `ho_cod_client` int DEFAULT NULL,
  `ho_date_registration` timestamp NULL DEFAULT NULL,
  `ho_state` int DEFAULT NULL,
  PRIMARY KEY (`ho_code`),
  UNIQUE KEY `ho_code` (`ho_code`),
  KEY `header_order_client_FK` (`ho_cod_client`),
  KEY `header_order_status_FK` (`ho_state`),
  CONSTRAINT `header_order_client_FK` FOREIGN KEY (`ho_cod_client`) REFERENCES `client` (`cl_code`) ON DELETE CASCADE ON UPDATE SET NULL,
  CONSTRAINT `header_order_status_FK` FOREIGN KEY (`ho_state`) REFERENCES `status` (`st_code`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `item_detail` (
  `id_code` int NOT NULL AUTO_INCREMENT,
  `id_cod_item` int DEFAULT NULL,
  `id_cod_detail` int DEFAULT NULL,
  `id_amount` double DEFAULT NULL,
  `id_price` double DEFAULT NULL,
  `id_total` double DEFAULT NULL,
  PRIMARY KEY (`id_code`),
  UNIQUE KEY `id_code` (`id_code`),
  UNIQUE KEY `id_cod_item` (`id_cod_item`),
  KEY `item_detail_detail_order_FK` (`id_cod_detail`),
  CONSTRAINT `item_detail_detail_order_FK` FOREIGN KEY (`id_cod_detail`) REFERENCES `detail_order` (`do_code`) ON DELETE CASCADE ON UPDATE SET NULL,
  CONSTRAINT `item_detail_items_FK` FOREIGN KEY (`id_cod_item`) REFERENCES `items` (`it_code`) ON DELETE CASCADE ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `items` (
  `it_code` int NOT NULL AUTO_INCREMENT,
  `it_description` varchar(255) DEFAULT NULL,
  `it_bar_code` varchar(255) DEFAULT NULL,
  `it_price` double DEFAULT NULL,
  `it_iva` tinyint(1) DEFAULT NULL,
  `it_stock` int DEFAULT NULL,
  `it_value_iva` double DEFAULT NULL,
  PRIMARY KEY (`it_code`),
  UNIQUE KEY `it_code` (`it_code`),
  UNIQUE KEY `it_bar_code` (`it_bar_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `status` (
  `st_code` int NOT NULL AUTO_INCREMENT,
  `st_name` varchar(255) DEFAULT NULL,
  `st_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`st_code`),
  UNIQUE KEY `st_code` (`st_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO test_na.client
(cl_code, cl_name, cl_id)
VALUES(1, 'Pedro Lopez', '0106322659');
INSERT INTO test_na.client
(cl_code, cl_name, cl_id)
VALUES(2, 'Juan Perez', '0106322987');
INSERT INTO test_na.client
(cl_code, cl_name, cl_id)
VALUES(3, 'Carlos Santos', '0106322745');
INSERT INTO test_na.client
(cl_code, cl_name, cl_id)
VALUES(4, 'Miguel Aguilar', '0106322125');

INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(12, 'Alcohol Multipropósitos', '9876543210012', 3.5, 1, 150, 1.12);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(15, 'Antisarro', '9876543210015', 6.0, 1, 90, 1.15);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(7, 'Aromatizante en Spray', '9876543210007', 3.49, 1, 98, 1.12);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(16, 'Brilla muebles', '9876543210016', 4.5, 1, 110, 0.15);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(6, 'Cloro', '9876543210006', 2.99, 1, 56, 1.12);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(20, 'Desinfectante de frutas y legumbres', '9876543210020', 5.5, 1, 130, 1.15);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(17, 'Detergente en Polvo o Enzimático', '9876543210017', 7.0, 1, 80, 1.15);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(5, 'Detergente para Ropa', '9876543210005', 12.49, 1, 52, 1.15);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(18, 'Escoba y pala recogedora', '9876543210018', 8.0, 1, 70, 1.12);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(1, 'Jabón Líquido para Platos', '9876543210001', 3.99, 1, 1, 1.15);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(11, 'Limpiador con acción desinfectante', '9876543210011', 5.0, 1, 100, 1.12);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(10, 'Limpiador de Alfombras', '9876543210010', 9.49, 1, 77, 1.3);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(8, 'Limpiador de Tazas de Baño', '9876543210008', 4.99, 1, 41, 1.12);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(2, 'Limpiador Multiusos', '9876543210002', 5.49, 1, 20, 1.12);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(4, 'Limpiador para Pisos', '9876543210004', 6.99, 1, 41, 1.15);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(3, 'Limpiavidrios', '9876543210003', 4.29, 1, 75, 1.12);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(14, 'Limpiavidrios', '9876543210014', 2.5, 1, 180, 1.15);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(19, 'Mopa o trapeador', '9876543210019', 9.0, 1, 60, 1.15);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(9, 'Pulidor de Acero Inoxidable', '9876543210009', 7.99, 1, 58, 1.3);
INSERT INTO test_na.items
(it_code, it_description, it_bar_code, it_price, it_iva, it_stock, it_value_iva)
VALUES(13, 'Toallas húmedas desinfectantes y desengrasantes', '9876543210013', 4.0, 1, 120, 1.15);

INSERT INTO test_na.status
(st_code, st_name, st_description)
VALUES(1, 'Borrador', 'Borrador');
INSERT INTO test_na.status
(st_code, st_name, st_description)
VALUES(2, 'Confirmado', 'Confirmado');
INSERT INTO test_na.status
(st_code, st_name, st_description)
VALUES(3, 'Pendiente', 'Pendiente');
INSERT INTO test_na.status
(st_code, st_name, st_description)
VALUES(4, 'Declarado', 'Declarado');