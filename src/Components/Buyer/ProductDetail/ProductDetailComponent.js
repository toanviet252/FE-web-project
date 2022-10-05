import React, { useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import "./productdetail.scss";
import CardIcon from "../CardIcon";
import { CartContext } from "../../../contexts/CartContext/CartContext";
import CartDropdown from "../CartDropdown/CartDropdownComponent";

const ProductDetail = (props) => {
  const { productId } = useParams();
  const product = useMemo(
    () => props.products.filter((prd) => prd.id === parseInt(productId, 10))[0],
    [productId, props.products]
  );

  const cartContext = useContext(CartContext);
  const addProductToCart = () => {
    cartContext.addItemToCart(product);
  };

  return (
    <>
      <div className="product_detail_wrapper">
        <Row className="card-icon">
          <CardIcon count={cartContext.count} />
        </Row>

        {cartContext.isOpenCart && <CartDropdown />}

        <Row className="product-container">
          <Col className="image-col">
            {<img className="img-product" alt="cat-sand" src={product.image} />}
          </Col>
          <Col className="product-main-container">
            <div className="product-title">
              <h1>{product.name}</h1>
              <p>ID: {product.id}</p>
            </div>
            <div className="product-detail">
              <p>Số lượng còn lại {product.remainProduct}</p>
              <p>Số lượng đã bán {product.soldProduct}</p>
              <p>Giá: {product.cost.toLocaleString()} vnđ</p>
              <p>Đối tượng sử dụng: {product.user}</p>
              <p>Thời gian đăng bán: {product.date}</p>
            </div>
            <div className="btn-add-product-container">
              <button
                type="submit"
                className="btn-add-product"
                onClick={addProductToCart}
              >
                Thêm sản phẩm vào giỏ hàng
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductDetail;
