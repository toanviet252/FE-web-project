import React, { useCallback, useState, useContext } from "react";
import { Modal, Table, Form, Input, Select, message } from "antd";
import "./table.scss";
import { useSearch } from "../../hooks/useSearch";
import { Option } from "antd/lib/mentions";
import dateFormat from "dateformat";
import { CartContext } from "../../contexts/CartContext/CartContext";

const ProductTable = (props) => {
  const cartContext = useContext(CartContext);
  const { products, addProduct, deleteProduct, editProduct } = cartContext;
  // Các hàm và hook update sản phẩm:
  const [openEdit, setOpenEdit] = useState(false);
  const [dataRecord, setdataRecord] = useState(null);
  const onEditProduct = (record) => {
    console.log(record);
    setOpenEdit(true);
    setdataRecord({ ...record });
  };
  const onSubmitEdit = () => {
    // setDataTable((pre) => {
    //   return pre.map((product) => {
    //     if (product.id === dataRecord.id) {
    //       return dataRecord;
    //     } else {
    //       return product;
    //     }
    //   });
    // });
    editProduct(dataRecord);
    setOpenEdit(false);
    message.success("Cập nhật thành công.");
  };
  const onChangeData = useCallback((key, value) => {
    setdataRecord((pre) => {
      const tmp = { ...pre };
      tmp[key] = value?.target?.value ?? value;
      return tmp;
    });
  }, []);

  // const [dataTable, setDataTable] = useState(cartContext.products);
  // const [dataTable, setDataTable] = useState(props.dataProduct);

  // useEffect(() => {
  //   setDataTable(cartContext.products);
  // }, [cartContext.products]);

  //Xóa cột
  const onDeleteProduct = useCallback(
    (id) => {
      Modal.confirm({
        title: "Bạn có muốn xóa cột?",
        onOk: () => {
          deleteProduct(id);
          message.success("Xóa thành công");
        },
        okText: "Có",
        cancelText: "Không",
        okType: "danger",
      });
    },
    [deleteProduct]
  );

  const customColums = useSearch({ onDeleteProduct, onEditProduct }); //truyền hàm delete và update xuống

  // Thêm sản phẩm
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onAddProduct = (values) => {
    //tạo sản phẩm từ input
    const newProduct = {
      id: parseInt(Math.random() * 100),
      name: values.name,
      cost: values.cost,
      remainProduct: values.remainProduct ? values.remainProduct : "0",
      soldProduct: 0,
      tag: values.tag,
      user: values.user,
      date: dateFormat(new Date(), "yyyy/mm/dd"),
      status: "Còn",
    };
    console.log(newProduct);
    //Thêm vào data table
    addProduct(newProduct);
    setOpen(false);
    message.success("Đã thêm sản phẩm.");
  };
  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onAddProduct(values);
      })
      .catch((err) => {
        console.log("validate error", err);
      });
  };
  //For select tag
  const children = [];

  return (
    <div className="table-wrapper" key={customColums.key}>
      {/* Modal form thêm sản phẩm */}
      <Modal
        open={open}
        title="Thêm sảm phẩm"
        onCancel={() => {
          setOpen(false);
        }}
        onOk={onSubmit}
        okText="Thêm"
      >
        <Form
          form={form}
          layout="hoziontal"
          size="small"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá bán (VNĐ)"
            name="cost"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống.",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Số lượng còn lại" name="remainProduct">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Tag" name="tag">
            <Select mode="tags" placeholder="Nhập tag cho sản phẩm">
              {children}
            </Select>
          </Form.Item>
          <Form.Item
            label="Đối tượng sử dụng"
            name="user"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              <Option value="Mèo">Mèo</Option>
              <Option value="Chó">Chó</Option>
              <Option value="Chuột">Chuột</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <button type="submit" onClick={onOpen} className="btn-add-product">
        Thêm sản phẩm mới
      </button>

      {/* Modal form update sản phẩm */}
      <Modal
        title="Chỉnh sửa sản phẩm"
        open={openEdit}
        onCancel={() => {
          setOpenEdit(false);
        }}
        okText="Cập nhật"
        onOk={onSubmitEdit}
      >
        <Form
          layout="hoziontal"
          size="small"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item label="Tên sản phẩm">
            <Input
              value={dataRecord?.name}
              onChange={(e) => {
                onChangeData("name", e);
              }}
            />
          </Form.Item>
          <Form.Item label="Giá bán (VNĐ)">
            <Input
              type="number"
              value={dataRecord?.cost}
              onChange={(e) => {
                onChangeData("cost", e);
              }}
            />
          </Form.Item>
          <Form.Item label="Số lượng còn lại">
            <Input
              type="number"
              value={dataRecord?.remainProduct}
              onChange={(e) => {
                onChangeData("remainProduct", e);
              }}
            />
          </Form.Item>
          <Form.Item label="Tag">
            <Input
              value={dataRecord?.tag}
              mode="tag"
              onChange={(e) => {
                onChangeData("tag", e);
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Đối tượng sử dụng" required>
            <Select
              value={dataRecord?.user}
              onChange={(e) => {
                onChangeData("user", e);
              }}
            >
              <Select.Option value="Chó">Chó</Select.Option>
              <Select.Option value="Mèo">Mèo</Select.Option>
              <Select.Option value="Chuột">Chuột</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Trạng thái ">
            <Select
              value={dataRecord?.status}
              onChange={(e) => {
                onChangeData("status", e);
              }}
            >
              <Select.Option value="Còn">Còn</Select.Option>
              <Select.Option value="Đã hết">Đã hết</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* In dữ liệu bảng */}
      <Table
        bordered
        size="medium"
        columns={customColums}
        dataSource={products}
        rowKey={"id"}
        scroll={{
          x: 1500,
        }}
      ></Table>
    </div>
  );
};

export default ProductTable;
