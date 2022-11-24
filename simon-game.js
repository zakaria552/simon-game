const allButtons = [...document.getElementsByTagName("button")];
console.log(allButtons)
let scoreId = document.getElementById("score-id").children[0];
let highScore = document.getElementById("high-score").children[0];
const playBtn = document.getElementById("play-butn");
console.log(allButtons)
const list = allButtons.map((elem) => {
  if (elem.id !== "play-butn") {
    return elem;
  }
});

let pattern = [get_random(list)];
const gameState = {clickIndex: 0, clicks: [], score: 0, highScore: 0}

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
  console.log("lightning")
  console.log("pause for pattern to start??", pattern)
  await waitforme(1500)
  console.log("waited")
  for(let elem of arr) {
    const prevId = elem.id
    console.log(prevId)
    console.dir(elem)
    console.log("1",elem.id)
    elem.id = "highlight"
    await waitforme(500)
    elem.id = prevId
    console.dir("2", elem.id)
    await waitforme(500)
  }
    console.log("5 skips 3")
    console.log("6")
  }

async function lightColor(element, millisec) {
  const prev = element.id
  element.id = "highlight"
  await waitforme(millisec).then(() => {
    element.id = prev
  })
}

async function gamePattern(element) {
  await lightColor(element, 500)
  gameState.clicks.push(element)
  const clickedColorElement = gameState.clicks[gameState.clickIndex]
  const correctColorElement = pattern[gameState.clickIndex]
  console.log(correctColorElement)
  if (clickedColorElement === correctColorElement) {
    gameState.clickIndex++;
    if (gameState.clickIndex === pattern.length) {
      pattern.push(get_random(list));
      console.log(pattern)
      gameState.clickIndex = 0;
      gameState.clicks = [];
      gameState.score++;
      scoreId.innerText = gameState.score;
      await lightPatterns(pattern).then(() => {
      });
      console.log("last")
    }
  } else {
    element.style.backgroundColor = element.textContent;
    pattern = pattern[0];
    gameState.clicks = [];
    gameState.score = 0;
    scoreId.innerText = gameState.score;
    if(gameState.highScore < gameState.score) {
      highScore.innerText = gameState.highScore;
    }
    console.log("wrong click");
  }
}
const reset  = (gameState) => {
  pattern = [get_random(list)]
  gameState.clicks = 0
  gameState.clickIndex = 0
  gameState.score = 0
  if(gameState.highScore < gameState.score) {
    highScore.innerText = gameState.highScore;
  }
}
await waitforme(1500)
lightColor(pattern[0], 1000)

allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    gamePattern(e.target)
  });
});

/*
<main>
        <button id="red-butn" type="button">red</button>
        <button id="blue-butn" type="button">blue</button>
        <button id="green-butn" type="button">green</button>
        <button id="yellow-butn" type="button">yellow</button>
    </main>
    <h5 id="score-id">SCORE: <i>0</i> </h5>
    <h5 id="high-score">HIGH SCORE: <i>0</i> </h5>
*/