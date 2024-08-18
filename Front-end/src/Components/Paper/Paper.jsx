import React from 'react';
import './Paper.css';
import { Link } from 'react-router-dom';
const Paper = () => {
  return (
    <div className="paper-container">
      <div className="header-paper">
        <h1>TIN TỨC</h1>
      </div>
      <div className="main-news">
          <div className="main-news-image">
            <Link to="/main-news">
              <img src="https://vpf.vn/wp-content/uploads/2023/10/FlagMockup-HNQG-2324-741x486.jpg" alt="Main News" />
            </Link>
            <div className="main-news-title">
              <h2>Danh sách cầu thủ nghỉ thi đấu vòng 19 Gold Star V.League 2 – 2023/24</h2>
            </div>
          </div>
        <div className="side-news">
          <div className="side-news-item">
            <Link to="/first-news">
              <img src="https://vpf.vn/wp-content/uploads/2024/05/kquav18HNQG-648x320.jpg" alt="First-News" />
            </Link>
          <div className="side-news-title">
            <Link style={{textDecoration:"none", color:'black'}} to="/first-news">
              <h4>Vòng 18 Gold Star V.League 2-2023/24: CLB Đồng Tháp bước vào nhóm an toàn</h4>
            </Link>
          </div>
          </div>
          <div className="side-news-item">
            <Link to="/second-news">
              <img src="https://vpf.vn/wp-content/uploads/2024/05/IMG_3065-324x160.jpeg" alt="Second-News" />
            </Link>
          <div className="side-news-title">
            <Link style={{textDecoration:"none", color:'black'}} to="/second-news">
              <h4>Vòng 20 Night Wolf V.League 1-2023/24: Biến động cuộc đua nhóm đầu </h4>
            </Link>
          </div>
          </div>
          <div className="side-news-item">
            <Link to="/third-news">
              <img src="https://vpf.vn/wp-content/uploads/2024/05/pre-vong-20-nw-vl-2023-24-648x320.jpg" alt="" />
            </Link>
          <div className="side-news-title">
            <Link style={{textDecoration:"none", color:'black'}} to="/third-news">
              <h4>Trước vòng 20 Night Wolf V.League 1-2023/24: Đầy kịch tính!</h4>
            </Link>
          </div>
          </div>
        </div>
      </div>
      <div className="bottom-news">
        <div className="bottom-news-item">
          <img src="https://vpf.vn/wp-content/uploads/2024/05/BinhDinh-HaiPhong2023-24-03-100x70.jpg" alt="Bottom News" />
          <h4>Hải Phòng FC nhận cú đúp giải thưởng tháng 4 Night Wolf V.League 1 – 2023/24</h4>
        </div>
        <div className="bottom-news-item">
          <img src="https://vpf.vn/wp-content/uploads/2023/10/FlagMockup-VDQG-2324-100x70.jpg" alt="Bottom News" />
          <h4>Danh sách cầu thủ nghỉ thi đấu vòng 20 Night Wolf V.League 1 – 2023/24</h4>
        </div>
        <div className="bottom-news-item">
            <img src="https://vpf.vn/wp-content/uploads/2024/05/BinhPhuoc-DongNai2023-24-14-100x70.jpg" alt="Bottom News" />
          <h4>Vòng 18 Gold Star V.League 2-2023/24: Đeo bám quyết liệt</h4>
        </div>
        <div className="bottom-news-item">
          <h4>Vòng 18 Gold Star V.League 2-2023/24: Đeo bám quyết liệt</h4>
        </div>
      </div>
    </div>
  );
};

export default Paper;
