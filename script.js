const allButtons = [...document.getElementsByTagName("button")]
//console.dir(allButtons)
const clickPatern = ["blue"]
const clicks = []
function clickedButtons (event) {
    clicks.push()
    console.dir(event.target.id)
}

const result = allButtons.map((button) => {
    button.addEventListener("click", clickedButtons)
})


