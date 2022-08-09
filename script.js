"use strict";

//////////////////////////////////////////////
//ASSIGNMENT 1

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const calcBMIBtn = document.getElementById("BMI-btn");

////////////////////////////////////////////////////////////////
// Phần thuộc Assignment 2
// Hiển thị Breed trong màn hình quản lý thú cưng
//Bắt sự kiện click vào input Type
typeInput.addEventListener("click", renderBreed);
// Tạo hàm renderBreed
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  //Neu type Input chon la Dog
  if (typeInput.value === "Dog") {
    //Tạo Array cho Dog lọc từ array Breed
    const breedDog = breedArr.filter((item) => item.type === "Dog");
    //Tạo function với các giá trị trong array Dog
    breedDog.forEach(function (item) {
      const option = document.createElement("option");
      option.innerHTML = `${item.breed}`;
      //Add option vào Breed input
      breedInput.appendChild(option);
    });
  }
  // Neu input type la Cat
  if (typeInput.value === "Cat") {
    //Loc Array for Cat
    const breedCat = breedArr.filter((item) => item.type === "Cat");
    breedCat.forEach(function (item) {
      const option = document.createElement("option");
      option.innerHTML = `${item.breed}`;
      breedInput.appendChild(option);
    });
  }
}
//////////////////////////////////////////////////////////////////
// Submit Button
submitBtn.addEventListener("click", function () {
  //1. Lấy dữ liệu từ Input Form
  const data = {
    id: idInput.value,
    age: parseInt(ageInput.value),
    name: nameInput.value,
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
    date: new Date(),
  };
  //2. Validate dữ liệu hợp lệ
  const validate = validateData(data);
  console.log(validate);
  if (validate) {
    //3. Thêm thú cưng vào danh sách
    petArr.push(data);
    //Luu vao local Storage
    saveToStorage("petArr", petArr);
    //4. Hiển thị danh sách thú cưng
    renderTable(petArr);
    //5. Xoá các dữ liệu nhập trong Input Form
    clear();
  }
});

//Validate function
function validateData(data) {
  // Kiểm tra dữ liệu trống
  if (data.id.trim() === "") {
    alert("Please input for Pet ID");
    return false;
  }
  if (data.name.trim() === "") {
    alert("Please input for Pet Name");
    return false;
  }
  if (isNaN(data.age)) {
    alert("Please input for Age");
    return false;
  }
  if (isNaN(data.weight)) {
    alert("Please input for Weight");
    return false;
  }
  if (isNaN(data.length)) {
    alert("Please input for length");
    return false;
  }
  // ID must be unique
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      return false;
    }
  }

  //Age, Weight, Length value checking
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }
  if (data.weight < 1 || data.age > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }

  //Checking selection
  if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  }
  return true;
}

// Render table function
const renderTable = function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td> ${petArr[i].name} </td>
    <td>${petArr[i].age} </td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${petArr[i].bmi}</td>
    <td>${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}</td>
    <td>
	<button class="btn btn-danger" onclick="deletePet('${
    petArr[i].id
  }')">Delete</button>
    </td>
    `;
    tableBodyEl.appendChild(row); //thêm phần tử row vào bảng
  }
};
renderTable(petArr);

//Clear Input function
const clear = function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//Deleted Pet (có cập nhật thêm so với Assign1)
function deletePet(petID) {
  const isDeleted = confirm("Are you sure?");
  if (isDeleted) {
    for (let i = 0; i < petArr.length; i++) {
      if (petID === petArr[i].id) {
        petArr.splice(i, 1); //Xoá 1 phần tử thứ i
        saveToStorage("petArr", petArr); //Cập nhật lại dữ liệu trong localStorage
        renderTable(petArr); //Cập nhật lại bảng
      }
    }
  }
}

//Healthy Button
let healthyCheked = true;
healthyBtn.addEventListener("click", function () {
  const healthyPetArr = []; //tạo array healthy pet
  if (healthyCheked) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
        renderTable(healthyPetArr);
      }
    }
    healthyBtn.textContent = "Show All Pet";
    healthyCheked = false;
  } else {
    renderTable(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheked = true;
  }
});

//Calculating BMI
calcBMIBtn.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === "Dog") {
      const calcDogBMI = function () {
        return ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2);
      };
      petArr[i].bmi = calcDogBMI();
    }
    if (petArr[i].type === "Cat") {
      const calcCatBMI = function () {
        return ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
      };
      petArr[i].bmi = calcCatBMI();
    }
  }
  renderTable(petArr); //cập nhật lại bảng sau khi tính BMI
});
