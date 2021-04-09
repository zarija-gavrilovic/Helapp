/*
SQLyog Community v13.1.5  (64 bit)
MySQL - 10.4.11-MariaDB : Database - ionic_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ionic_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `ionic_db`;

/*Table structure for table `doctor` */

DROP TABLE IF EXISTS `doctor`;

CREATE TABLE `doctor` (
  `doctor_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `surname` varchar(256) DEFAULT NULL,
  `orientation` varchar(256) DEFAULT NULL,
  `image` varchar(256) DEFAULT NULL,
  `hospital` varchar(256) DEFAULT NULL,
  `username` varchar(256) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `doctor` */

insert  into `doctor`(`doctor_id`,`name`,`surname`,`orientation`,`image`,`hospital`,`username`,`password`) values 
(1,'zarija','gavrilovic','hirurg','null','Tirsova','2020-9-14 9:37:27','2020-9-14 9:37:27'),
(2,'Jovan','Petrovic','praktikant','null','beo-medic','joca','joca');

/*Table structure for table `logger` */

DROP TABLE IF EXISTS `logger`;

CREATE TABLE `logger` (
  `loginfo_id` int(11) NOT NULL AUTO_INCREMENT,
  `info` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`loginfo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4;

/*Data for the table `logger` */

insert  into `logger`(`loginfo_id`,`info`) values 
(1,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 12:37:31'),
(2,'Doktor: zarija gavrilovic je uneo pacijenta: pacijent1 pacijent1 Vreme: 2020-9-10 12:37:31'),
(3,'Doktor: zarija gavrilovic je uneo pacijenta: pacijent2 pacijent2 Vreme: 2020-9-10 12:37:31'),
(4,'Doktor: zarija gavrilovic je uneo pacijenta: pacijent3 pacijent3 Vreme: 2020-9-10 12:37:31'),
(5,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 12:40:8'),
(6,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 12:40:8'),
(7,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent1 pacijent1 na HOSPITALIZACIJU Vreme: 2020-9-10 12:40:8'),
(8,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent2 pacijent2 na HOSPITALIZACIJU Vreme: 2020-9-10 12:40:8'),
(9,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent3 pacijent3 na HOSPITALIZACIJU Vreme: 2020-9-10 12:40:8'),
(10,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent3 pacijent3 na HOSPITALIZACIJU Vreme: 2020-9-10 12:40:8'),
(11,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent3 pacijent3 na HOSPITALIZACIJU Vreme: 2020-9-10 12:40:8'),
(12,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 12:42:47'),
(13,'Doktor: zarija gavrilovic je OTPUSTIO pacijenta: pacijent1 pacijent1 Vreme: 2020-9-10 12:42:47'),
(14,'Doktor: zarija gavrilovic je OTPUSTIO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-10 12:42:47'),
(15,'Doktor: zarija gavrilovic je OTPUSTIO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-10 12:42:47'),
(16,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 12:52:24'),
(17,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 12:52:24'),
(18,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 12:56:28'),
(19,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent3 pacijent3 na HOSPITALIZACIJU Vreme: 2020-9-10 12:56:28'),
(20,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 12:57:51'),
(21,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 12:59:16'),
(22,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 13:1:3'),
(23,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 13:1:42'),
(24,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 13:3:17'),
(25,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 13:5:45'),
(26,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 13:8:7'),
(27,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 13:8:54'),
(28,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 13:10:41'),
(29,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 13:13:16'),
(30,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 13:27:13'),
(31,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 13:37:36'),
(32,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 15:38:15'),
(33,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 21:3:21'),
(34,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 21:5:35'),
(35,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-10 21:7:26'),
(36,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 22:22:17'),
(37,'Doktor: zarija gavrilovic je uneo pacijenta: pacijent5 pacijent5 Vreme: 2020-9-13 22:22:17'),
(38,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent5 pacijent5 na HOSPITALIZACIJU Vreme: 2020-9-13 22:22:17'),
(39,'Doktor: zarija gavrilovic je OTPUSTIO pacijenta: pacijent5 pacijent5 Vreme: 2020-9-13 22:22:17'),
(40,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 22:27:5'),
(41,'Doktor: zarija gavrilovic je uneo pacijenta: pacijent6 pacijent6 Vreme: 2020-9-13 22:27:5'),
(42,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent6 pacijent6 na HOSPITALIZACIJU Vreme: 2020-9-13 22:27:5'),
(43,'Doktor: zarija gavrilovic je OTPUSTIO pacijenta: pacijent6 pacijent6 Vreme: 2020-9-13 22:27:5'),
(44,'Doktor: zarija gavrilovic je OBRISAO pacijenta: pacijent6 pacijent6 Vreme: 2020-9-13 22:27:5'),
(45,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 22:30:25'),
(46,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 22:31:38'),
(47,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 22:32:21'),
(48,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 22:36:45'),
(49,'Doktor: zarija gavrilovic je uneo pacijenta: pacijent7 pacijent7 Vreme: 2020-9-13 22:36:45'),
(50,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent7 pacijent7 na HOSPITALIZACIJU Vreme: 2020-9-13 22:36:45'),
(51,'Doktor: zarija gavrilovic je OTPUSTIO pacijenta: pacijent7 pacijent7 Vreme: 2020-9-13 22:36:45'),
(52,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent7 pacijent7 na HOSPITALIZACIJU Vreme: 2020-9-13 22:36:45'),
(53,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent7 pacijent7 na HOSPITALIZACIJU Vreme: 2020-9-13 22:36:45'),
(54,'Doktor: zarija gavrilovic je OTPUSTIO pacijenta: pacijent7 pacijent7 Vreme: 2020-9-13 22:36:45'),
(55,'Doktor: zarija gavrilovic je OTPUSTIO pacijenta: pacijent7 pacijent7 Vreme: 2020-9-13 22:36:45'),
(56,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent7 pacijent7 na HOSPITALIZACIJU Vreme: 2020-9-13 22:36:45'),
(57,'Doktor: zarija gavrilovic je OTPUSTIO pacijenta: pacijent7 pacijent7 Vreme: 2020-9-13 22:36:45'),
(58,'Doktor: zarija gavrilovic je OTPUSTIO pacijenta: pacijent7 pacijent7 Vreme: 2020-9-13 22:36:45'),
(59,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent3 pacijent3 na HOSPITALIZACIJU Vreme: 2020-9-13 22:36:45'),
(60,'Doktor: zarija gavrilovic je premestio pacijenta: pacijent7 pacijent7 na HOSPITALIZACIJU Vreme: 2020-9-13 22:36:45'),
(61,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2020-9-13 22:36:45'),
(62,'Doktor: Jovan Petrovic je uneo pacijenta: 123 123 Vreme: 2020-9-13 22:36:45'),
(63,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2020-9-13 22:52:51'),
(64,'Doktor: Jovan Petrovic je premestio pacijenta: 123 123 na HOSPITALIZACIJU Vreme: 2020-9-13 22:52:51'),
(65,'Doktor: Jovan Petrovic je OTPUSTIO pacijenta: 123 123 Vreme: 2020-9-13 22:52:51'),
(66,'Doktor: Jovan Petrovic je OBRISAO pacijenta: 123 123 Vreme: 2020-9-13 22:52:51'),
(67,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2020-9-13 23:6:44'),
(68,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2020-9-13 23:9:16'),
(69,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2020-9-13 23:9:16'),
(70,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2020-9-13 23:9:16'),
(71,'Doktor: Jovan Petrovic je uneo pacijenta: 123 123 Vreme: 2020-9-13 23:9:16'),
(72,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2020-9-13 23:9:16'),
(73,'Doktor: Jovan Petrovic je OTPUSTIO pacijenta: 123 123 Vreme: 2020-9-13 23:9:16'),
(74,'Doktor: Jovan Petrovic je OTPUSTIO pacijenta: 123 123 Vreme: 2020-9-13 23:9:16'),
(75,'Doktor: Jovan Petrovic je OTPUSTIO pacijenta: 123 123 Vreme: 2020-9-13 23:9:16'),
(76,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2020-9-13 23:13:12'),
(77,'Doktor: Jovan Petrovic je premestio pacijenta: 123 123 na HOSPITALIZACIJU Vreme: 2020-9-13 23:13:12'),
(78,'Doktor: Jovan Petrovic je OTPUSTIO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(79,'Doktor: Jovan Petrovic je OTPUSTIO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(80,'Doktor: Jovan Petrovic je OTPUSTIO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(81,'Doktor: Jovan Petrovic je OBRISAO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(82,'Doktor: Jovan Petrovic je OBRISAO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(83,'Doktor: Jovan Petrovic je OBRISAO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(84,'Doktor: Jovan Petrovic je OBRISAO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(85,'Doktor: Jovan Petrovic je OBRISAO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(86,'Doktor: Jovan Petrovic je OBRISAO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(87,'Doktor: Jovan Petrovic je OBRISAO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(88,'Doktor: Jovan Petrovic je OBRISAO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(89,'Doktor: Jovan Petrovic je OBRISAO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(90,'Doktor: Jovan Petrovic je OBRISAO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(91,'Doktor: Jovan Petrovic je OTPUSTIO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(92,'Doktor: Jovan Petrovic je OTPUSTIO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(93,'Doktor: Jovan Petrovic je OBRISAO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(94,'Doktor: Jovan Petrovic je OBRISAO pacijenta: pacijent3 pacijent3 Vreme: 2020-9-13 23:13:12'),
(95,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 23:19:17'),
(96,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 23:20:5'),
(97,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 23:25:41'),
(98,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 23:25:41'),
(99,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 23:25:41'),
(100,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 23:30:22'),
(101,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 23:31:41'),
(102,'Doktor: zarija gavrilovic je uneo pacijenta: 1234 1234 Vreme: 2020-9-13 23:31:41'),
(103,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 23:31:41'),
(104,'Doktor: zarija gavrilovic je premestio pacijenta: 1234 1234 na HOSPITALIZACIJU Vreme: 2020-9-13 23:31:41'),
(105,'Doktor: zarija gavrilovic je OTPUSTIO pacijenta: 1234 1234 Vreme: 2020-9-13 23:31:41'),
(106,'Doktor: zarija gavrilovic je uneo pacijenta: 1 1 Vreme: 2020-9-13 23:31:41'),
(107,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-13 23:27:22'),
(108,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2020-9-13 23:38:14'),
(109,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2020-9-13 23:41:34'),
(110,'Doktor: Jovan Petrovic je premestio pacijenta: 1 1 na HOSPITALIZACIJU Vreme: 2020-9-13 23:41:34'),
(111,'Doktor: Jovan Petrovic je OTPUSTIO pacijenta: 1 1 Vreme: 2020-9-13 23:41:34'),
(112,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-14 9:18:49'),
(113,'Korisnik zarija gavrilovic se ulogovao.Vreme: 2020-9-14 9:33:46'),
(114,'Doktor: zarija gavrilovic je uneo pacijenta: 11122 11122 Vreme: 2020-9-14 9:33:46'),
(115,'Doktor: zarija gavrilovic je premestio pacijenta: 11122 11122 na HOSPITALIZACIJU Vreme: 2020-9-14 9:33:46'),
(116,'Doktor: zarija gavrilovic je OTPUSTIO pacijenta: 11122 11122 Vreme: 2020-9-14 9:33:46'),
(117,'Doktor: zarija gavrilovic je OBRISAO pacijenta: 11122 11122 Vreme: 2020-9-14 9:33:46'),
(118,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2020-9-14 9:33:46'),
(119,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2021-4-9 10:45:44'),
(120,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2021-4-9 10:47:39'),
(121,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2021-4-9 10:47:39'),
(122,'Doktor: Jovan Petrovic je premestio pacijenta: pacijent3 pacijent3 na HOSPITALIZACIJU Vreme: 2021-4-9 10:47:39'),
(123,'Doktor: Jovan Petrovic je premestio pacijenta: pacijent3 pacijent3 na HOSPITALIZACIJU Vreme: 2021-4-9 10:47:39'),
(124,'Doktor: Jovan Petrovic je premestio pacijenta: 1 1 na HOSPITALIZACIJU Vreme: 2021-4-9 10:47:39'),
(125,'Doktor: Jovan Petrovic je premestio pacijenta: 1 1 na HOSPITALIZACIJU Vreme: 2021-4-9 10:47:39'),
(126,'Doktor: Jovan Petrovic je premestio pacijenta: 1234 1234 na HOSPITALIZACIJU Vreme: 2021-4-9 10:47:39'),
(127,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2021-4-9 10:52:33'),
(128,'Korisnik Jovan Petrovic se ulogovao.Vreme: 2021-4-9 11:0:27');

/*Table structure for table `patient` */

DROP TABLE IF EXISTS `patient`;

CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `surname` varchar(256) DEFAULT NULL,
  `image` varchar(256) DEFAULT NULL,
  `diagnosis` varchar(256) DEFAULT NULL,
  `review` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

/*Data for the table `patient` */

insert  into `patient`(`patient_id`,`name`,`surname`,`image`,`diagnosis`,`review`) values 
(1,'pacijent1','pacijent1','unknown','pacijent1','ZDRAV'),
(2,'pacijent2','pacijent2','unknown','pacijent2','HOSPITALIZACIJA'),
(4,'pacijent3','pacijent3','unknown','pacijent3','HOSPITALIZACIJA'),
(10,'pacijent3','pacijent3','unknown','pacijent3','HOSPITALIZACIJA'),
(11,'pacijent3','pacijent3','pacijent3','pacijent3','ZDRAV'),
(13,'pacijent3','pacijent3','pacijent3','pacijent3','HOSPITALIZACIJA'),
(17,'pacijent5','pacijent5','unknown','pacijent5','ZDRAV'),
(19,'pacijent7','pacijent7','unknown','pacijent7','HOSPITALIZACIJA'),
(21,'123','123','unknown','123','HOSPITALIZACIJA'),
(22,'1234','1234','unknown','1234','HOSPITALIZACIJA'),
(23,'1','1','unknown','1','HOSPITALIZACIJA');

/*Table structure for table `patient_total` */

DROP TABLE IF EXISTS `patient_total`;

CREATE TABLE `patient_total` (
  `patient_totalID` int(11) NOT NULL AUTO_INCREMENT,
  `waiting_room` int(11) DEFAULT NULL,
  `in_process` int(11) DEFAULT NULL,
  `healthy` int(11) DEFAULT NULL,
  PRIMARY KEY (`patient_totalID`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4;

/*Data for the table `patient_total` */

insert  into `patient_total`(`patient_totalID`,`waiting_room`,`in_process`,`healthy`) values 
(20,1,1,1),
(21,2,2,2),
(22,3,2,1),
(23,4,2,1),
(24,5,2,1),
(25,5,3,5),
(26,6,6,6),
(27,10,1,2),
(28,4,4,4),
(29,11,12,13),
(30,6,5,6),
(31,5,6,6),
(32,5,5,7),
(33,6,5,7),
(34,5,6,7),
(35,5,5,8),
(36,5,5,7),
(37,6,5,7),
(38,5,6,7),
(39,5,5,8),
(40,5,6,7),
(41,5,6,7),
(42,5,5,8),
(43,5,5,8),
(44,5,6,7),
(45,5,5,8),
(46,5,5,8),
(47,5,5,8),
(48,5,6,7),
(49,6,6,7),
(50,5,7,7),
(51,5,6,8),
(52,5,6,7),
(53,6,6,7),
(54,5,6,8),
(55,5,6,8),
(56,5,7,7),
(57,4,7,8),
(58,3,7,9),
(59,2,7,10),
(60,2,7,9),
(61,2,7,8),
(62,2,6,8),
(63,2,6,7),
(64,2,6,6),
(65,2,6,5),
(66,2,6,4),
(67,2,6,3),
(68,2,5,4),
(69,2,4,5),
(70,2,4,4),
(71,2,4,3),
(72,3,4,3),
(73,2,5,3),
(74,2,4,4),
(75,3,4,4),
(76,2,5,4),
(77,2,4,5),
(78,3,4,5),
(79,2,5,5),
(80,2,4,6),
(81,2,4,5),
(82,1,5,5),
(83,0,6,5),
(84,0,7,4),
(85,0,7,4),
(86,0,8,3);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
