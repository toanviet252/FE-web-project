"use strict";

// DOM selector
const newsContainer = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pageNumber = document.getElementById("page-num");

// Số tin tức trả về từ API
let totalResults = 0;

// Hàm get data từ API
const getDataNews = async function (country, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}
      &apiKey=4b8e600e8f5a406c8a184fb82a1f806b`
      // Get API gồm 4 giá trị
    );
    const data = await res.json();

    // Bắt lỗi không nạp đc API hoặc quá số lần nạp
    if (data.status === "error" && data.code === "rateLimited") {
      throw new Error(data.message);
    }

    // Bắt lỗi nếu không chạy thông qua localhost
    if (data.status === "error" && data.code === "corsNotAllowed") {
      throw new Error(data.message);

      // data.code và .message sẽ có giá trị khi gặp lỗi được trả về từ API, còn nếu chạy bình thường sẽ là undefined.
    }

    // Gọi hàm hiển thị list news
    displayNewList(data);
  } catch (err) {
    console.log(err.message);
  }
};
// Gọi hàm get tin tức từ API
getDataNews("us", 1);
// &category=${currentUser.category}

// Hàm hiển thị tin tức
const displayNewList = function (data) {
  // Gán số bài viết trả về từ API
  totalResults = data.totalResults;

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
  getDataNews("us", --pageNumber.textContent);
});
// Bắt sự kiện vào nút next
nextBtn.addEventListener("click", function () {
  getDataNews("us", ++pageNumber.textContent);
});
