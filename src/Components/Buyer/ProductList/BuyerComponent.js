import React, { useState } from "react";
import { Card, Row, Col, Input } from "antd";
import "./buyercomponent.scss";
import FilterBody from "../Filter/FilterComponent";
import { Link } from "react-router-dom";
import CardIcon from "../CardIcon";
import { useContext } from "react";
import CartDropdown from "../CartDropdown/CartDropdownComponent";
import { CartContext } from "../../../contexts/CartContext/CartContext";

const RenderCardProduct = ({ product, addItemToCart }) => {
  const addProductToCart = () => addItemToCart(product);
  return (
    <Col lg={4} sm={8} md={6} xs={24}>
      <Card
        className="card-container-items"
        hoverable
        style={{
          marginBottom: "0.8rem",
        }}
      >
        <Link to={`/buyer/${product.id}`}>
          <img alt="product" width="100%" src={product.image} />
          <div className="card-product-subtitle">
            <div className="card-product-title">
              <Card.Meta title={product.name}></Card.Meta>
            </div>
            <p className="cost-product">
              Giá: {product.cost.toLocaleString()} VNĐ
            </p>
            <p className="remain-product">
              {" "}
              Đã bán: <em>{product.soldProduct}</em>{" "}
            </p>
          </div>
        </Link>
        <button
          type="submit"
          className="btn_add_product"
          onClick={addProductToCart}
        >
          Thêm vào giỏ hàng
        </button>
      </Card>
    </Col>
  );
};

const BuyerPage = (props) => {
  //Add product to card
  const cartContext = useContext(CartContext);
  // Set data lấy ra mảng gồm các sản phẩm
  const [products, setProducts] = useState({
    products: props.dataProduct,
    filters: new Set(),
  });

  //Hàm lọc checkbox => Sau đó truyền xuống component FilterBody
  const handleFilterCheckbox = (event) => {
    setProducts((pre) => {
      let filters = new Set(pre.filters);
      let products = pre.products;
      //Nếu checkbox đc tích thì thêm giá trị của checkbox đó vào mảng filters
      if (event.target.checked) {
        filters.add(event.target.value);
        // Nếu đã có thì xóa đi
      } else {
        filters.delete(event.target.value);
      }
      return { filters, products };
    });
  };
  //setup hàm lọc theo khoảng giá
  const [price, setPrice] = useState({
    priceMin: "",
    priceMax: "",
  });
  // Cách 1: Hàm lọc trực tiếp khi input thay đổi
  // const onHandleInputMin = (e) => {
  //   console.log(e.target.value);
  //   setPrice(() => {
  //     return { priceMin: e.target.value, priceMax: price.priceMax };
  //   });
  // };
  // const onHandleInputMax = (e) => {
  //   console.log(e.target.value);
  //   setPrice(() => {
  //     return { priceMin: price.priceMin, priceMax: e.target.value };
  //   });
  // };
  //Cách 2: Hàm lọc khi người dùng nhất button submit
  const handleSubmitFindProduct = (event) => {
    setPrice(() => {
      return {
        priceMin: event.target.input_minValue.value,
        priceMax: event.target.input_maxValue.value,
      };
    });
    event.preventDefault();
  };

  //Tìm kiếm theo tên sản phẩm
  const [keysearch, setKeySearch] = useState("");
  const onChangeFindProduct = (e) => {
    setKeySearch(e.target.value);
    console.log(e.target.value);
  };

  const productList = products?.products
    //lọc lần 1 dùng search
    .filter((val) => {
      if (
        keysearch.length > 0 &&
        !val.name.toLowerCase().includes(keysearch.toLowerCase())
      )
        return false; //return false sẽ loại bỏ các giá trị ko chứa keyword
      //Lọc lần 2 dùng checkbox
      if (
        products.filters.size > 0 &&
        !products.filters.has(val.user) &&
        products.filters.size > 0 &&
        !products.filters.has(val.status)
        //Hoặc có thể dùng toán tử như sau:
        /*products.filters.size > 0 && !(products.filters.has(val.user) || products.filters.has(val.status))*/
      )
        return false;
      return true; //Lấy lại toàn bộ mảng khi không chạy vào 2 if
    })
    //Lọc theo khoảng giá
    .filter((prd) => {
      if (prd.cost < parseInt(price.priceMin)) return false;
      if (prd.cost > parseInt(price.priceMax)) return false;
      return true;
    })
    //trả về mảng sau khi lọc
    .map((product) => {
      return (
        <RenderCardProduct
          product={product}
          key={product.id}
          addItemToCart={cartContext.addItemToCart}
        />
      );
    });

  return (
    <>
      <div className="body-field-wrapper">
        <Row className="field-search">
          <Col lg={8} md={10} xs={12} className="input-field">
            <Input.Search
              className="input-search"
              placeholder="Tìm theo tên sản phẩm"
              onChange={onChangeFindProduct}
            />
          </Col>
          <Col>
            <CardIcon count={cartContext.count} />
          </Col>
        </Row>

        {/* Mở giở hàng chỉ khi click vào icon cart */}
        {cartContext.isOpenCart && <CartDropdown />}

        <Row className="main-content">
          <Col className="filter-body" span={6}>
            <FilterBody
              onFiterChange={handleFilterCheckbox}
              /* Hàm dùng cho cách 1
              onhandleInputMin={onHandleInputMin}
              onhandleInputMax={onHandleInputMax}
              */
              handleSubmitFindProduct={handleSubmitFindProduct}
            />
          </Col>
          <Col className="product-body" span={17}>
            <div className="card-container">
              <Row gutter={10}>{productList}</Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default BuyerPage;
