"use strict";
// DOM selector
const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const saveSettingBtn = document.getElementById("btn-submit");

if (currentUser) {
  // Bắt sự kiện vào saveSetting button
  saveSettingBtn.addEventListener("click", function () {
    if (validate()) {
      currentUser.pageSize = Number.parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;

      // Lưu lại mảng currentUser xuống local
      saveToStorage("currentUser", currentUser);
      //   Thông báo thành công
      alert("Setting successed!");
      //   reset lại form nhập
      inputCategory.value = "General";
      inputPageSize.value = "";
    }
    function validate() {
      if (
        isNaN(Number.parseInt(inputPageSize.value)) ||
        Number.parseInt(inputPageSize.value) < 1
      ) {
        alert("Số trang nhập không hợp lệ");
        return false;
      }
      if (inputCategory.value === "General") {
        alert("Vui lòng chọn danh mục bạn muốn");
        return false;
      }
      return true;
    }
  });
} else {
  alert("Vui lòng đăng nhập để sử dụng ứng dụng!");
  window.location.href = "../pages/login.html";
}
