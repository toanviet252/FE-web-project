"use strict";

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  //JSON.stringify để chuyển dữ liệu từ object thành string
  localStorage.setItem(key, JSON.stringify(value));
}
// Hàm lấy dữ liệu
function getFromStorage(key) {
  //JSON.parse để chuyển ngược lại dữ liệu thành object ban đầu
  return JSON.parse(localStorage.getItem(key));
}
///////////////////////////////////////////////////////

// Lấy dữ liệu từ local storage cho user
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
// console.log(users);

// Chuyển đổi users array về dạng class instance (lấy từ users object)
const userArr = users.map((user) => parseUser(user));
// console.log(userArr);
// => Trả về một array dưới dạng Class instance

// Lấy dữ liệu từ localStorage cho Task
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
// Chuyển đổi về dạng Class instance cho todoArr
const todoArr = todos.map((todo) => parseTask(todo));

// Hàm chuyển từ JS object sang Class instance của user
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.passWord,

    userData.category,
    userData.pagesize
  );

  return user;
}
// Hàm chuyển js object sang class instance cho Task class
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}

// Dữ liệu người dùng đã đăng nhập thành công
let currentUser = getFromStorage("currentUser") || null;
