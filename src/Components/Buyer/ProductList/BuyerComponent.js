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
            <p className="sold-product">
              {" "}
              Đã bán: <em>{product.soldProduct}</em>{" "}
            </p>
          </div>
        </Link>
        <div className="btn-add-product-container">
          <button
            type="submit"
            className="btn_add_product"
            onClick={addProductToCart}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </Card>
    </Col>
  );
};

const BuyerPage = () => {
  //Add product to card
  const cartContext = useContext(CartContext);
  // Set data lấy ra mảng gồm các sản phẩm
  const [filter, setFilter] = useState({
    tags: new Set(),
    priceRange: {
      priceMin: undefined,
      priceMax: undefined,
    },
    search: undefined,
    sort: {
      sortBy: undefined,
      direction: undefined,
    },
  });

  //Hàm lọc checkbox => Sau đó truyền xuống component FilterBody
  const handleFilterCheckbox = (event) => {
    setFilter((pre) => {
      let filters = new Set(pre.filters);

      //Nếu checkbox đc tích thì thêm giá trị của checkbox đó vào mảng filters
      if (event.target.checked) {
        filters.add(event.target.value);
        // Nếu đã có thì xóa đi
      } else {
        filters.delete(event.target.value);
      }
      return {
        ...pre,
        tags: filters,
      };
    });
  };
  // Hàm lọc khi người dùng nhất button submit
  const handleSubmitFindProduct = (event) => {
    setFilter((pre) => {
      return {
        ...pre,
        priceRange: {
          priceMin: event.target.input_minValue.value,
          priceMax: event.target.input_maxValue.value,
        },
      };
    });
    event.preventDefault();
  };

  //Tìm kiếm theo tên sản phẩm
  const onChangeFindProduct = (e) => {
    setFilter((pre) => ({
      ...pre,
      search: e.target.value,
    }));
  };

  //Sort list
  const sortByProductPrice = (sorttype, prdProperty) => {
    setFilter((pre) => ({
      ...pre,
      sort: {
        sortBy: prdProperty,
        direction: sorttype,
      },
    }));
  };

  const List = cartContext?.products
    //lọc lần 1 dùng search
    ?.filter((val) => {
      if (
        filter.search?.length > 0 &&
        !val.name.toLowerCase().includes(filter.search.toLowerCase())
      )
        return false; //return false sẽ loại bỏ các giá trị ko chứa keyword
      //Lọc lần 2 dùng checkbox
      if (
        filter.tags.size > 0 &&
        !filter.tags.has(val.user) &&
        filter.tags.size > 0 &&
        !filter.tags.has(val.status)
      )
        return false;
      return true; //Lấy lại toàn bộ mảng khi không chạy vào 2 if
    })
    //Lọc theo khoảng giá
    .filter((prd) => {
      if (prd.cost < parseInt(filter.priceRange.priceMin)) return false;
      if (prd.cost > parseInt(filter.priceRange.priceMax)) return false;
      return true;
    })
    .sort((a, b) =>
      filter.sort.direction === "increase"
        ? a[filter.sort.sortBy] - b[filter.sort.sortBy]
        : b[filter.sort.sortBy] - a[filter.sort.sortBy]
    )
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
        <Row className="btn-sort-row-feild">
          <div className="btn-sort-container">
            <button
              className="btn-sort"
              onClick={() => sortByProductPrice("increase", "cost")}
            >
              <i className="fa fa-sort-amount-asc" aria-hidden="true"></i> Giá
              tăng dần
            </button>
            <button
              className="btn-sort"
              onClick={() => sortByProductPrice("decrease", "cost")}
            >
              <i className="fa fa-sort-amount-desc" aria-hidden="true"></i> Giá
              giảm dần
            </button>
            <button
              className="btn-sort"
              onClick={() => sortByProductPrice("decrease", "remainProduct")}
            >
              <i className="fa fa-sort-amount-desc" aria-hidden="true"></i> Còn
              nhiều
            </button>
            <button
              className="btn-sort"
              onClick={() => sortByProductPrice("increase", "remainProduct")}
            >
              <i className="fa fa-sort-amount-asc" aria-hidden="true"></i> Còn
              ít
            </button>
            <button
              className="btn-sort"
              onClick={() => sortByProductPrice("decrease", "soldProduct")}
            >
              <i className="fa fa-star" aria-hidden="true"></i> Bán chạy
            </button>
          </div>
        </Row>
        <Row className="main-content">
          <Col className="filter-body" span={6}>
            <FilterBody
              onFiterChange={handleFilterCheckbox}
              handleSubmitFindProduct={handleSubmitFindProduct}
            />
          </Col>
          <Col className="product-body" span={17}>
            <div className="card-container">
              <Row gutter={10}>{List}</Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default BuyerPage;
