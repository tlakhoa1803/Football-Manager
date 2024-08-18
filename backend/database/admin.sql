USE SE104;

INSERT INTO `users` (`id`, `name`, `email`, `password` ,`is_verified_email`) VALUES
(SHA1(UUID()), 'admin', 'admin@gmail.com','admin','1');
