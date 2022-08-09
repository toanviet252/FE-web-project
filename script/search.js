"use strict";

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

const findBtn = document.getElementById("find-btn");
//////////////////////////////////////
//Bắt đầu: Hiển thị lại bảng dữ liệu từ home index (lấy từ file script.js)
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
        
        `;
    tableBodyEl.appendChild(row); //thêm phần tử row vào bảng
  }
};
renderTable(petArr);

// Gọi hàm render Breed
renderBreed();

// Bắt sự kiện click vào nút Find
findBtn.addEventListener("click", function () {
  //Tạo find Array để tránh việc sửa đổi trực tiếp vào petArr ban đầu
  let petArrFind = petArr;
  //Nếu không nhập gì mà bấm Find thì hiển thị tất cả dữ liệu

  //Nếu người dùng nhập giá trị vào input
  if (idInput.value) {
    //Nếu ko nhập gì thì idInput.value = false
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }
  //Nếu người dùng nhập giá trị vào name
  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }
  if (typeInput.value !== "Select Type") {
    //Nếu giá trị typeinput không phải là 'Select Type'
    // => Bao gồm Dog or Cat
    petArrFind = petArrFind.filter((pet) => pet.type.includes(typeInput.value));
  }
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) =>
      pet.breed.includes(breedInput.value)
    );
  }
  //Nếu người dùng tick vào ô Vaccinated
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  //Nếu người dùng tick vào ô Dewormed
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  //Nếu người dùng tick vào ô Sterilized
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }
  //Render lại table theo dữ liệu của array petArrFind
  renderTable(petArrFind);
});

//Hàm hiển thị các giống breed
function renderBreed() {
  breedArr.forEach((item) => {
    const option = document.createElement("option");
    option.innerHTML = `${item.breed}`;
    breedInput.appendChild(option);
  });
}
