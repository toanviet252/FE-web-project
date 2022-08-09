"use strict";

//STORAGE.JS ĐƯỢC TRUY CẬP TRƯỚC SCRIPT.JS
///////////////////////////////////////////////////////

// 1. Animation cho Sidebar
const navSidebar = document.querySelector("nav");
navSidebar.addEventListener("click", function () {
  navSidebar.classList.toggle("active");
});
//////////////////////////////////////////////////////

// Data ban đầu
// pet data demo
const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "red",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  bmi: "?",
  date: new Date(),
};
const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "green",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  bmi: "?",
  date: new Date(),
};

//Data breed
const dataBreed1 = {
  breed: "Mixed Breed",
  type: "Dog",
};
const dataBreed2 = {
  breed: "Tabby",
  type: "Cat",
};

//2. Lưu dữ liệu vào Local Storage
//Pet local storage
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2]);
}
const petArr = getFromStorage("petArr");

//Breed local storage
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [dataBreed1, dataBreed2]);
}
const breedArr = getFromStorage("breedArr") || [];

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
