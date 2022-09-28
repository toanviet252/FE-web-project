import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <h3>Chăm sóc khách hàng</h3>
        <ul>
          <li>
            <a href="#">Trung tâm trợ giúp</a>
          </li>
          <li>
            <a href="#">Hướng dẫn mua hàng</a>
          </li>
          <li>
            <a href="#">Hướng dẫn bán hàng</a>
          </li>
          <li>
            <a href="#">Vận chuyển</a>
          </li>
          <li>
            <a href="#">Chăm sóc khách hàng</a>
          </li>
          <li>
            <a href="#">Chính sách bảo hành</a>
          </li>
        </ul>
      </div>
      <div className="footer-content">
        <h3>Về chúng tôi</h3>
        <ul>
          <li>
            <a href="#">Giới thiệu</a>
          </li>
          <li>
            <a href="#">Tuyển dụng</a>
          </li>
          <li>
            <a href="#">Chính sách bảo mật</a>
          </li>
          <li>
            <a href="#">Chính hãng</a>
          </li>
          <li>
            <a href="#">Kênh người bán</a>
          </li>
          <li>
            <a href="#">Chương trình liên kết</a>
          </li>
        </ul>
      </div>
      <div className="footer-content">
        <h3>Liên hệ với chúng tôi</h3>
        <div className="social-link">
          <ul>
            <li>
              <a>
                <i className="fa fa-facebook-official" aria-hidden="true"></i>{" "}
                Facebook
              </a>
            </li>
            <li>
              <a>
                <i className="fa fa-instagram" aria-hidden="true"></i> Instagram
              </a>
            </li>
            <li>
              <a>
                <i className="fa fa-twitter" aria-hidden="true"></i> Twiter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-content">
        <h3>Phương thức thanh toán</h3>
        <img
          alt="Credit Card Logos"
          title="Credit Card Logos"
          src="http://www.credit-card-logos.com/images/visa_credit-card-logos/visa_logo_2.gif"
          width="57"
          height="36"
          border="0"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
          width="57"
          height="36"
          alt="master-card-logo"
        />
        <img
          src="https://viettelmoney.vn/wp-content/uploads/2021/11/logo_viettel_money_red_full_96.svg"
          width="57"
          height="36"
          alt="viettel-pay-logo"
        />
      </div>
      <div className="footer-content">
        <h3>Tải ứng dụng ngay</h3>
      </div>
    </div>
  );
};
export default Footer;
