"use strict";

// DOM selector
// Register DOM selector
const registerBtn = document.getElementById("btn-submit");
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passWordInput = document.getElementById("input-password");
const confirmPassWordInput = document.getElementById("input-password-confirm");

// Register button
registerBtn.addEventListener("click", function () {
  // Lấy dữ liệu nhập từ người dùng đồng thời khởi tạo luôn user mới
  const registerData = new User(
    firstNameInput.value,
    lastNameInput.value,
    userNameInput.value,
    passWordInput.value
  );
  console.log(registerData);
  //   Validate dữ liệu hợp lệ
  const validate = validateData(registerData);
  console.log(validate);
  if (validate) {
    // Thêm user vào mảng
    userArr.push(registerData);
    // Lưu vào local storage
    saveToStorage("userArr", userArr);
    // Thông báo đăng kí thành công
    alert("Register successed");

    // Chuyển trang đến màn hình login
    window.location.href = "../pages/login.html";
  }
});

// Validate check function
// Không trường nào bị bỏ trống
function validateData(registerData) {
  if (registerData.firstName.trim() === "") {
    alert("Please input for firstname");
    return false;
  }
  if (registerData.lastName.trim() === "") {
    alert("Please input for lastname");
    return false;
  }
  if (registerData.userName.trim() === "") {
    alert("Please input for username");
    return false;
  }
  if (registerData.passWord.trim() === "") {
    alert("Please input for password");
    return false;
  }
  if (confirmPassWordInput.value === "") {
    alert("Please input for confirm password");
    return false;
  }
  // Username không được trùng với người khác
  for (let i = 0; i < userArr.length; i++) {
    if (registerData.userName === userArr[i].userName) {
      alert("Username has already used by someone else!");
      return false;
    }
  }
  //   Password và confirm password phải giống nhau
  if (registerData.passWord !== confirmPassWordInput.value) {
    alert("Password and Confirm password must be the same!");
    return false;
  }
  //   Password phải có trên 8 kí tự
  if (registerData.passWord.length <= 8) {
    alert("Password must contain at least 8 characters");
    return false;
  }
  return true;
}
