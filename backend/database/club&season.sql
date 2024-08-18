# CREATE DATABASE SE104;
USE SE104;

 -- Create a table `sea_sons` with the following columns:
    INSERT INTO `sea_sons` (`id`,`name`, `country`, `sea_son`) VALUES
      (SHA1(UUID()), 'NightWolf', 'VietNam', '2021-2022'),
      (SHA1(UUID()), 'NightWolf', 'VietNam', '2022-2023'),
      (SHA1(UUID()), 'NightWolf', 'VietNam', '2023-2024');

SELECT * FROM sea_sons;
-- Create a table `clubs` with the following columns:


-- 2021-22
INSERT INTO `clubs` (`id`, `sea_son_id`,`name_club`, `shorthand`,`domain_email`,`sea_son`,`created_at`,`created_by`) VALUES
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'Becamex Bình Dương', 'BDFC', 'bdfc.vn', '2021-2022', NOW(), 'admin'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'Sài Gòn', 'SGFC', 'sgfc.vn','2021-2022', NOW(), 'admin'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'Đông Á Thanh Hóa', 'THFC', 'thfc.vn','2021-2022', NOW() , 'admin'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'Hà Nội', 'HNFC', 'hnfc.vn', '2021-2022', NOW(), 'admin'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'Hải Phòng', 'HPFC', 'hpfc.vn','2021-2022', NOW(), 'admin'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'LPBank Hoàng Anh Gia Lai', 'LPBHA', 'lpbha.vn','2021-2022', NOW(), 'admin'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'Hồng Lĩnh Hà Tĩnh', 'HLHT', 'hlht.vn','2021-2022', NOW(), 'admin'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'Thể Công - Viettel', 'TCVT', 'tcvt.vn', '2021-2022', NOW(), 'admin'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'MerryLand Quy Nhơn Bình Định', 'MQBĐ', 'mqbd.vn', '2021-2022',NOW(), 'admin'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'Sông Lam Nghệ An', 'SLNA', 'slna.vn', '2021-2022', NOW(), 'admin'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'Thép Xanh Nam Định', 'TXND', 'txnd.vn', '2021-2022', NOW(), 'admin'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'TP Hồ Chí Minh', 'HCMC', 'hcmc.vn', '2021-2022', NOW(), 'admin'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2021-2022'), 'SHB Đà Nẵng', 'SHBĐN', 'shbdn.vn', '2021-2022', NOW(), 'admin');

-- 2022-23
INSERT INTO `clubs` (`id`, `sea_son_id`, `name_club`, `shorthand`,`domain_email`,`sea_son`,`created_at`,`created_by`,`link_logo`) VALUES
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'Becamex Bình Dương', 'BDFC', 'bdfc.vn', '2022-2023', NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/c/cb/Logo_Becamex_B%C3%ACnh_D%C6%B0%C6%A1ng_2021.png'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'Công An Hà Nội', 'CAHN', 'cahn.vn', '2022-2023', NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/3/38/Logo_CAHN_FC.svg/800px-Logo_CAHN_FC.svg.png'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'Đông Á Thanh Hóa', 'THFC', 'thfc.vn', '2022-2023',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/0/03/Logo_CLB_DATH.svg/1200px-Logo_CLB_DATH.svg.png'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'Hà Nội', 'HNFC', 'hnfc.vn','2022-2023',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/3/30/Ha_Noi_FC_logo_%28no_star%29.png'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'Hải Phòng', 'HPFC', 'hpfc.vn', '2022-2023',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/2/21/H%E1%BA%A3i_Ph%C3%B2ng_FC_2021.svg/1200px-H%E1%BA%A3i_Ph%C3%B2ng_FC_2021.svg.png'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'LPBank Hoàng Anh Gia Lai', 'LPBHA', 'lpbha.vn', '2022-2023',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/commons/f/f0/Logo_LPBank_Hoang_Anh_Gia_Lai.jpg'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'Hồng Lĩnh Hà Tĩnh', 'HLHT', 'hlht.vn','2022-2023',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/2/21/H%E1%BA%A3i_Ph%C3%B2ng_FC_2021.svg/1200px-H%E1%BA%A3i_Ph%C3%B2ng_FC_2021.svg.png'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'Khánh Hòa', 'KHFC', 'khfc.vn', '2022-2023',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/4/49/Kh%C3%A1nh_H%C3%B2a_FC_2021.svg/1200px-Kh%C3%A1nh_H%C3%B2a_FC_2021.svg.png'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'Thể Công - Viettel', 'TCVT', 'tcvt.vn','2022-2023',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/8/80/Logo_CLB_TC-VT.svg/1200px-Logo_CLB_TC-VT.svg.png'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'MerryLand Quy Nhơn Bình Định', 'MQBĐ', 'mqbd.vn', '2022-2023',NOW(), 'admin','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsHJR6rkXFSSTbinY8nGc-R77BZo_4HGIawJCEYFGMZA&s'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'Sông Lam Nghệ An', 'SLNA', 'slna.vn', '2022-2023',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/5/5a/Logo_of_S%C3%B4ng_Lam_Ngh%E1%BB%87_An.svg/1200px-Logo_of_S%C3%B4ng_Lam_Ngh%E1%BB%87_An.svg.png'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'Thép Xanh Nam Định', 'TXND', 'txnd.vn', '2022-2023',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/8/89/Nam_%C4%90%E1%BB%8Bnh_FC_logo.svg/800px-Nam_%C4%90%E1%BB%8Bnh_FC_logo.svg.png'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'TP Hồ Chí Minh', 'HCMC', 'hcmc.vn', '2022-2023',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/5/51/Logo_CLB_TPHCM.svg/440px-Logo_CLB_TPHCM.svg.png?20230129044612'),
                                          (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2022-2023'), 'SHB Đà Nẵng', 'SHBĐN', 'shbdn.vn','2022-2023',NOW(), 'admin','https://vpf.vn/wp-content/uploads/2018/10/shb-da-nang-2021.png');


-- 2023-24
INSERT INTO `clubs` (`id`, `sea_son_id`, `name_club`, `shorthand`,`domain_email`,`sea_son`,`created_at`,`created_by`,`link_logo`) VALUES
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'Becamex Bình Dương', 'BDFC', 'bdfc.vn', '2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/c/cb/Logo_Becamex_B%C3%ACnh_D%C6%B0%C6%A1ng_2021.png'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'Công An Hà Nội', 'CAHN', 'cahn.vn', '2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/3/38/Logo_CAHN_FC.svg/800px-Logo_CAHN_FC.svg.png'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'Đông Á Thanh Hóa', 'THFC', 'thfc.vn', '2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/0/03/Logo_CLB_DATH.svg/1200px-Logo_CLB_DATH.svg.png'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'Hà Nội', 'HNFC', 'hnfc.vn', '2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/3/30/Ha_Noi_FC_logo_%28no_star%29.png'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'Hải Phòng', 'HPFC', 'hpfc.vn', '2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/2/21/H%E1%BA%A3i_Ph%C3%B2ng_FC_2021.svg/1200px-H%E1%BA%A3i_Ph%C3%B2ng_FC_2021.svg.png'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'LPBank Hoàng Anh Gia Lai', 'LPBHA', 'lpbha.vn', '2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/commons/f/f0/Logo_LPBank_Hoang_Anh_Gia_Lai.jpg'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'Hồng Lĩnh Hà Tĩnh', 'HLHT', 'hlht.vn','2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/2/21/H%E1%BA%A3i_Ph%C3%B2ng_FC_2021.svg/1200px-H%E1%BA%A3i_Ph%C3%B2ng_FC_2021.svg.png'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'Khánh Hòa', 'KHFC', 'khfc.vn', '2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/4/49/Kh%C3%A1nh_H%C3%B2a_FC_2021.svg/1200px-Kh%C3%A1nh_H%C3%B2a_FC_2021.svg.png'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'Thể Công - Viettel', 'TCVT', 'tcvt.vn', '2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/8/80/Logo_CLB_TC-VT.svg/1200px-Logo_CLB_TC-VT.svg.png'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'MerryLand Quy Nhơn Bình Định', 'MQBĐ', 'mqbd.vn', '2023-2024',NOW(), 'admin','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsHJR6rkXFSSTbinY8nGc-R77BZo_4HGIawJCEYFGMZA&s'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'Sông Lam Nghệ An', 'SLNA', 'slna.vn', '2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/5/5a/Logo_of_S%C3%B4ng_Lam_Ngh%E1%BB%87_An.svg/1200px-Logo_of_S%C3%B4ng_Lam_Ngh%E1%BB%87_An.svg.png'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'Thép Xanh Nam Định', 'TXND', 'txnd.vn', '2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/8/89/Nam_%C4%90%E1%BB%8Bnh_FC_logo.svg/800px-Nam_%C4%90%E1%BB%8Bnh_FC_logo.svg.png'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'TP Hồ Chí Minh', 'HCMC', 'hcmc.vn', '2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/thumb/5/51/Logo_CLB_TPHCM.svg/440px-Logo_CLB_TPHCM.svg.png?20230129044612'),
                                                                                                                                      (SHA1(UUID()), (SELECT id FROM sea_sons WHERE sea_son = '2023-2024'), 'Quảng Nam', 'QNFC', 'qnfc.vn', '2023-2024',NOW(), 'admin','https://upload.wikimedia.org/wikipedia/vi/2/25/Qu%E1%BA%A3ng_Nam_FC.svg');
SELECT * FROM `clubs`
# SELECT `sea_son_id` FROM `sea_sons` WHERE `year` = '2021-2022';