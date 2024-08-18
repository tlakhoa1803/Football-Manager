USE SE104;

INSERT INTO `stadia` (id,season,published_year, created_at, updated_at, deleted_at, club_id, stadium_name, stadium_address, capacity)
VALUES
    (SHA1(UUID()), '2023-2024', '1976',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'MerryLand Quy Nhơn Bình Định' AND `sea_son` = season LIMIT 1), 'Quy Nhơn', '194 Lê Hồng Phong, Trần Hưng Đạo, Thành phố Qui Nhơn, Bình Định, Việt Nam', '20000'),
    (SHA1(UUID()), '2023-2024', '1975',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'Becamex Bình Dương' AND `sea_son` = season LIMIT 1) ,'Gò Đậu', '30 tháng 4, phường Phú Thọ, Thủ Dầu Một, Bình Dương, Việt Nam', '18250'),
    (SHA1(UUID()), '2023-2024', '1934',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'Công An Hà Nội' AND `sea_son` = season LIMIT 1), 'Hàng Đẫy', '9 Trịnh Hoài Đức, Cát Linh, Đống Đa, Hà Nội, Việt Nam', '22500'),
    (SHA1(UUID()), '2023-2024', '1934',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'Hà Nội' AND `sea_son` = season LIMIT 1), 'Hàng Đẫy', '9 Trịnh Hoài Đức, Cát Linh, Đống Đa, Hà Nội, Việt Nam', '22500'),
    (SHA1(UUID()), '2023-2024', '1958',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'Đông Á Thanh Hóa' AND `sea_son` = season LIMIT 1), 'Thanh Hóa', '37 Lê Quý Đôn, phường Ba Đình, Thành phố Thanh Hóa, Việt Nam', '14000'),
    (SHA1(UUID()), '2023-2024', '1957',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'Hải Phòng' AND `sea_son` = season LIMIT 1), 'Lạch Tray', '15 Đường Lạch Tray, Quận Ngô Quyền, Hải Phòng, Việt Nam', '30000'),
    (SHA1(UUID()), '2023-2024', '1975',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'LPBank Hoàng Anh Gia Lai' AND `sea_son` = season LIMIT 1), 'Pleiku', 'Quang Trung, phường Tây Sơn, Thành phố Pleiku, Gia Lai, Việt Nam', '12000'),
    (SHA1(UUID()), '2023-2024', '1991',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'Hồng Lĩnh Hà Tĩnh' AND `sea_son` = season LIMIT 1), 'Hà Tĩnh', 'Phường Nam Hà, Thành phố Hà Tĩnh, Hà Tĩnh, Việt Nam', '15000'),
    (SHA1(UUID()), '2023-2024', '1992',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'Khánh Hòa' AND `sea_son` = season LIMIT 1), '19 tháng 8', 'Yersin, Lộc Thọ, Nha Trang, Khánh Hòa, Việt Nam', '25000'),
    (SHA1(UUID()), '2023-2024', '1958',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'Thể Công - Viettel' AND `sea_son` = '2023-2024' LIMIT 1), 'Hàng Đẫy', 'Đ. Phạm Hùng, Nam Từ Liêm, Hà Nội, Việt Nam', '22000'),
    (SHA1(UUID()), '2023-2024', '1963',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'Sông Lam Nghệ An' AND `sea_son` = '2023-2024' LIMIT 1), 'Vinh', 'Đường Nguyễn Văn Cừ, Thành phố Vinh, Nghệ An, Việt Nam', '18000'),
    (SHA1(UUID()), '2023-2024', '1999',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'Thép Xanh Nam Định' AND `sea_son` = '2023-2024' LIMIT 1), 'Thiên Trường', 'Đường Trần Hưng Đạo, Thành phố Nam Định, Nam Định, Việt Nam', '18000'),
    (SHA1(UUID()), '2023-2024', '1931',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'TP Hồ Chí Minh' AND `sea_son` = '2023-2024' LIMIT 1), 'Thống Nhất', '1 Lê Đại Hành, P. Phường 15, Tân Bình, Thành phố Hồ Chí Minh, Việt Nam', '16000'),
    (SHA1(UUID()), '2023-2024', '1980',NOW(), NOW(), NULL, (SELECT `id` FROM `clubs` WHERE `name_club` = 'Quảng Nam' AND `sea_son` = '2023-2024' LIMIT 1), 'Tam Kỳ', 'Tổ 8, Phường Hòa Hương, Tam Kỳ, Quảng Nam, Việt Nam', '15000');
