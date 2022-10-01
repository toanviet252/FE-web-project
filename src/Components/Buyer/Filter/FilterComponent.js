import React from "react";
// import { Input, Form, Button } from "antd";

const FilterBody = (props) => {
  // const [form] = Form.useForm();
  // const onFinish = (value) => {
  //   console.log(value);
  //   form.resetFields();
  // };
  return (
    <>
      <h1>Bộ lọc tìm kiếm</h1>
      <div className="user-checkbox">
        <h3>Đối tượng sử dụng:</h3>
        <div className="checkbox-container">
          <div className="checkbox-input">
            <p>Gâu Gâu:</p>
            <input type="checkbox" value="Chó" onChange={props.onFiterChange} />
          </div>
          <div className="checkbox-input">
            <p>Meo Meo:</p>
            <input type="checkbox" value="Mèo" onChange={props.onFiterChange} />
          </div>
          <div className="checkbox-input">
            <p>Chít Chít:</p>
            <input
              type="checkbox"
              value="Chuột"
              onChange={props.onFiterChange}
            />
          </div>
        </div>
        <h3>Tình trạng hàng hóa:</h3>
        <div className="checkbox-container">
          <div className="checkbox-input ">
            <p>Còn:</p>
            <input type="checkbox" value="Còn" onChange={props.onFiterChange} />
          </div>
          <div className="checkbox-input ">
            <p>Đã hết:</p>
            <input
              type="checkbox"
              value="Đã hết"
              onChange={props.onFiterChange}
            />
          </div>
        </div>
      </div>

      <div className="cost-range">
        <h3>Theo khoảng giá:</h3>
        <div className="range-filter">
          {/* <Form form={form} name="input-range-cost" onFinish={onFinish}>
            <Form.Item name="min-value" label="Từ">
              <Input type="number" placeholder="Giá nhỏ nhất" />
            </Form.Item>
            <Form.Item name="max-value" label="Đến">
              <Input type="number" placeholder="Giá lớn nhất" />
            </Form.Item>
            <div className="btn-cost-container">
              <Button type="primary" htmlType="submit">
                Lọc
              </Button>
            </div>
          </Form> */}
          <div className="input-range">
            <input
              type="range"
              onInput={props.onhandleInput}
              min="0"
              max="300000"
            />
          </div>
          <div className="price-value">
            <h3>Giá {props.price.toLocaleString()} VNĐ</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBody;
