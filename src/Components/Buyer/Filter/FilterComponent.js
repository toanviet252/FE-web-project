import React from "react";
import "./Filter.scss";

const FilterBody = (props) => {
  return (
    <>
      <div className="box-filter">
        <h2>
          <i className="fa fa-filter" aria-hidden="true"></i> Bộ lọc tìm kiếm
        </h2>
      </div>

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
          <div className="input-range">
            <form
              onSubmit={props.handleSubmitFindProduct}
              className="form-group"
            >
              <div className="input-group">
                <input
                  className="input-min"
                  type="number"
                  id="input_minValue"
                  name="input_minValue"
                  /* cách 1: tìm trực tiếp khi input thay đổi
                value={props.price.priceMin}
                onChange={props.onhandleInputMin}
                */
                  placeholder="Giá nhỏ nhất (VNĐ)"
                />
                <input
                  className="input-max"
                  type="number"
                  id="input_maxValue"
                  name="input_maxValue"
                  // value={props.price.priceMax}
                  // onChange={props.onhandleInputMax}
                  placeholder="Giá lớn nhất (VNĐ)"
                />
              </div>
              <div className="btn-range-container">
                <button type="submit" className="btn-filter-range">
                  Lọc
                </button>
              </div>
            </form>
          </div>
          {/* <div className="price-value">
            <h3>Giá {props.price.priceMin} VNĐ</h3>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default FilterBody;
