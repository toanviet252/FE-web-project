"use strict";

const submitBtn = document.getElementById("submit-btn");
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");

//Submit button
submitBtn.addEventListener("click", function () {
  // Lấy dữ liệu từ Input Form
  const dataBreed = {
    breed: inputBreed.value,
    type: inputType.value,
  };

  //2. Validate data
  const validate = validateDataBreed(dataBreed);
  if (validate) {
    // Thêm thú cưng vào danh sách
    breedArr.push(dataBreed);
    //Luu vao local Storage
    saveToStorage("breedArr", breedArr);
    // Hiển thị danh sách breed
    renderTableBreed(breedArr);
    // Xoá các dữ liệu nhập trong Input Form
    clearInput();
  }
});
renderTableBreed(breedArr);
//Validate breed function
function validateDataBreed(dataBreed) {
  // Kiểm tra dữ liệu trống
  if (dataBreed.breed.trim() === "") {
    alert("Please input for Breed");
    return false;
  }
  if (dataBreed.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }
  //Nếu breed đã tồn tại
  for (let i = 0; i < breedArr.length; i++) {
    if (dataBreed.breed === breedArr[i].breed) {
      alert("Breed đã tồn tại!");
      return false;
    }
  }
  return true;
}

//Render table breed
function renderTableBreed(breedArr) {
  tableBodyEl.innerHTML = "";

  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td scope="col">${i + 1}</td>
      <td scope="col"> ${breedArr[i].breed} </td>
      <td scope="col">${breedArr[i].type} </td>
      <td >
	    <button class="btn btn-danger" onclick="deleteBreed('${
        breedArr[i].breed
      }')">Delete</button>
      </td>
      `;
    tableBodyEl.appendChild(row); //thêm phần tử row vào bảng
  }
}

//Xoá  dữ liệu nhập từ input
function clearInput() {
  inputBreed.value = "";
  inputType.value = "Select Type";
}

//Delete Button
function deleteBreed(breed) {
  const isDeleted = confirm("Are you sure?");
  if (isDeleted) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1); //Xoá 1 phần tử thứ i
        saveToStorage("breedArr", breedArr); //Cập nhật lại dữ liệu trong localStorage
        renderTableBreed(breedArr); //Cập nhật lại bảng
      }
    }
  }
}
