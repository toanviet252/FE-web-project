import React, { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext/CartContext";
import { Row, Col } from "antd";
import "./CartDetail.scss";

function RenderItem({ item, increaseItem, decreaseItem, deleteItem }) {
  return (
    <>
      <Row className="item-container">
        <Col className="item-img-container" span={4}>
          <img src={item.image} alt="item_img" />
        </Col>
        <Col className="item_detail" span={10}>
          <h2>{item.name}</h2>
          <span>
            Số lượng:
            <button
              className="change_quantity_btn"
              onClick={() => {
                decreaseItem(item);
              }}
            >
              {" "}
              {"<"}{" "}
            </button>
            {item.quantity}
          </span>
          <button
            className="change_quantity_btn"
            onClick={() => {
              increaseItem(item);
            }}
          >
            {" "}
            {">"}{" "}
          </button>
          <p>Đơn giá: {item.cost.toLocaleString()} VNĐ</p>
          <strong>
            <p>Tổng: {(item.cost * item.quantity).toLocaleString()} VNĐ</p>
          </strong>
        </Col>
        <Col offset={8}>
          <button
            className="delete_product_btn"
            onClick={() => {
              deleteItem(item.id);
            }}
          >
            Xóa{" "}
          </button>
        </Col>
      </Row>
    </>
  );
}

const CartDetail = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.cartItems;
  //Hàm tăng số lượng, lấy luôn từ hàm addItemToCart trong CartContext
  const increaseItem = (item) => {
    cartContext.addItemToCart(item);
  };
  //Hàm giảm số lượng
  const decreaseItem = (item) => {
    cartContext.removeItemFromCart(item);
  };
  //Hàm xóa sản phẩm
  const deleteItem = (id) => cartContext.deleteItem(id);
  const total = cartContext.total;

  const listCartItemsOnCart = cartItems.map((item) => {
    return (
      <RenderItem
        item={item}
        key={item.id}
        increaseItem={increaseItem}
        decreaseItem={decreaseItem}
        deleteItem={deleteItem}
      />
    );
  });
  return (
    <>
      {listCartItemsOnCart.length ? (
        <div className="cart-container">
          {listCartItemsOnCart}
          <div className="payment_container">
            <div className="total-products">
              <h2>Tổng: {total.toLocaleString()} VNĐ</h2>
            </div>
            <div className="btn_payment_container">
              <button className="btn_payment">Thanh toán ngay!</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="Empty-cart">
          <h1>Chưa có sản phẩm nào</h1>
        </div>
      )}
    </>
  );
};
export default CartDetail;
