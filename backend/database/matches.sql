USE SE104;

INSERT INTO matches(`id`, `created_at`,  `sea_son`, `club_one_name`, `id_club_one`, `club_two_name`, `id_club_two`, `intend_time`, `real_time`, `match_round`, `match_turn`, `stadium`)
VALUES
    /*Round 1*/
    (SHA1(UUID()),NOW(), '2023-2024', 'Hải Phòng', (SELECT id FROM clubs WHERE name_club = 'Hải Phòng' AND sea_son = matches.sea_son), 'LPBank Hoàng Anh Gia Lai', (SELECT id FROM clubs WHERE name_club = 'LPBank Hoàng Anh Gia Lai' AND sea_son = matches.sea_son), '2023-10-20 18:00', '2023-10-20 18:00', 1, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Đông Á Thanh Hóa', (SELECT id FROM clubs WHERE name_club = 'Đông Á Thanh Hóa' AND sea_son = matches.sea_son), 'Hồng Lĩnh Hà Tĩnh', (SELECT id FROM clubs WHERE name_club = 'Hồng Lĩnh Hà Tĩnh' AND sea_son = matches.sea_son), '2023-10-21 18:00', '2023-10-21 18:00', 1, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Sông Lam Nghệ An', (SELECT id FROM clubs WHERE name_club = 'Sông Lam Nghệ An' AND sea_son = matches.sea_son), 'Thể Công - Viettel', (SELECT id FROM clubs WHERE name_club = 'Thể Công - Viettel' AND sea_son = matches.sea_son), '2023-10-22 17:00', '2023-10-22 17:00', 1, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Thép Xanh Nam Định', (SELECT id FROM clubs WHERE name_club = 'Thép Xanh Nam Định' AND sea_son = matches.sea_son), 'Quảng Nam', (SELECT id FROM clubs WHERE name_club = 'Quảng Nam' AND sea_son = matches.sea_son), '2023-10-22 18:00', '2023-10-22 18:00', 1, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Công An Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Công An Hà Nội' AND sea_son = matches.sea_son), 'MerryLand Quy Nhơn Bình Định', (SELECT id FROM clubs WHERE name_club = 'MerryLand Quy Nhơn Bình Định' AND sea_son = matches.sea_son), '2023-10-22 19:15', '2023-10-22 19:15', 1, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'TP Hồ Chí Minh', (SELECT id FROM clubs WHERE name_club = 'TP Hồ Chí Minh' AND sea_son = matches.sea_son), 'Khánh Hòa', (SELECT id FROM clubs WHERE name_club = 'Khánh Hòa' AND sea_son = matches.sea_son), '2023-10-22 19:15', '2023-10-22 19:15', 1, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Becamex Bình Dương', (SELECT id FROM clubs WHERE name_club = 'Becamex Bình Dương' AND sea_son = matches.sea_son), 'Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Hà Nội' AND sea_son = matches.sea_son), '2023-10-21 18:00', '2023-11-24 18:00', 1, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),

    /*Round 2*/
    (SHA1(UUID()),NOW(), '2023-2024', 'Thể Công - Viettel', (SELECT id FROM clubs WHERE name_club = 'Thể Công - Viettel' AND sea_son = matches.sea_son), 'Đông Á Thanh Hóa', (SELECT id FROM clubs WHERE name_club = 'Đông Á Thanh Hóa' AND sea_son = matches.sea_son), '2023-10-27 19:15', '2023-10-27 19:15', 2, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Khánh Hòa', (SELECT id FROM clubs WHERE name_club = 'Khánh Hòa' AND sea_son = matches.sea_son), 'Thép Xanh Nam Định', (SELECT id FROM clubs WHERE name_club = 'Thép Xanh Nam Định' AND sea_son = matches.sea_son), '2023-10-28 18:00', '2023-10-28 18:00', 2, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'LPBank Hoàng Anh Gia Lai', (SELECT id FROM clubs WHERE name_club = 'LPBank Hoàng Anh Gia Lai' AND sea_son = matches.sea_son), 'Công An Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Công An Hà Nội' AND sea_son = matches.sea_son), '2023-10-28 17:00', '2023-10-28 17:00', 2, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Hồng Lĩnh Hà Tĩnh', (SELECT id FROM clubs WHERE name_club = 'Hồng Lĩnh Hà Tĩnh' AND sea_son = matches.sea_son), 'Sông Lam Nghệ An', (SELECT id FROM clubs WHERE name_club = 'Sông Lam Nghệ An' AND sea_son = matches.sea_son), '2023-10-28 18:00', '2023-10-28 18:00', 2, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Quảng Nam', (SELECT id FROM clubs WHERE name_club = 'Quảng Nam' AND sea_son = matches.sea_son), 'TP Hồ Chí Minh', (SELECT id FROM clubs WHERE name_club = 'TP Hồ Chí Minh' AND sea_son = matches.sea_son), '2023-10-29 17:00', '2023-10-29 17:00', 2, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'MerryLand Quy Nhơn Bình Định', (SELECT id FROM clubs WHERE name_club = 'MerryLand Quy Nhơn Bình Định' AND sea_son = matches.sea_son), 'Becamex Bình Dương', (SELECT id FROM clubs WHERE name_club = 'Becamex Bình Dương' AND sea_son = matches.sea_son), '2023-10-29 18:00', '2023-10-29 18:00', 2, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Hà Nội' AND sea_son = matches.sea_son), 'Hải Phòng', (SELECT id FROM clubs WHERE name_club = 'Hải Phòng' AND sea_son = matches.sea_son), '2023-10-29 19:15', '2023-10-29 19:15', 2, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),

    /*Round 3*/
    (SHA1(UUID()),NOW(), '2023-2024', 'Thép Xanh Nam Định', (SELECT id FROM clubs WHERE name_club = 'Thép Xanh Nam Định' AND sea_son = matches.sea_son), 'TP Hồ Chí Minh', (SELECT id FROM clubs WHERE name_club = 'TP Hồ Chí Minh' AND sea_son = matches.sea_son), '2023-11-03 18:00', '2023-11-03 18:00', 3, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Công An Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Công An Hà Nội' AND sea_son = matches.sea_son), 'Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Hà Nội' AND sea_son = matches.sea_son), '2023-11-03 19:15', '2023-11-03 19:15', 3, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'MerryLand Quy Nhơn Bình Định', (SELECT id FROM clubs WHERE name_club = 'MerryLand Quy Nhơn Bình Định' AND sea_son = matches.sea_son), 'LPBank Hoàng Anh Gia Lai', (SELECT id FROM clubs WHERE name_club = 'LPBank Hoàng Anh Gia Lai' AND sea_son = matches.sea_son), '2023-11-03 18:00', '2023-11-03 18:00', 3, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Quảng Nam', (SELECT id FROM clubs WHERE name_club = 'Quảng Nam' AND sea_son = matches.sea_son), 'Khánh Hòa', (SELECT id FROM clubs WHERE name_club = 'Khánh Hòa' AND sea_son = matches.sea_son), '2023-11-04 17:00', '2023-11-04 17:00', 3, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Becamex Bình Dương' , (SELECT id FROM clubs WHERE name_club = 'Becamex Bình Dương' AND sea_son = matches.sea_son), 'Hải Phòng', (SELECT id FROM clubs WHERE name_club = 'Hải Phòng' AND sea_son = matches.sea_son), '2023-11-04 18:00', '2023-11-04 18:00', 3, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Đông Á Thanh Hóa', (SELECT id FROM clubs WHERE name_club = 'Đông Á Thanh Hóa' AND sea_son = matches.sea_son), 'Sông Lam Nghệ An', (SELECT id FROM clubs WHERE name_club = 'Sông Lam Nghệ An' AND sea_son = matches.sea_son), '2023-11-04 18:00', '2023-11-04 18:00', 3, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Thể Công - Viettel', (SELECT id FROM clubs WHERE name_club = 'Thể Công - Viettel' AND sea_son = matches.sea_son), 'Hồng Lĩnh Hà Tĩnh', (SELECT id FROM clubs WHERE name_club = 'Hồng Lĩnh Hà Tĩnh' AND sea_son = matches.sea_son), '2023-11-04 19:15', '2023-11-04 19:15', 3, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),

    /*Round 4*/
    (SHA1(UUID()),NOW(), '2023-2024', 'Sông Lam Nghệ An', (SELECT id FROM clubs WHERE name_club = 'Sông Lam Nghệ An' AND sea_son = matches.sea_son), 'Quảng Nam', (SELECT id FROM clubs WHERE name_club = 'Quảng Nam' AND sea_son = matches.sea_son), '2023-12-02 17:00', '2023-12-02 17:00', 4, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Khánh Hòa', (SELECT id FROM clubs WHERE name_club = 'Khánh Hòa' AND sea_son = matches.sea_son), 'Đông Á Thanh Hóa', (SELECT id FROM clubs WHERE name_club = 'Đông Á Thanh Hóa' AND sea_son = matches.sea_son), '2023-12-02 18:00', '2023-12-02 18:00', 4, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'LPBank Hoàng Anh Gia Lai', (SELECT id FROM clubs WHERE name_club = 'LPBank Hoàng Anh Gia Lai' AND sea_son = matches.sea_son), 'Becamex Bình Dương', (SELECT id FROM clubs WHERE name_club = 'Becamex Bình Dương' AND sea_son = matches.sea_son), '2023-12-03 17:00', '2023-12-03 17:00', 4, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Hồng Lĩnh Hà Tĩnh', (SELECT id FROM clubs WHERE name_club = 'Hồng Lĩnh Hà Tĩnh' AND sea_son = matches.sea_son), 'Thép Xanh Nam Định', (SELECT id FROM clubs WHERE name_club = 'Thép Xanh Nam Định' AND sea_son = matches.sea_son), '2023-12-03 17:00', '2023-12-03 17:00', 4, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Hà Nội' AND sea_son = matches.sea_son), 'MerryLand Quy Nhơn Bình Định', (SELECT id FROM clubs WHERE name_club = 'MerryLand Quy Nhơn Bình Định' AND sea_son = matches.sea_son), '2023-12-03 19:15', '2023-12-03 19:15', 4, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'TP Hồ Chí Minh', (SELECT id FROM clubs WHERE name_club = 'TP Hồ Chí Minh' AND sea_son = matches.sea_son), 'Thể Công - Viettel', (SELECT id FROM clubs WHERE name_club = 'Thể Công - Viettel' AND sea_son = matches.sea_son), '2023-12-03 19:15', '2023-12-03 19:15', 4, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Hải Phòng', (SELECT id FROM clubs WHERE name_club = 'Hải Phòng' AND sea_son = matches.sea_son), 'Công An Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Công An Hà Nội' AND sea_son = matches.sea_son), '2023-12-04 18:00', '2023-12-04 18:00', 4, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),

    /*Round 5*/
    (SHA1(UUID()),NOW(), '2023-2024', 'Thép Xanh Nam Định', (SELECT id FROM clubs WHERE name_club = 'Thép Xanh Nam Định' AND sea_son = matches.sea_son), 'Công An Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Công An Hà Nội' AND sea_son = matches.sea_son), '2023-12-09 18:00', '2023-12-09 18:00', 5, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'LPBank Hoàng Anh Gia Lai', (SELECT id FROM clubs WHERE name_club = 'LPBank Hoàng Anh Gia Lai' AND sea_son = matches.sea_son), 'Thể Công - Viettel', (SELECT id FROM clubs WHERE name_club = 'Thể Công - Viettel' AND sea_son = matches.sea_son), '2023-12-08 17:00', '2023-12-08 17:00', 5, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'MerryLand Quy Nhơn Bình Định', (SELECT id FROM clubs WHERE name_club = 'MerryLand Quy Nhơn Bình Định' AND sea_son = matches.sea_son), 'Đông Á Thanh Hóa', (SELECT id FROM clubs WHERE name_club = 'Đông Á Thanh Hóa' AND sea_son = matches.sea_son), '2023-12-09 18:00', '2023-12-09 18:00', 5, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(),'2023-2024', 'TP Hồ Chí Minh', (SELECT id FROM clubs WHERE name_club = 'TP Hồ Chí Minh' AND sea_son = matches.sea_son), 'Hải Phòng', (SELECT id FROM clubs WHERE name_club = 'Hải Phòng' AND sea_son = matches.sea_son), '2023-12-09 19:15', '2023-12-09 19:15', 5, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Hồng Lĩnh Hà Tĩnh', (SELECT id FROM clubs WHERE name_club = 'Hồng Lĩnh Hà Tĩnh' AND sea_son = matches.sea_son), 'Quảng Nam', (SELECT id FROM clubs WHERE name_club = 'Quảng Nam' AND sea_son = matches.sea_son), '2023-12-10 17:00', '2023-12-10 17:00', 5, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Khánh Hòa', (SELECT id FROM clubs WHERE name_club = 'Khánh Hòa' AND sea_son = matches.sea_son), 'Becamex Bình Dương', (SELECT id FROM clubs WHERE name_club = 'Becamex Bình Dương' AND sea_son = matches.sea_son), '2023-12-10 18:00', '2023-12-10 18:00', 5, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Hà Nội' AND sea_son = matches.sea_son), 'Sông Lam Nghệ An', (SELECT id FROM clubs WHERE name_club = 'Sông Lam Nghệ An' AND sea_son = matches.sea_son), '2023-12-10 19:15', '2023-12-10 19:15', 5, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),

    /*Round 6*/
    (SHA1(UUID()),NOW(), '2023-2024', 'Công An Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Công An Hà Nội' AND sea_son = matches.sea_son), 'Quảng Nam', (SELECT id FROM clubs WHERE name_club = 'Quảng Nam' AND sea_son = matches.sea_son), '2023-12-15 19:15', '2023-12-15 19:15', 6, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Hồng Lĩnh Hà Tĩnh', (SELECT id FROM clubs WHERE name_club = 'Hồng Lĩnh Hà Tĩnh' AND sea_son = matches.sea_son), 'MerryLand Quy Nhơn Bình Định', (SELECT id FROM clubs WHERE name_club = 'MerryLand Quy Nhơn Bình Định' AND sea_son = matches.sea_son), '2023-12-16 17:00', '2023-12-16 17:00', 6, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Becamex Bình Dương', (SELECT id FROM clubs WHERE name_club = 'Becamex Bình Dương' AND sea_son = matches.sea_son), 'Thép Xanh Nam Định', (SELECT id FROM clubs WHERE name_club = 'Thép Xanh Nam Định' AND sea_son = matches.sea_son), '2023-12-16 18:00', '2023-12-16 18:00', 6, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Thể Công - Viettel', (SELECT id FROM clubs WHERE name_club = 'Thể Công - Viettel' AND sea_son = matches.sea_son), 'Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Hà Nội' AND sea_son = matches.sea_son), '2023-12-17 19:15', '2023-12-17 19:15', 6, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Sông Lam Nghệ An', (SELECT id FROM clubs WHERE name_club = 'Sông Lam Nghệ An' AND sea_son = matches.sea_son), 'LPBank Hoàng Anh Gia Lai', (SELECT id FROM clubs WHERE name_club = 'LPBank Hoàng Anh Gia Lai' AND sea_son = matches.sea_son), '2023-12-17 17:00', '2023-12-17 17:00', 6, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Hải Phòng', (SELECT id FROM clubs WHERE name_club = 'Hải Phòng' AND sea_son = matches.sea_son), 'Khánh Hòa', (SELECT id FROM clubs WHERE name_club = 'Khánh Hòa' AND sea_son = matches.sea_son), '2023-12-18 18:00', '2023-12-18 18:00', 6, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Đông Á Thanh Hóa', (SELECT id FROM clubs WHERE name_club = 'Đông Á Thanh Hóa' AND sea_son = matches.sea_son), 'TP Hồ Chí Minh', (SELECT id FROM clubs WHERE name_club = 'TP Hồ Chí Minh' AND sea_son = matches.sea_son), '2023-12-18 18:00', '2023-12-18 18:00', 6, 'Đi', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),


    /*Round 14*/
    (SHA1(UUID()),NOW(), '2023-2024', 'LPBank Hoàng Anh Gia Lai', (SELECT id FROM clubs WHERE name_club = 'LPBank Hoàng Anh Gia Lai' AND sea_son = matches.sea_son), 'Khánh Hòa', (SELECT id FROM clubs WHERE name_club = 'Khánh Hòa' AND sea_son = matches.sea_son), '2024-03-30 17:00', '2024-03-30 17:00', 14, 'Về', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Sông Lam Nghệ An', (SELECT id FROM clubs WHERE name_club = 'Sông Lam Nghệ An' AND sea_son = matches.sea_son), 'Hải Phòng', (SELECT id FROM clubs WHERE name_club = 'Hải Phòng' AND sea_son = matches.sea_son), '2024-03-30 18:00', '2024-03-30 18:00', 14, 'Về', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Thể Công - Viettel', (SELECT id FROM clubs WHERE name_club = 'Thể Công - Viettel' AND sea_son = matches.sea_son), 'Quảng Nam', (SELECT id FROM clubs WHERE name_club = 'Quảng Nam' AND sea_son = matches.sea_son), '2024-03-30 19:15', '2024-03-30 19:15', 14, 'Về', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Hồng Lĩnh Hà Tĩnh', (SELECT id FROM clubs WHERE name_club = 'Hồng Lĩnh Hà Tĩnh' AND sea_son = matches.sea_son), 'Becamex Bình Dương' , (SELECT id FROM clubs WHERE name_club = 'Becamex Bình Dương' AND sea_son = matches.sea_son), '2024-03-31 17:00', '2024-03-31 17:00', 14, 'Về', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Đông Á Thanh Hóa', (SELECT id FROM clubs WHERE name_club = 'Đông Á Thanh Hóa' AND sea_son = matches.sea_son), 'Công An Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Công An Hà Nội' AND sea_son = matches.sea_son), '2024-03-31 18:00', '2024-03-31 18:00', 14, 'Về', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'MerryLand Quy Nhơn Bình Định', (SELECT id FROM clubs WHERE name_club = 'MerryLand Quy Nhơn Bình Định' AND sea_son = matches.sea_son), 'TP Hồ Chí Minh', (SELECT id FROM clubs WHERE name_club = 'TP Hồ Chí Minh' AND sea_son = matches.sea_son), '2024-03-31 18:00', '2024-03-31 18:00', 14, 'Về', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) ),
    (SHA1(UUID()),NOW(), '2023-2024', 'Hà Nội', (SELECT id FROM clubs WHERE name_club = 'Hà Nội' AND sea_son = matches.sea_son), 'Thép Xanh Nam Định', (SELECT id FROM clubs WHERE name_club = 'Thép Xanh Nam Định' AND sea_son = matches.sea_son), '2024-03-31 19:15', '2024-03-31 19:15', 14, 'Về', (SELECT stadium_name FROM stadia WHERE club_id = matches.id_club_one) );











