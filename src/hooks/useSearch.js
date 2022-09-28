import React, { useState, useRef } from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { columns } from "../Components/ColumnsTable/column";

export const useSearch = ({ onDeleteProduct, onEditProduct }) => {
  const [, setSearchText] = useState("");
  const [, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  // Function for search
  const handleSearch = (selectedkey, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedkey[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilter) => {
    clearFilter();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    // Hàm định nghĩa icon (sẽ sáng lên khi người dùng đang tìm kiếm)
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    //
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  return columns.map((ele, key) => ({
    ...ele,
    // Thêm hàm tìm kiếm vào cột 'name' và 'tag'
    ...(ele.dataIndex === "name" || ele.dataIndex === "tag"
      ? getColumnSearchProps(ele.dataIndex)
      : ""),
    // render hàm xóa lấy từ component cha
    render:
      ele.key === "action"
        ? ele.render(onDeleteProduct, onEditProduct)
        : ele.render,
  }));
};
