import React, { useState } from "react";
import { ProductData } from "../../shared/dataTable";
import { Card, Row, Col, Input } from "antd";
import "./buyercomponent.scss";
import FilterBody from "./Filter/FilterComponent";

const RenderCardProduct = ({ product }) => {
  return (
    <Col lg={4} sm={8} md={6} xs={24}>
      <Card
        className="card-container-items"
        hoverable
        style={{
          marginBottom: "15px",
        }}
      >
        <img
          alt="product"
          width="100%"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsJ-PuDmoX445sgh2W4NPWP81yfHpik12A6Q&usqp=CAU"
        />
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
      </Card>
    </Col>
  );
};

const BuyerPage = () => {
  // Set data lấy ra mảng gồm các sản phẩm
  const [products, setProducts] = useState({
    products: ProductData,
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
  // Hàm lọc theo khoảng giá
  // const handlecheckMinValue = (event) => {
  //   setProducts((pre) => {
  //     let products = pre.products;
  //     if (event.target.value === "") return products;
  //     else {
  //       for (let i = 0; i < products.length; i++) {
  //         if (products[i].cost < event.target.value) {
  //           products.splice(i, 1);
  //         }
  //       }
  //     }
  //     return products;
  //   });
  // };
  //setup hàm lọc theo khoảng giá
  const [price, setPrice] = useState(20000);
  const onHandleInput = (e) => {
    console.log(e.target.value);
    setPrice(e.target.value);
  };

  const [keysearch, setKeySearch] = useState("");
  const onChangeFindProduct = (e) => {
    setKeySearch(e.target.value);
    console.log(e.target.value);
  };

  const productList = products.products
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
      if (prd.cost < price) return false;
      return true;
    })

    //trả về mảng sau khi lọc
    .map((product) => {
      return <RenderCardProduct product={product} key={product.id} />;
    });
  return (
    <>
      <div className="body-field-wrapper">
        <Row className="field-search">
          <Col lg={8} md={10} xs={12}>
            <Input.Search
              className="input-search"
              placeholder="Tìm theo tên sản phẩm"
              onChange={onChangeFindProduct}
            />
          </Col>
        </Row>
        <Row className="main-content">
          <Col className="filter-body" span={6}>
            <FilterBody
              onFiterChange={handleFilterCheckbox}
              // handlecheckMinValue={handlecheckMinValue}
              onhandleInput={onHandleInput}
              price={price}
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
