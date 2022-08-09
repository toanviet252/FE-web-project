"use strict";

// DOM selector
const inputQuery = document.getElementById("input-query");
const searchBtn = document.getElementById("btn-submit");

const newsContainer = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pageNumber = document.getElementById("page-num");
const navPageNumber = document.getElementById("nav-page-num");

////////////////////////////////////////
let totalResults = 0;
let keywords = "";

// Yêu cầu đăng nhập
if (currentUser) {
  // Ban đầu ẩn phần trang đi trước khi người dùng tìm kiếm
  navPageNumber.style.display = "none";
  // Bắt sự kiện vào nút search
  searchBtn.addEventListener("click", function () {
    newsContainer.innerHTML = "";
    // Kiểm tra người dùng đã nhập gì chưa
    if (inputQuery.value.trim() === "") {
      alert("Vui lòng nhập keyword!");
      //   Ẩn phần chuyển trang đi
      navPageNumber.style.display = "none";
      pa;
    } else {
      keywords = inputQuery.value;
      // Gọi hàm hiển thị tin tức
      getDataNewsByKey(keywords, 1);
      //   Show phần chuyển trang
      navPageNumber.style.display = "block";
    }
  });
  // Hàm lấy tin tức theo keyword
  async function getDataNewsByKey(keywords, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=4b8e600e8f5a406c8a184fb82a1f806b`
      );
      const data = await res.json();
      console.log(data);

      // Bắt lỗi không nạp đc API hoặc quá số lần nạp
      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }

      // Bắt lỗi nếu không chạy thông qua localhost
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
        // data.code và .message sẽ có giá trị khi gặp lỗi được trả về từ API, còn nếu chạy bình thường sẽ là undefined.
      }
      //   Bắt lỗi nếu không có bài viết nào phù hợp với keyword
      if (data.totalResults == 0) {
        // Ẩn nút chuyển trang
        navPageNumber.style.display = "none";
        throw new Error(
          "Không có bài viết nào thoả mãn từ khoá bạn vừa nhập! Vui lòng chọn từ khoá khác."
        );
      }

      // Gọi hàm hiển thị list news
      displayNewList(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  // Hàm hiển thị tin tức
  const displayNewList = function (data) {
    // Gán số bài viết trả về từ API và keywords người dùng nhập
    totalResults = data.totalResults;
    keywords = inputQuery.value;

    // Check prev-next button xem đã ẩn hoặc xuất hiện chưa
    checkPrevBtn();
    checkNextBtn();

    let html = "";
    data.articles.forEach(function (article) {
      html += `
      <div class="new-content">
              <div class="img-banner">
                <img src=${
                  article.urlToImage
                    ? article.urlToImage
                    : "..css/image-not-found.png"
                } alt="img" />
              </div>
  
              <div class="content">
                <h4>${article.title}</h4>
                <p>${article.description}</p>
                <button id="btn-view"><a href=${
                  article.url
                } target="_blank">view</a></button>
              </div>
      </div>
  
          `;
    });
    newsContainer.innerHTML = html;
  };
  // Kiểm tra điều kiện và ẩn nút prev page
  function checkPrevBtn() {
    if (pageNumber.textContent == 1) {
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
    }
  }
  // Kiểm tra điều kiện và ẩn nút next page
  function checkNextBtn() {
    if (
      pageNumber.textContent == Math.ceil(totalResults / currentUser.pageSize)
    ) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "block";
    }
  }
  // Bắt sự kiện vào nút previous
  prevBtn.addEventListener("click", function () {
    getDataNewsByKey(keywords, --pageNumber.textContent);
  });
  // Bắt sự kiện vào nút next
  nextBtn.addEventListener("click", function () {
    getDataNewsByKey(keywords, ++pageNumber.textContent);
  });
} else {
  alert("Vui lòng đăng nhập để sử dụng tính năng này!");
  window.location.href = "../pages/login.html";
}
