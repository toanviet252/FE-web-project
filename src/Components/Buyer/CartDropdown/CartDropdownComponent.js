import React from "react";
import { Link } from "react-router-dom";
import "./CartDropdown.scss";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext/CartContext";
import { Row, Col } from "antd";

function CartItem({ item }) {
  const { name, quantity, cost } = item;
  return (
    <div className="product_add_container">
      <Row className="product_add_title">
        <Col span={10} className="img_product_add">
          <img
            src={item.image}
            alt="img_product_add"
            style={{
              width: "100%",
            }}
          />
        </Col>
        <Col span={12} className="main_title_product_add">
          <h3>{name}</h3>
          <span>
            {quantity} x <strong>{cost.toLocaleString()}</strong> VNĐ{" "}
          </span>
        </Col>
      </Row>
    </div>
  );
}

const CartDropdown = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartItems;

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>", cartItems);
  const listItemOnCart = cartItems?.length ? (
    cartItems.map((item) => <CartItem key={item.id} item={item} />)
  ) : (
    <div className="empty-cart">
      <h2>Giỏ hàng trống</h2>
    </div>
  );
  return (
    <div className="card_dropdown_container">
      <div className="card_dropdown_list">
        <div className="cart_items">{listItemOnCart}</div>
        <div className="btn_container">
          <Link to="/buyer/cart">
            <button className="btn_checkout_cart">Kiểm tra giỏ hàng</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CartDropdown;
