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
console.dir(allButtons[0])
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
  disableButtons()
  console.log("pause for pattern to start??", pattern)
  await waitforme(1500)
  console.log("waited 1.5s")
  for(let elem of arr) {
    const prevId = elem.id
    console.log("preives id", prevId)
    console.dir(elem)
    elem.id = "highlight"
    await waitforme(500)
    elem.id = prevId
    console.log("after", elem.id)
    await waitforme(500)
  }
  enableButtons()
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
  console.log("clicked")
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
      console.log("next pattern....")
      await lightPatterns(pattern)
      console.log("last")
    }
  } else {
    element.style.backgroundColor = element.textContent;
    console.log(gameState.highScore, highScore.innerText)
    reset()
    console.log("wrong click");
  }
}
async function reset(){
  pattern = [get_random(list)]
  console.log(gameState)
  if(gameState.score > gameState.highScore) {
    console.log("??")
    gameState.highScore = gameState.score
    highScore.innerText = gameState.highScore;
  }
  gameState.clicks = []
  gameState.clickIndex = 0
  gameState.score = 0
  scoreId.innerText = gameState.score;
  await lightPatterns(pattern)
}
const disableButtons = () => {
  allButtons.forEach((button) => {
    button.disabled = true
  })
}
const enableButtons = () => {
  allButtons.forEach((button) => {
    button.disabled = false
  })
}

disableButtons()
await waitforme(1500)
lightColor(pattern[0], 1000)
enableButtons()
const addEventListener = () => {
  allButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      gamePattern(e.target)
    });
  });
}

addEventListener()

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