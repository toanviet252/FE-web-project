import "./column.scss";

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    fixed: "left",
    reponsive: "lg",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Giá bán (VNĐ)",
    dataIndex: "cost",
    key: "cost",
    sorter: (a, b) => a.cost - b.cost,
  },
  {
    title: "Số lượng còn lại",
    dataIndex: "remainProduct",
    key: "remainProduct",
    sorter: (a, b) => a.remainProduct - b.remainProduct,
  },
  {
    title: "Số lượng đã bán",
    dataIndex: "soldProduct",
    key: "soldProduct",
    sorter: (a, b) => a.soldProduct - b.soldProduct,
  },
  {
    title: "Tag",
    dataIndex: "tag",
    key: "tag",
  },
  {
    title: "Đối tượng sử dụng",
    dataIndex: "user",
    key: "user",
    filters: [
      {
        text: "Mèo",
        value: "Mèo",
      },
      {
        text: "Chó",
        value: "Chó",
      },
      {
        text: "Chuột",
        value: "Chuột",
      },
    ],
    onFilter: (value, record) => record.user.indexOf(value) === 0,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    filters: [
      {
        text: "Còn",
        value: "Còn",
      },
      {
        text: "Đã hết",
        value: "Đã hết",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: "Ngày đăng bán",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (onDeleteProduct, onEditProduct) => (_, record) => {
      return (
        <>
          <div className="btn-table-action">
            <button
              className="update-btn"
              onClick={() => {
                onEditProduct(record);
              }}
            >
              Chỉnh sửa
            </button>
            <button
              className="delete-btn"
              onClick={() => onDeleteProduct(record.id)}
            >
              Xóa
            </button>
          </div>
        </>
      );
    },
    fixed: "right",
  },
];
