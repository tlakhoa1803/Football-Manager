import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isFirstSet, setIsFirstSet] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsFirstSet((prevIsFirstSet) => !prevIsFirstSet);
        setIsFadingOut(false);
      }, 1000); // Duration of fade-out animation
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = (menu) => {
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  const menuItems = [
    { name: "Lịch thi đấu và Kết quả", path: "/match" },
    { name: "Bảng xếp hạng", path: "/league-table" },
    { name: "Thông báo", path: "/thong-bao" },
    { name: "Các đội bóng", path: "/team" },
    { name: "Điều lệ", path: "/dieu-le" },
    { name: "Bình chọn", path: "/binh-chon" },
    { name: "Thư viện", path: "/thu-vien" },
    { name: "Download", path: "/download" },
  ];

  const firstDivisionMenuItems = [
    { name: "Lịch thi đấu và Kết quả", path: "/match" },
    { name: "Bảng xếp hạng", path: "/league-table" },
    { name: "Thông báo", path: "/thong-bao" },
    { name: "Các đội bóng", path: "/team" },
    { name: "Điều lệ", path: "/dieu-le" },
    { name: "Thư viện", path: "/thu-vien" },
    { name: "Download", path: "/download" },
  ];

  const firstSetLogos = [
    "https://vpf.vn/wp-content/uploads/2018/10/binh-duong-2021.png",
    "https://vpf.vn/wp-content/uploads/2018/10/cong-an-ha-noi-fc-300x300.png",
    "https://vpf.vn/wp-content/uploads/2018/10/Logo-CLB-Dong-A-Thanh-Hoa_chuan-300x249.png",
    "https://vpf.vn/wp-content/uploads/2018/10/HNFC-6-sao.png",
    "https://vpf.vn/wp-content/uploads/2018/10/haiphongfc-300x291.jpg",
    "https://vpf.vn/wp-content/uploads/2018/10/Logo-HAGL-300x300.jpg",
    "https://vpf.vn/wp-content/uploads/2018/10/Logo-Ha-Tinh-update.png",
    "https://vpf.vn/wp-content/uploads/2018/10/Binh-Dinh-300x300.png",
    "https://vpf.vn/wp-content/uploads/2018/10/Quang-Nam.jpg",
    "https://vpf.vn/wp-content/uploads/2018/10/slna-233x300.png",
    "https://vpf.vn/wp-content/uploads/2018/10/Nam-Dinh.jpg",
    "https://vpf.vn/wp-content/uploads/2018/10/HCM-FC-2023.png",
    "https://vpf.vn/wp-content/uploads/2018/10/Logo-The-Cong-Viettel.jpg",
  ];

  const secondSetLogos = [
    "https://vpf.vn/wp-content/uploads/2019/12/Ba-Ria-Vung-Tau.png",
    "https://vpf.vn/wp-content/uploads/2018/12/Dong-Nai-2023.png",
    "https://vpf.vn/wp-content/uploads/2018/10/dong-thap-2023.png",
    "https://vpf.vn/wp-content/uploads/2023/02/hoa-binh.png",
    "https://vpf.vn/wp-content/uploads/2018/10/Hue.jpg",
    "https://vpf.vn/wp-content/uploads/2018/10/Long-An.jpg",
    "https://vpf.vn/wp-content/uploads/2019/01/Phu-Dong-Ninh-Binh_new-300x259.jpg",
    "https://vpf.vn/wp-content/uploads/2021/02/Phu-Tho.png",
    "https://vpf.vn/wp-content/uploads/2019/01/PVF-CAND.png",
    "https://vpf.vn/wp-content/uploads/2018/10/shb-da-nang-2021.png",
    "https://vpf.vn/wp-content/uploads/2018/10/LOGO-TRuong-Tuoi-Binh-Phuoc_update.png",
  ];

  const [position, setPosition] = useState(null); // Add a new state variable for the position

  let isLogin = useSelector((state) => state.user.accessToken !== "");
  const accessToken = useSelector((state) => state.user.accessToken); // Get the accessToken from the Redux store

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the user's position when the component mounts
    const fetchPosition = async () => {
      try {
        const response = await fetch('http://localhost:8888/profile', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setPosition(data.data.position); // Set the position state variable
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    if (isLogin) {
      fetchPosition().then(r => console.log(r));
    }
  }, [isLogin, accessToken]);



  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // navigate to home page after logout
  };
  return (
    <div className="container">
      <header className="header">
        <div className="team-logos">
          <ul className={isFadingOut ? "fade-out" : ""}>
            {isFirstSet
              ? firstSetLogos.map((src, index) => (
                  <li key={index}>
                    <img src={src} alt={`Team ${index + 1}`} />
                  </li>
                ))
              : secondSetLogos.map((src, index) => (
                  <li key={index}>
                    <img src={src} alt={`Team ${index + 14}`} />
                  </li>
                ))}
          </ul>
        </div>
      </header>
      <nav className="nav">
        <div className="left-section">
          <div className="logo">
            <img src="https://vpf.vn/wp-content/uploads/2018/11/logo-vpf.png" alt="VPF Logo" />
          </div>
          <div className="title-menu">
            <div className="title-header">
              <h1>OFFICIAL WEBSITE OF</h1>
              <h2>Vietnam Professional Football</h2>
            </div>
            <ul className="menu">
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  Trang chủ
                </Link>
              </li>
              <li className="menu-item">VPF</li>
              <li className="menu-item">Highlights</li>
              <li className="menu-item">
                <Link to="/tin-tuc" className="menu-link">
                  Tin tức
                </Link>
              </li>
              <li
                onMouseEnter={() => handleMouseEnter("vô địch quốc gia")}
                onMouseLeave={handleMouseLeave}
                className="dropdown-trigger menu-item"
              >
                Vô địch quốc gia
                {hoveredMenu === "vô địch quốc gia" && (
                  <ul
                    className="dropdown-menu"
                    onMouseEnter={() => handleMouseEnter("vô địch quốc gia")}
                    onMouseLeave={handleMouseLeave}
                  >
                    {menuItems.map((item, index) => (
                      <li key={index} className="dropdown-item">
                        <Link to={item.path} className="dropdown-link">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li
                onMouseEnter={() => handleMouseEnter("hạng nhất quốc gia")}
                onMouseLeave={handleMouseLeave}
                className="dropdown-trigger menu-item"
              >
                Hạng nhất quốc gia
                {hoveredMenu === "hạng nhất quốc gia" && (
                  <ul
                    className="dropdown-menu"
                    onMouseEnter={() => handleMouseEnter("hạng nhất quốc gia")}
                    onMouseLeave={handleMouseLeave}
                  >
                    {firstDivisionMenuItems.map((item, index) => (
                      <li key={index} className="dropdown-item">
                        <Link to={item.path} className="dropdown-link">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="menu-item">Cúp quốc gia</li>
              <li className="menu-item">Thư viện</li>
              <li className="menu-item">Nhà tài trợ</li>
              {!isLogin && (
                <li className="menu-item" onClick={() => navigate("/login")}>
                  Đăng nhập
                </li>
              )}
              {isLogin && (
                <>
                  <li className="menu-item" onClick={() => navigate(position === 'Admin' ? "/admin-dashboard" : "/manager-dashboard")}>
                    {position === 'Admin' ? 'Admin Dashboard' : 'Manager Dashboard'}
                  </li>
                  <li className="menu-item" onClick={handleLogout}>
                    Logout
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
