"use strict";
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

const containerForm = document.getElementById("container-form");

//Bắt đầu: Lấy lại bảng dữ liệu từ home index
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
      
      <td>${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}</td>
      <td>
      <button class="btn btn-warning" onclick="editPet('${
        petArr[i].id
      }')">Edit</button>
      </td>
      `;
    tableBodyEl.appendChild(row); //thêm phần tử row vào bảng
  }
};
renderTable(petArr);

//Hàm edit Pet
function editPet(id) {
  //Hiển thị lại form input
  containerForm.classList.remove("hide");
  //Tìm đến dữ liệu của thú cưng cân edit
  const pet = petArr.find((item) => item.id === id);
  //   Show dữ liệu ban đầu  của pet cần id
  idInput.value = pet.id;
  ageInput.value = pet.age;
  nameInput.value = pet.name;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  //render lại breed khi người dùng chọn giống trong type input
  renderBreed();
  //Hiển thị breed ban đầu của thú cưng cần edit
  breedInput.value = pet.breed;
}

//Submit button (lấy lại từ assign1)
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
  //2. Validate dữ liệu hợp lệ (Có cập nhật thêm so với assign1)
  const validate = validateData(data);
  console.log(validate);
  if (validate) {
    //Tạo hàm tìm đến id pet vừa chỉnh sửa (findIndex medthod trả về vị trí của phần tử)
    const index = petArr.findIndex((pet) => pet.id === data.id);
    //Cập nhật lại array pet
    petArr[index] = data;
    //Lưu vào local Storage
    saveToStorage("petArr", petArr);
    // Hiển thị danh sách thú cưng
    renderTable(petArr);
    // Ẩn bảng input sau khi nhấn submit
    containerForm.classList.add("hide");
  }
});

//Validate function (có cập nhật thêm)
function validateData(data) {
  // Empty data
  //   if (data.id.trim() === "") {
  //     alert("Please input for Pet ID");
  //     return false;
  //   }
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
  //   for (let i = 0; i < petArr.length; i++) {
  //     if (data.id === petArr[i].id) {
  //       alert("ID must be unique!");
  //       return false;
  //     }
  //   }

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

  //Checking breed and type input
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

//Bắt sự kiện click vào input Type (giống trong phần script.js)
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
