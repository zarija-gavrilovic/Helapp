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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

/*Data for the table `doctor` */

insert  into `doctor`(`doctor_id`,`name`,`surname`,`orientation`,`image`,`hospital`,`username`,`password`) values 
(13,'Admin','Admin','Admin',NULL,'Admin','admin','$2a$08$/Zd2JuWIMZHeBzlmeXwxX.i20MNQj5O6wJt.qqBk2FI0studO4cXC');

/*Table structure for table `logger` */

DROP TABLE IF EXISTS `logger`;

CREATE TABLE `logger` (
  `loginfo_id` int(11) NOT NULL AUTO_INCREMENT,
  `info` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`loginfo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8mb4;

/*Data for the table `logger` */

/*Table structure for table `patient` */

DROP TABLE IF EXISTS `patient`;

CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `surname` varchar(256) DEFAULT NULL,
  `image` varchar(256) DEFAULT NULL,
  `diagnosis` varchar(256) DEFAULT NULL,
  `category` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4;

/*Data for the table `patient` */

insert  into `patient`(`patient_id`,`name`,`surname`,`image`,`diagnosis`,`category`) values 
(117,'User1','User1','unknown','User1','waiting-room');

/*Table structure for table `patient_total` */

DROP TABLE IF EXISTS `patient_total`;

CREATE TABLE `patient_total` (
  `patient_totalID` int(11) NOT NULL AUTO_INCREMENT,
  `waiting_room` int(11) DEFAULT NULL,
  `in_process` int(11) DEFAULT NULL,
  `healthy` int(11) DEFAULT NULL,
  PRIMARY KEY (`patient_totalID`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8mb4;

/*Data for the table `patient_total` */

insert  into `patient_total`(`patient_totalID`,`waiting_room`,`in_process`,`healthy`) values 
(183,1,0,0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
