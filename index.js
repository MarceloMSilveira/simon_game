const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

function handleBtnClick(evt) {
  const clickedObj = evt.target;
  const userChosenColour = $(clickedObj).attr("id");
  //console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  pressSimulation($(clickedObj));
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
  return randomNumber;
}

function addNewColour() {
  const randomChosenColour = buttonColours[nextSequence()];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);
  // console.log(gamePattern);
  const newColourId = "#" + randomChosenColour;
  const chosedElement = $(newColourId);
  pressSimulation(chosedElement);
  playSound(randomChosenColour);
}

function countColours(pattern) {
  const colourCount = { red: 0, blue: 0, green: 0, yellow: 0 };

  pattern.forEach((colour) => {
    if (colourCount.hasOwnProperty(colour)) {
      colourCount[colour]++;
    }
  });

  return colourCount;
}

$(".btn").on("click", handleBtnClick);

//console.log(randomChosenColour);

// for (let index = 0; index < 3; index++) {
//   addNewColour();
// }

//console.log(gamePattern);
//console.log(countColours(gamePattern));
