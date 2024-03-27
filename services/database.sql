CREATE DATABASE login_form20march;
USE login_form20march;

CREATE TABLE `login` (
  `id` int NOT NULL,
  `f_name` varchar(45) DEFAULT NULL,
  `l_name` varchar(45) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `mobile_no` bigint DEFAULT NULL,
  `password` varchar(45),
  `pass_key` varchar(45),
    `token` varchar(100),
  `created_time` TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) on update CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `EMAIL` (`EMAIL`)
) ;