const allButtons = [...document.getElementsByTagName("main")[0].children];

//console.dir(document.getElementsByTagName("main")[0].children[0].id);
let scoreId = document.getElementById("score-id").children[0];

const list = allButtons.map((elem) => {
  if (elem.id !== "play-butn") {
    return elem;
  }
});

console.log(list);

let pattern = ["blue-butn"];

const playBtn = document.getElementById("play-butn");

playBtn.addEventListener("click", function onClick() {
  allButtons.forEach((elem) => {
    if (elem.id === pattern[0]) {
      elem.style.backgroundColor = "rgb(237, 237, 237)";
      setTimeout(function () {
        return (elem.style.backgroundColor = "blue");
      }, 1000);
    }
  });
});

function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}

async function colorLight(arr) {
  console.log(arr, "colorrrr");
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i], "color");
    let elem = document.getElementById(arr[i]);

    elem.style.backgroundColor = "rgb(237, 237, 237)";
    await waitforme(1000);

    elem.style.backgroundColor = elem.textContent;
  }
}

function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

let i = 0;
let clicks = [];
let score = 0;

function gamePattern(e) {
  clicks.push(e.target.id);
  console.log(e);
  e.target.style.backgroundColor = "rgb(237, 237, 237)";
  if (clicks[i] === pattern[i]) {
    i++;
    e.target.style.backgroundColor = e.target.textContent;

    if (i === pattern.length) {
      pattern.push(get_random(list).id);
      console.log("next pattern", pattern);
      i = 0;
      clicks = [];
      score++;
      scoreId.innerText = score;
      colorLight(pattern);
    }
  } else {
    pattern = ["blue-butn"];
    clicks = [];
    score = 0;
    scoreId.innerText = score;
    console.log("finish");
  }
}

allButtons.forEach((button) => {
  button.addEventListener("click", gamePattern);
});
