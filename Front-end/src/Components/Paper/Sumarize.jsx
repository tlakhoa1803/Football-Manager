import React from 'react'
import './Sumarize.css'

const Sumarize = () => {
  return (
    <div className='Sumarize-container'>
        <h4>Số liệu chuyên môn sau vòng 18 Giải HNQG Bia Sao Vàng 2023/24:</h4>
        <img src='https://vpf.vn/wp-content/uploads/2023/10/FlagMockup-HNQG-2324.jpg' alt='Highlight News' />
        <h4>Số liệu chuyên môn vòng 18 Giải HNQG Bia Sao Vàng 2023/24:</h4>
        <p>
            <span>Tổng số bàn thắng: 13 bàn; Trung bình 2,60 bàn/trận</span><br />
            <span>Thẻ vàng: 14 thẻ; Trung bình 2,80 thẻ/trận</span><br />
            <span>Thẻ đỏ: 3 thẻ; Trung bình 0,60 thẻ/ trận</span><br />
            <span>Khán giả: 10.000 người, Trung bình: 2.000 người/trận;</span><br/><br/>
            <span>Cụ thể các sân:</span><br/><br/>
            <span>Sân Hoà Xuân: 1.500</span><br />
            <span>Sân Đồng Tháp: 1.200</span><br />
            <span>Sân Hoà Bình: 500</span><br />      
            <span>Sân Bình Phước: 6.000</span><br />    
            <span>Sân PVF: 800</span>      
        </p>
    </div>
  )
}

export default Sumarize