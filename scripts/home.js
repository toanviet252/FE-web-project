"use strict";
// DOM selector cho HOME
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const logOutBtn = document.getElementById("btn-logout");
const welcomeMessage = document.getElementById("welcome-message");

renderHome();
/**
 * Gọi hàm render màn hình hiển thị home
 */
function renderHome() {
  if (currentUser) {
    // Nếu người dùng đã đăng nhập
    // Ản div chứa login và register, và show div chứa logout
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    // Đổi welcome text thành Welcome + tên người đăng nhập
    welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

// Bắt sự kiện vào nút logout
logOutBtn.addEventListener("click", function () {
  // xoá current user ở localstorage
  //   localStorage.removeItem("currentUser");
  currentUser = null;
  // Cập nhập lại local storage
  saveToStorage("currentUser", currentUser);
  //   Đưa phần login modal trở lại
  renderHome();
});
