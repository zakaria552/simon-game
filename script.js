const allButtons = [...document.getElementsByTagName("main")[0].children];
let scoreId = document.getElementById("score-id").children[0];
const playBtn = document.getElementById("play-butn");

const list = allButtons.map((elem) => {
  if (elem.id !== "play-butn") {
    return elem;
  }
});
let pattern = [get_random(list).id];
const gameState = {clickIndex: 0, clicks: [], score: 0}

playBtn.addEventListener("click", function onClick() {
  allButtons.forEach(async (elem) => {
    if(elem.id === pattern[0]) {
      console.log(elem)
      await lightColor(elem, 1000)
    }
  });
});

function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}

async function lightPatterns(arr) {
  console.log("pause for pattern to start??", pattern)
  await waitforme(1500)
  arr.forEach( async (elem) => {
    let element = document.getElementById(elem);
    console.log("light on")
    console.dir(element.style.backgroundColor, "before")
    element.style.backgroundColor = "rgb(237, 237, 237)";
    Promise.resolve(waitforme(1000))
    console.dir("light off")
    element.style.backgroundColor = element.textContent
    console.log(element.style.backgroundColor, "after")
  })
    console.log("5 skips 3")
    console.log("6")
  }

async function lightColor(element, millisec) {
  console.log("third")
  element.style.backgroundColor = "rgb(237, 237, 237)";
  await waitforme(millisec).then(() => {
    console.log("4")
    element.style.backgroundColor = element.textContent
  })
}

async function gamePattern(e) {
  await lightColor(e.target, 500)
  gameState.clicks.push(e.target.id)
  if (gameState.clicks[gameState.clickIndex] === pattern[gameState.clickIndex]) {
    gameState.clickIndex++;
    if (gameState.clickIndex === pattern.length) {
      pattern.push(get_random(list).id);
      gameState.clickIndex = 0;
      gameState.clicks = [];
      gameState.score++;
      scoreId.innerText = gameState.score;
      console.log("next pattern", "pattern")
      await lightPatterns(pattern).then(() => {
        
      });
      console.log("last")
    }
  } else {
    e.target.style.backgroundColor = e.target.textContent;
    pattern = pattern[0];
    gameState.clicks = [];
    gameState.score = 0;
    scoreId.innerText = gameState.score;
    console.log("finish");
  }
}

allButtons.forEach((button) => {
  button.addEventListener("click", gamePattern);
});
