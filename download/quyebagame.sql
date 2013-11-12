# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.28-log)
# Database: quyebagame
# Generation Time: 2013-09-01 13:15:38 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admin_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin_users`;

CREATE TABLE `admin_users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL DEFAULT '',
  `user_pass` varchar(60) NOT NULL DEFAULT '',
  `user_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;

INSERT INTO `admin_users` (`user_id`, `user_email`, `user_pass`, `user_date`, `user_modified`, `user_last_login`)
VALUES
	(4,'game_master','$2a$08$9ZRFtr/MVFZ30VpD7Foxx.LP0yH/djRYrUGZ/bZPo/2VvoXNcK8L.','2013-08-20 22:52:11','2013-08-20 22:52:11','2013-08-31 21:24:11');

/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table config
# ------------------------------------------------------------

DROP TABLE IF EXISTS `config`;

CREATE TABLE `config` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cfg` text NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;

INSERT INTO `config` (`id`, `cfg`)
VALUES
	(1,'a:52:{s:8:\\\"base_url\\\";s:23:\\\"http://ray.quyeba.local\\\";s:10:\\\"index_page\\\";s:9:\\\"index.php\\\";s:12:\\\"uri_protocol\\\";s:4:\\\"AUTO\\\";s:10:\\\"url_suffix\\\";s:0:\\\"\\\";s:8:\\\"language\\\";s:7:\\\"english\\\";s:7:\\\"charset\\\";s:5:\\\"UTF-8\\\";s:12:\\\"enable_hooks\\\";b:1;s:15:\\\"subclass_prefix\\\";s:7:\\\"QUYEBA_\\\";s:19:\\\"permitted_uri_chars\\\";s:14:\\\"a-z 0-9~%.:_\\\\-\\\";s:15:\\\"allow_get_array\\\";b:1;s:20:\\\"enable_query_strings\\\";b:0;s:18:\\\"controller_trigger\\\";s:1:\\\"c\\\";s:16:\\\"function_trigger\\\";s:1:\\\"m\\\";s:17:\\\"directory_trigger\\\";s:1:\\\"d\\\";s:13:\\\"log_threshold\\\";i:0;s:8:\\\"log_path\\\";s:0:\\\"\\\";s:15:\\\"log_date_format\\\";s:11:\\\"Y-m-d H:i:s\\\";s:10:\\\"cache_path\\\";s:0:\\\"\\\";s:14:\\\"encryption_key\\\";s:14:\\\"quyebagame2013\\\";s:16:\\\"sess_cookie_name\\\";s:19:\\\"quyeba_game_session\\\";s:15:\\\"sess_expiration\\\";s:5:\\\"86400\\\";s:20:\\\"sess_expire_on_close\\\";b:0;s:19:\\\"sess_encrypt_cookie\\\";b:0;s:17:\\\"sess_use_database\\\";b:0;s:15:\\\"sess_table_name\\\";s:11:\\\"ci_sessions\\\";s:13:\\\"sess_match_ip\\\";b:0;s:20:\\\"sess_match_useragent\\\";b:1;s:19:\\\"sess_time_to_update\\\";i:300;s:13:\\\"cookie_prefix\\\";s:0:\\\"\\\";s:13:\\\"cookie_domain\\\";s:0:\\\"\\\";s:11:\\\"cookie_path\\\";s:1:\\\"/\\\";s:13:\\\"cookie_secure\\\";b:0;s:20:\\\"global_xss_filtering\\\";b:0;s:15:\\\"csrf_protection\\\";b:0;s:15:\\\"csrf_token_name\\\";s:14:\\\"csrf_test_name\\\";s:16:\\\"csrf_cookie_name\\\";s:16:\\\"csrf_cookie_name\\\";s:11:\\\"csrf_expire\\\";i:7200;s:15:\\\"compress_output\\\";b:0;s:14:\\\"time_reference\\\";s:5:\\\"local\\\";s:18:\\\"rewrite_short_tags\\\";b:0;s:9:\\\"proxy_ips\\\";s:0:\\\"\\\";s:19:\\\"debug_quyeba_client\\\";s:7:\\\"default\\\";s:23:\\\"debug_quyeba_client_key\\\";s:7:\\\"default\\\";s:20:\\\"debug_quyeba_api_url\\\";s:37:\\\"http://beta.qybimg.com/api/v2/mobile/\\\";s:13:\\\"quyeba_client\\\";s:11:\\\"shake_shake\\\";s:17:\\\"quyeba_client_key\\\";s:30:\\\"8ujok937788nnnnjkhytrewsdcxlop\\\";s:14:\\\"quyeba_api_url\\\";s:36:\\\"http://www.quyeba.com/api/v2/mobile/\\\";s:21:\\\"reward_points_api_url\\\";s:56:\\\"http://www.thenorthface.com.cn/explorer/api/integral.php\\\";s:21:\\\"reward_points_api_key\\\";s:14:\\\"explorer1234!@\\\";s:20:\\\"enable_validate_sign\\\";b:0;s:15:\\\"coupon_per_user\\\";s:1:\\\"1\\\";s:17:\\\"debug_environment\\\";s:1:\\\"0\\\";}');

/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table coupon
# ------------------------------------------------------------

DROP TABLE IF EXISTS `coupon`;

CREATE TABLE `coupon` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `coupon_code` varchar(255) NOT NULL DEFAULT '',
  `coupon_discount` decimal(3,2) NOT NULL,
  `coupon_description` varchar(255) DEFAULT NULL,
  `status` tinyint(11) NOT NULL DEFAULT '0',
  `reward_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `coupon` WRITE;
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;

INSERT INTO `coupon` (`id`, `coupon_code`, `coupon_discount`, `coupon_description`, `status`, `reward_id`)
VALUES
	(2,'DEQEQWEQ',6.00,NULL,1,2),
	(3,'DEEWQXQW',0.00,NULL,1,9),
	(4,'XDQDQDDQ',0.00,NULL,1,9),
	(5,'QWEWQCC',0.00,NULL,1,9),
	(6,'ZCEQCVRQ',0.00,NULL,1,9),
	(7,'HJLLOIIIWQ',0.00,NULL,1,9),
	(8,'ACFKPEQW',0.00,NULL,1,9),
	(9,'CNLLWQEE',0.00,NULL,1,9);

/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table coupon_game
# ------------------------------------------------------------

DROP TABLE IF EXISTS `coupon_game`;

CREATE TABLE `coupon_game` (
  `coupon_id` int(11) unsigned NOT NULL DEFAULT '0',
  `game_id` int(11) unsigned NOT NULL DEFAULT '0',
  `session_id` varchar(255) NOT NULL DEFAULT '',
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`coupon_id`,`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `coupon_game` WRITE;
/*!40000 ALTER TABLE `coupon_game` DISABLE KEYS */;

INSERT INTO `coupon_game` (`coupon_id`, `game_id`, `session_id`, `user_id`, `created_at`)
VALUES
	(2,61,'fa30942cde0b6f22fef829338b71b3fb',111,'2013-08-31 15:24:29'),
	(5,60,'af0203d986760030e0fe6df75809ea40',274572,'2013-08-28 22:42:42'),
	(6,61,'16633ad0a529fe6ae92a72255c47f6c8',111,'2013-08-31 14:31:38'),
	(7,61,'fa30942cde0b6f22fef829338b71b3fb',111,'2013-08-31 15:25:22'),
	(8,61,'fa30942cde0b6f22fef829338b71b3fb',111,'2013-08-31 15:25:24'),
	(9,61,'fa30942cde0b6f22fef829338b71b3fb',111,'2013-08-31 15:25:35');

/*!40000 ALTER TABLE `coupon_game` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table game
# ------------------------------------------------------------

DROP TABLE IF EXISTS `game`;

CREATE TABLE `game` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) NOT NULL DEFAULT '',
  `user_id` int(11) unsigned DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `client_ip` varchar(15) NOT NULL DEFAULT '',
  `game_score` int(11) unsigned DEFAULT '0',
  `game_type` tinyint(11) unsigned DEFAULT '0',
  `game_result` varchar(255) DEFAULT NULL,
  `play_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;

INSERT INTO `game` (`id`, `session_id`, `user_id`, `user_name`, `client_ip`, `game_score`, `game_type`, `game_result`, `play_at`)
VALUES
	(62,'a8116c5c42abfb0c6be92bba522a4224',NULL,'undefined','10.0.1.3',1,0,'lost','2013-08-31 15:32:03'),
	(63,'00fb04cb9fa2275de6466b20cccb91af',NULL,'undefined','10.0.1.3',1,0,'lost','2013-08-31 15:32:55'),
	(64,'00fb04cb9fa2275de6466b20cccb91af',NULL,'undefined','10.0.1.3',1,0,'lost','2013-08-31 15:34:20'),
	(65,'db9391a29eff18b26f5b2c5823b52114',NULL,'undefined','10.0.1.3',1,0,'lost','2013-08-31 15:41:06'),
	(66,'796532f61289098d1af459a3a41677a7',NULL,'undefined','10.0.1.3',1,0,'lost','2013-08-31 15:41:49'),
	(67,'796532f61289098d1af459a3a41677a7',NULL,'undefined','10.0.1.3',1,0,'lost','2013-08-31 15:42:14'),
	(68,'18026758cbfdb976311500c85df53a6b',NULL,'undefined','10.0.1.3',18,0,'lost','2013-08-31 15:43:00'),
	(69,'c38b943619bb94547a568f62225288e4',111,'test','127.0.0.1',0,0,'0','2013-08-31 15:57:09'),
	(70,'c38b943619bb94547a568f62225288e4',111,'test','127.0.0.1',0,0,'0','2013-08-31 15:57:21'),
	(71,'c38b943619bb94547a568f62225288e4',111,'test','127.0.0.1',0,0,'0','2013-08-31 15:57:47'),
	(72,'c38b943619bb94547a568f62225288e4',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:00:03'),
	(73,'8dcffedeab3ae97f954712d85dac07a0',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:02:42'),
	(74,'8dcffedeab3ae97f954712d85dac07a0',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:02:53'),
	(75,'8dcffedeab3ae97f954712d85dac07a0',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:03:19'),
	(76,'8dcffedeab3ae97f954712d85dac07a0',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:03:20'),
	(77,'8dcffedeab3ae97f954712d85dac07a0',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:03:21'),
	(78,'8dcffedeab3ae97f954712d85dac07a0',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:03:22'),
	(79,'b030a532a7a9d2c7ac3e03f7ac372a47',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:19:10'),
	(80,'b030a532a7a9d2c7ac3e03f7ac372a47',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:19:48'),
	(81,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:20:44'),
	(82,'b030a532a7a9d2c7ac3e03f7ac372a47',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:21:21'),
	(83,'b030a532a7a9d2c7ac3e03f7ac372a47',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:21:22'),
	(84,'b030a532a7a9d2c7ac3e03f7ac372a47',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:21:23'),
	(85,'b030a532a7a9d2c7ac3e03f7ac372a47',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:21:23'),
	(86,'b030a532a7a9d2c7ac3e03f7ac372a47',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:21:23'),
	(87,'b030a532a7a9d2c7ac3e03f7ac372a47',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:21:23'),
	(88,'b030a532a7a9d2c7ac3e03f7ac372a47',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:21:24'),
	(89,'b030a532a7a9d2c7ac3e03f7ac372a47',NULL,NULL,'127.0.0.1',0,0,'0','2013-08-31 16:21:24'),
	(90,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:21:58'),
	(91,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:22:16'),
	(92,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:22:29'),
	(93,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:22:30'),
	(94,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:22:31'),
	(95,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:22:32'),
	(96,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:22:33'),
	(97,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:22:33'),
	(98,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:22:35'),
	(99,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:22:44'),
	(100,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:23:23'),
	(101,'54afae4af0c27d06324a4a58dc0bdcec',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:23:56'),
	(102,'a881ceedd8ce6b822cc00f0f772227b2',111,'test','127.0.0.1',0,0,'0','2013-08-31 16:26:31');

/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table points_game
# ------------------------------------------------------------

DROP TABLE IF EXISTS `points_game`;

CREATE TABLE `points_game` (
  `game_id` int(11) unsigned NOT NULL DEFAULT '0',
  `user_id` int(11) unsigned NOT NULL,
  `request_response` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `points_game` WRITE;
/*!40000 ALTER TABLE `points_game` DISABLE KEYS */;

INSERT INTO `points_game` (`game_id`, `user_id`, `request_response`, `created_at`)
VALUES
	(51,124577,'{\"code\":\"0\",\"errmsg\":\"\",\"data\":{\"integral\":200,\"totalintegral\":\"600\"}}','2013-08-24 13:13:32'),
	(52,124577,'{\"code\":\"0\",\"errmsg\":\"\",\"data\":{\"integral\":200,\"totalintegral\":\"1000\"}}','2013-08-24 13:23:27'),
	(54,124578,'{\"code\":\"0\",\"errmsg\":\"\",\"data\":{\"integral\":200,\"totalintegral\":\"200\"}}','2013-08-24 14:46:20'),
	(61,111,'{\"code\":\"0\",\"errmsg\":\"\",\"data\":{\"integral\":200,\"totalintegral\":\"200\"}}','2013-08-31 14:31:53');

/*!40000 ALTER TABLE `points_game` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table reward
# ------------------------------------------------------------

DROP TABLE IF EXISTS `reward`;

CREATE TABLE `reward` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `reward_name` varchar(255) NOT NULL DEFAULT '',
  `reward_probability` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `reward` WRITE;
/*!40000 ALTER TABLE `reward` DISABLE KEYS */;

INSERT INTO `reward` (`id`, `reward_name`, `reward_probability`)
VALUES
	(9,'9折优惠券',80);

/*!40000 ALTER TABLE `reward` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
