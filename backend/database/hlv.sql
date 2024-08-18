USE SE104;

INSERT INTO `coaches` (id, name, country, award, club_id, role)
VALUES
    (SHA1(UUID()), 'Lê Huỳnh Đức', 'VIE', '', (SELECT id FROM clubs WHERE name_club = 'Becamex Bình Dương' AND sea_son= '2023-2024'),'Head Coach'),
    (SHA1(UUID()), 'Trần Tiến Đại', 'VIE', '', (SELECT id FROM clubs WHERE name_club = 'Công An Hà Nội' AND sea_son= '2023-2024'), 'Head Coach'),
    (SHA1(UUID()), 'Popov Velizar Emilov', 'BUL', '', (SELECT id FROM clubs WHERE name_club = 'Đông Á Thanh Hóa' AND sea_son= '2023-2024'), 'Head Coach'),
    (SHA1(UUID()), 'Daiki Iwamasa', 'JPN', '', (SELECT id FROM clubs WHERE name_club = 'Hà Nội' AND sea_son= '2023-2024'), 'Head Coach'),
    (SHA1(UUID()), 'Chu Đình Nghiêm', 'VIE', '', (SELECT id FROM clubs WHERE name_club = 'Hải Phòng' AND sea_son= '2023-2024'), 'Head Coach'),
    (SHA1(UUID()), 'Vũ Tiến Thành', 'VIE', '', (SELECT id FROM clubs WHERE name_club = 'LPBank Hoàng Anh Gia Lai' AND sea_son= '2023-2024'), 'Head Coach'),
    (SHA1(UUID()), 'Nguyễn Thành Công', 'VIE', '', (SELECT id FROM clubs WHERE name_club = 'Hồng Lĩnh Hà Tĩnh' AND sea_son= '2023-2024'), 'Head Coach'),
    (SHA1(UUID()), 'Trần Trọng Bình', 'VIE', '', (SELECT id FROM clubs WHERE name_club = 'Khánh Hòa' AND sea_son= '2023-2024'), 'Head Coach'),
    (SHA1(UUID()), 'Văn Vĩ Sơn', 'VIE', '', (SELECT id FROM clubs WHERE name_club = 'Quảng Nam' AND sea_son= '2023-2024'), 'Head Coach'),
    (SHA1(UUID()), 'Bùi Đoàn Quang Huy', 'VIE', '', (SELECT id FROM clubs WHERE name_club = 'MerryLand Quy Nhơn Bình Định' AND sea_son= '2023-2024'), 'Head Coach'),
    (SHA1(UUID()), 'Phùng Thanh Phương', 'VIE', '', (SELECT id FROM clubs WHERE name_club = 'TP Hồ Chí Minh' AND sea_son= '2023-2024'), 'Head Coach'),
    (SHA1(UUID()), 'Phạm Anh Tuấn', 'VIE', '', (SELECT id FROM clubs WHERE name_club = 'Sông Lam Nghệ An' AND sea_son= '2023-2024'), 'Head Coach'),
    (SHA1(UUID()), 'Vũ Hồng Việt', 'VIE', '', (SELECT id FROM clubs WHERE name_club = 'Thép Xanh Nam Định' AND sea_son= '2023-2024'), 'Head Coach'),
    (SHA1(UUID()), 'Nguyễn Đức Thắng', 'VIE', '', (SELECT id FROM clubs WHERE name_club = 'Thể Công - Viettel' AND sea_son= '2023-2024'), 'Head Coach');