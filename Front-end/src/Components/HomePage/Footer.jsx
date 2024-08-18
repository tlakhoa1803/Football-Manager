import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="sponsors">
        <div className="sponsors-main">
          <h2>TÀI TRỢ CHÍNH</h2>
          <div className="sponsors-main-logos">
            <img style={{width: '400px', height: '223px', objectFit: 'cover',borderRadius:'10px', marginTop :'30px'}} src="https://vpf.vn/wp-content/uploads/2023/01/Banner-HNQG-300x167.png" alt="Gold Star V.League 2 - 2023/24" />
            <img  style={{width: '400px', height: '223px',borderRadius:'10px'}} src="https://vpf.vn/wp-content/uploads/2023/01/Banner-VDQG-300x167.png" alt="Gold Star V.League 2 - 2023/24" />
            <img style={{width: '400px', height: '223px', objectFit: 'cover',borderRadius:'10px', marginTop: '30px'}} src="https://vpf.vn/wp-content/uploads/2023/01/Banner-CupQG.png" alt="Gold Star V.League 2 - 2023/24" />
          </div>
        </div>
        <div className="sponsors-secondary">
          <h2>TÀI TRỢ ĐỒNG HÀNH</h2>
          <div className="sponsors-secondary-logos">
            <a href='https://fptplay.vn' target="_blank" rel="noreferrer">
              <img src="https://vpf.vn/wp-content/uploads/2023/01/fpt-play-2k3.png" alt="FPT Play" />
            </a>
            <a href='https://dongluc.vn/' target="_blank" rel="noreferrer">
              <img src="https://vpf.vn/wp-content/uploads/2023/01/dong-luc-2k3.png" alt="Động Lực" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-top">
        <nav className="footer-nav">
          <a href="#!">LIÊN HỆ</a>
          <a href="#!">HỎI ĐÁP</a>
          <a href="#!">CƠ HỘI NGHỀ NGHIỆP</a>
          <a href="#!">CHÍNH SÁCH BẢO MẬT</a>
          <a href="#!">ĐIỀU KHOẢN SỬ DỤNG</a>
          <a href="#!">ĐỐI TÁC</a>
        </nav>
      </div>
      <div className="footer-content">
        <div className="footer-column" style={{marginLeft : '50px'}}>
          <div className="footer-section" >
            <img style={{height:'50px', width:'50px'}} src="https://vpf.vn/wp-content/themes/VPF-child/assets/images/footer-icon-1.png" alt="Icon 1" />
            <p>
              <strong>Đơn vị chủ quản</strong>
              <br />
              <span style={{ fontSize: '15px' }}>Công ty cổ phần bóng đá chuyên nghiệp Việt Nam (VPF)</span>
            </p>
          </div>
          <div className="footer-section">
            <img style={{height:'50px',width:'50px'}} src="https://vpf.vn/wp-content/themes/VPF-child/assets/images/footer-icon-2.png" alt="Icon 2" />
            <p><strong>Địa chỉ</strong>
              <br />
              <span style={{ fontSize: '15px' }}>Số 18, Phố Lý Văn Phức, Cát Linh, Đống Đa, TP. Hà Nội.</span>
            </p>
          </div>
        </div>
        <div className="footer-column" style={{marginLeft : '50px'}}>
          <div className="footer-section" >
            <img style={{height:'50px', width:'50px'}} src="https://vpf.vn/wp-content/themes/VPF-child/assets/images/footer-icon-3.png" alt="Icon 3" />
            <p><strong>Giấy phép</strong>
              <br />
              <span style={{ fontSize: '15px' }}>Giấy phép số 4593/GP-TTĐT do sở TT&TT Hà Nội cấp ngày 31/10/2017</span>
            </p>
          </div>
          <div className="footer-section">
            <img style={{height:'50px', width:'50px'}} src="https://vpf.vn/wp-content/themes/VPF-child/assets/images/footer-icon-4.png" alt="Icon 4" />
            <p><strong>Người chịu trách nhiệm nội dung</strong>
              <br />
              <span style={{ fontSize: '15px' }}>Nguyễn Thị Thu Huyền (Trưởng phòng Truyền Thông - 02437858457 (máy lẻ 126))</span>
            </p>
          </div>
        </div>
        <div className="footer-column" style={{marginLeft : '100px'}}>
          <div className="footer-section">
            <img style={{height:'50px', width:'50px'}} src="https://vpf.vn/wp-content/themes/VPF-child/assets/images/footer-icon-5.png" alt="Icon 5" />
            <p><strong>Liên lạc</strong>
              <br />
              <span style={{ fontSize: '15px' }}>024.3785.8457/58 - FAX: 024.3785.8462</span>
            </p>
          </div>
          <div className="footer-section">
            <img style={{height:'50px', width:'50px'}} src="https://vpf.vn/wp-content/themes/VPF-child/assets/images/footer-icon-6.png" alt="" />
            <p>
              <a style={{paddingRight: '10px'}} href="https://www.vpf.vn">www.vpf.vn</a>
              <a style={{paddingRight: '10px'}} href="https://www.vnleague.com">www.vnleague.com</a>
              <a href="mailto:info@vpf.vn">info@vpf.vn</a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2018 Vietnam Professional Football All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;