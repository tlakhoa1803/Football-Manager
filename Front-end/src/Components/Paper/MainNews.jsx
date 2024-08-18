import React from 'react'
import './MainNews.css'

const MainNews = () => {
  return (
    <div className='MainNews-container'>
        <h1>Danh sách cầu thủ nghỉ thi đấu vòng 19 Gold Star V.League 2 – 2023/24</h1>
        <div className='MainNews-image'>
            <img src='https://vpf.vn/wp-content/uploads/2023/10/FlagMockup-HNQG-2324.jpg' alt='Main News' />
            <div className='MainNews-title'>
                <p>Căn cứ tổng hợp kết quả các vòng đấu vừa qua của Giải bóng đá HNQG – Bia Sao Vàng 2023/24, Ban Tổ chức Giải thông báo danh sách cầu thủ nghỉ thi đấu tại trận đấu Vòng 19 của Giải, cụ thể như sau:</p>
            </div>
            <div className='MainNews-table-content'>
            <table class="suspension-table">
    <thead>
      <tr>
        <th>TT</th>
        <th>Họ và tên</th>
        <th>Số áo</th>
        <th>CLB</th>
        <th colspan="4">Trận đấu phải nghỉ</th>
        <th>Lý do</th>
      </tr>
      <tr class="sub-header">
        <th colspan="4"></th>
        <th>MT</th>
        <th>CLB</th>
        <th>-</th>
        <th>Ngày</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Trịnh Quang Trường</td>
        <td>5</td>
        <td>Đồng Tháp</td>
        <td>91</td>
        <td>SHB Đà Nẵng</td>
        <td>-</td>
        <td>Đồng Tháp</td>
        <td>Thẻ đỏ</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Lê Vũ Quốc Nhật</td>
        <td>20</td>
        <td>Phù Đổng Ninh Bình</td>
        <td>92</td>
        <td>Phù Đổng Ninh Bình</td>
        <td>-</td>
        <td>Huế</td>
        <td>3TV</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Nguyễn Tiến Đình</td>
        <td>23</td>
        <td>Phù Đổng Ninh Bình</td>
        <td>92</td>
        <td>Phù Đổng Ninh Bình</td>
        <td>-</td>
        <td>Huế</td>
        <td>Thẻ đỏ (2TV)</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Nguyễn Đức Tùng</td>
        <td>87</td>
        <td>Phú Thọ</td>
        <td>93</td>
        <td>Phú Thọ</td>
        <td>-</td>
        <td>Trường Tươi Bình Phước</td>
        <td>3TV</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Nguyễn Văn Tám</td>
        <td>22</td>
        <td>Trường Tươi Bình Phước</td>
        <td>93</td>
        <td>Phú Thọ</td>
        <td>-</td>
        <td>Trường Tươi Bình Phước</td>
        <td>Thẻ đỏ (2TV)</td>
      </tr>
    </tbody>
  </table>
            </div>
        </div>
    </div>
  )
}

export default MainNews