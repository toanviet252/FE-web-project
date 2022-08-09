"use strict";

// Chọn DOM
const exportBtn = document.querySelector("#export-btn");
const importBtn = document.querySelector("#import-btn");
const fileInput = document.querySelector("#input-file");

//  Bắt sự kiện click vào export Button
exportBtn.addEventListener("click", saveDataFile);
// Save function
function saveDataFile() {
  //Taọ dữ liệu lưu file
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)]);
  // save flie
  saveAs(blob, "petData.json");
}

//Bắt sự kiện click vào Import btn
importBtn.addEventListener("click", function () {
  //Kiểm tra xem người dùng đã chọn file hay chưa
  if (!fileInput.value) {
    alert("Please choose JSON file");
  } else {
    const file = fileInput.files[0];
    const reader = new FileReader();
    //Tải dữ liệu file lên
    reader.addEventListener(
      "load",
      function () {
        const isValidatedFile = JSON.parse(reader.result);
        if (isValidatedFile) {
          // Save into localStorage
          saveToStorage("petArr", JSON.parse(reader.result));
          //Thông báo import thành công
          alert("Importing file is successed");
        }
      },
      false
    );
    //Read file
    if (file) {
      reader.readAsText(file);
    }
    //Reset lại giá trị input File
    fileInput.value = "";
  }
});
