const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;
let currentIndice = 0;

function loseGameAnimation(params) {
  console.log("You Lose!");
}

function setIndice() {
  currentIndice++;
  if (gamePattern.length > currentIndice) {
    currentIndice++;
  } else {
    currentIndice = 0;
    userClickedPattern = [];
    addNewColour();
  }
}

function testChoosedColor(userColor) {
  if (userColor === gamePattern[currentIndice]) {
    pressSimulation($(clickedObj));
    playSound(userChosenColour);
    setIndice();
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
  const userChosenColour = $(evt.target).attr("id");
  //console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  testChoosedColor(userChosenColour);
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
