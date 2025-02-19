const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let currentIndice = 0;

function changeGamePattern() {
  currentIndice = 0;
  userClickedPattern = [];
  addNewColour();
}

function loseGameAnimation(params) {
  console.log("You Lose!");
}

function checkEndOfGamePattern() {
  if (gamePattern.length === currentIndice) {
    setTimeout(() => {
      changeGamePattern();
    }, 1000);
  }
}

function testChoosedColour(clickedObj) {
  userColour = clickedObj.attr("id");
  if (userColour === gamePattern[currentIndice]) {
    pressSimulation(clickedObj);
    playSound(userColour);
    currentIndice++;
    checkEndOfGamePattern();
  } else {
    console.log(`Game pattern: ${gamePattern}`);
    console.log(`User pattern: ${userClickedPattern}`);
    loseGameAnimation();
    gamePattern = [];
    currentIndice = 0;
    $("h1").text("Press A Key to Start");
    $(document).one("keydown", startGame);
  }
}

function startGame() {
  addNewColour();
  $("h1").text(`Level: ${level}`);
}

function handleBtnClick(evt) {
  const clickedObj = $(evt.target);
  const userChosenColour = clickedObj.attr("id");
  //console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  testChoosedColour(clickedObj);
}

function playSound(selectedColor) {
  const src = "./sounds/" + selectedColor + ".mp3";
  const audioObj = new Audio(src);
  audioObj.play();
}

function pressSimulation(element) {
  element.addClass("pressed");
  setTimeout(() => {
    element.removeClass("pressed");
  }, 100);
}

function nextSequence() {
  let randomNumber = Math.floor(4 * Math.random());
  level++;
  $("h1").text(`Level: ${level}`);
  return randomNumber;
}

function addNewColour() {
  const randomChosenColour = buttonColours[nextSequence()];
  gamePattern.push(randomChosenColour);
  //console.log(randomChosenColour);
  // console.log(gamePattern);
  const chosedElement = $("#" + randomChosenColour);
  pressSimulation(chosedElement);
  playSound(randomChosenColour);
}

$(".btn").on("click", handleBtnClick);
$(document).one("keydown", startGame);

//console.log(randomChosenColour);

// for (let index = 0; index < 3; index++) {
//   addNewColour();
// }

//console.log(gamePattern);
//console.log(countColours(gamePattern));

// function countColours(pattern) {
//   const colourCount = { red: 0, blue: 0, green: 0, yellow: 0 };

//   pattern.forEach((colour) => {
//     if (colourCount.hasOwnProperty(colour)) {
//       colourCount[colour]++;
//     }
//   });

//   return colourCount;
// }
