"use strict";

const userNameInput = document.getElementById("input-username");
const passWordInput = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

loginBtn.addEventListener("click", function () {
  const validate = validateData();
  console.log(validate);
  if (validate) {
    const loginUser = userArr.find(
      (item) =>
        item.userName === userNameInput.value &&
        item.passWord === passWordInput.value
    );
    // find ở trên trả về 1 object thoả mãn điều kiện (do userArray là 1 object)
    console.log(loginUser);
    // Kiểm tra username và password người dùng nhập có trùng với trong local storage hay không
    if (loginUser) {
      alert("Login succsed!");
      // Lưu vào current user array
      saveToStorage("currentUser", loginUser);
      // Chuyển hướng đến trang home
      window.location.href = "../index.html";
    } else {
      alert("Username or password is incorrect!");
    }
  }
});

// Validate
function validateData() {
  // Kiểm tra nếu người dùng để trống
  if (userNameInput.value.trim() === "") {
    alert("Please input for username");
    return false;
  }
  if (passWordInput.value.trim() === "") {
    alert("Please input for password");
    return false;
  }
  return true;
}
