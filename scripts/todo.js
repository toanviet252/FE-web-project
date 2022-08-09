"use strict";

// DOM selector
const inputTask = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");

// Nếu người dùng đang nhập mới bắt đầu chạy code todo
if (currentUser) {
  // Gọi hàm hiện thỉ todo list
  displayTodoList();
  // Hàm hiện thị todolist

  function displayTodoList() {
    let html = "";
    todoList.innerHTML = "";
    // Lọc từ mảng todoArr ra các todo task của current user
    todoArr
      .filter((todo) => todo.owner === currentUser.userName)
      //   Sau khi lọc từ mảng, với mỗi nhiệm vụ thì tạo thêm 1 dòng mới
      .forEach(function (todo) {
        html += `
        <li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">×</span></li>

        `;
        // Thêm list vào todoList
        todoList.innerHTML = html;

        // Gọi hàm checktoggle và hàm delete list
        checkedToogleList();
        deleteTask();
        // Gọi 2 hàm này để trong trường hợp người dùng xoá hoặc check list thì sau khi render lại todolist thì vẫn tiếp tục xoá hoặc check đc
      });
  }

  //   Bắt sự kiện vào nút add
  addBtn.addEventListener("click", function () {
    //
    if (inputTask.value.trim() === "") {
      alert("Vui lòng nhập nhiệm vụ trước khi thêm vào danh sách!");
    } else {
      const todo = new Task(inputTask.value, currentUser.userName, false);
      // Thêm task mới vào todoArr
      todoArr.push(todo);
      // Lưu vào local Storage
      saveToStorage("todoArr", todoArr);
      // render lại list các nhiệm vụ
      displayTodoList();
      // reset lại phần input task
      inputTask.value = "";
    }
  });

  //   Hàm bắt sự kiện toggle task
  //   Chọn tất cả các phần tử li con nằm trong id: todo-list
  function checkedToogleList() {
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        // Target vào sự kiện nhưng tránh nút x ra nếu không sẽ bị chồng sự kiện
        if (e.target !== liEl.children[0]) {
          // thêm hoặc bớt class checked cho mỗi phần tử li
          liEl.classList.toggle("checked");
          // Tiếp theo cần lưu task trên vào localStorage
          //1. tìm task todo của người đang đăng nhập
          const todo = todoArr.find(
            (item) =>
              item.owner === currentUser.userName &&
              item.task === liEl.textContent.slice(0, -1) //lấy giá trị nội dung task nhưng bỏ đi phần tử x
          );
          //2. Thay đổi thuộc tính isDone của phần tử todo
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          // (nếu phần tử li chứa class 'checked' thì đổi thuộc tính isDone thành true và ngược lại)
          // 3. Lưu lại todoArr xuống localstorage
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  // Hàm xoá task list
  function deleteTask() {
    // Bắt sự kiện xoá todo list
    document.querySelectorAll("#todo-list .close").forEach(function (el) {
      el.addEventListener("click", function () {
        const isDeleted = confirm("Bạn có muốn xoá nhiệm vụ");
        if (isDeleted) {
          // Tìm đến vị trí task cần xoá
          const index = todoArr.findIndex(
            (item) =>
              item.owner === currentUser.userName &&
              item.task === el.parentElement.textContent.slice(0, -1) //Tìm đến giá trị của task nhưng loại bỏ dấu x là phần tử cuối cùng
          );
          console.log(index);
          // Xoá task vừa chọn
          todoArr.splice(index, 1);
          // Cập nhập lại xuống localStorage
          saveToStorage("todoArr", todoArr);
          // render lại list
          displayTodoList();
        }
      });
    });
  }
} else {
  alert("Vui lòng đăng nhập để sử dụng ứng dụng!");
  window.location.href = "../pages/login.html";
}
