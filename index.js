const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];

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

//console.log(randomChosenColour);

// for (let index = 0; index < 3; index++) {
//   addNewColour();
// }

//console.log(gamePattern);
//console.log(countColours(gamePattern));
