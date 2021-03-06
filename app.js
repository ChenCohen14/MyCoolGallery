async function fetchRes(category) {
  try {
    let URL =
      "https://pixabay.com/api/?key=" +
      API_KEY +
      "&q=" +
      encodeURIComponent(category) +
      "&image_type=photo";
    const response = await axios.get(URL);
    return response;
  } catch (error) {
    alert(error.message);
  }
}

function displayImage(picArr, index = 0) {
  if (picArr.length > 0) {
    document.querySelector("img").src = picArr[index].previewURL;
  }
}

function changeBtColor(btArr) {
  for (let bt of btArr) {
    if (bt.clicked === true) {
      bt.style.backgroundColor = clickedBackgroudColor;
      bt.style.color = clickedColor;
    } else {
      bt.style.backgroundColor = clickedColor;
      bt.style.color = clickedBackgroudColor;
    }
  }
}

function unclickedAll(btArr) {
  for (let bt of btArr) {
    bt.clicked = false;
  }
}

const clickedColor = "#475ae2";
const clickedBackgroudColor = "#fff";
const API_KEY = "21564574-d81d6ac9fd97f9a0f723f2af2";
let category = "music";

const sportBt = document.querySelector("#sport_button");
const foodBt = document.querySelector("#food_button");
const musicBt = document.querySelector("#music_button");
const searchBt = document.querySelector("#search_button");

const leftBt = document.querySelector("#left_bt");
const rightBT = document.querySelector("#right_bt");
const catgoryBtArr = [sportBt, foodBt, musicBt];
const depictSpan = document.querySelector("#depict_span");
const searchInput = document.querySelector("#search_input");
let picArr = [];
let index = 0;

unclickedAll(catgoryBtArr);
musicBt.clicked = true;

musicBt.addEventListener("click", function () {
  unclickedAll(catgoryBtArr);
  musicBt.clicked = true;
  changeBtColor(catgoryBtArr);
  category = "music";
  depictSpan.innerHTML = `Showing ${category} collection`;

  fetchRes(category).then((res) => {
    if (res.data.hits.length > 0) {
      picArr = res.data.hits;
      displayImage(picArr);
    }
  });
});

sportBt.addEventListener("click", function () {
  unclickedAll(catgoryBtArr);
  sportBt.clicked = true;
  changeBtColor(catgoryBtArr);
  category = "sport";
  depictSpan.innerHTML = `Showing ${category} collection`;

  fetchRes(category).then((res) => {
    picArr = res.data.hits;
    displayImage(picArr);
  });
});

foodBt.addEventListener("click", function () {
  unclickedAll(catgoryBtArr);
  foodBt.clicked = true;
  changeBtColor(catgoryBtArr);
  category = "food";
  depictSpan.innerHTML = `Showing ${category} collection`;

  fetchRes(category).then((res) => {
    picArr = res.data.hits;
    displayImage(picArr);
  });
});

leftBt.addEventListener("click", function () {
  if (index === 0) {
    return;
  }
  index--;
  console.log(index);
  displayImage(picArr, index);
});

rightBT.addEventListener("click", function () {
  if (index === picArr.length - 1) {
    return;
  }
  index++;
  displayImage(picArr, index);
});

searchBt.addEventListener("click", function (e) {
  e.preventDefault();
  let input = searchInput.value;
  if (input === "") {
    return;
  }
  unclickedAll(catgoryBtArr);
  changeBtColor(catgoryBtArr);
  category = input;
  fetchRes(category).then((res) => {
    picArr = res.data.hits;
    displayImage(picArr);
    depictSpan.innerHTML = `Showing ${input} collection`;
  });
});

musicBt.click();

setInterval(function () {
  index = Math.floor(Math.random() * picArr.length);
  displayImage(picArr, index);
}, 3000);

searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode !== 13 || this.value === "" || this.value === category) {
    return;
  }

  event.preventDefault();
  searchBt.click();
});

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});
