const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let currentIndice = 0;

function showGamePatterns(game, user) {
  //adicionar o padrão do jogo e o padrão do jogador em um
  //div row ou parágrafo ao final do div row que e o segundo filho
  //do div container.
  const divSelector = "div.container .row:nth-of-type(2)";
  const div = $(divSelector);
  const gamePatternText = game.join(" , ");
  const userPatternText = user.join(" , ");
  const paraghGame = `<p>Game Pattern: ${gamePatternText}</p>`;
  const paraghPlayer = `<p>Your Pattern: ${userPatternText}</p>`;
  const twoParagraphs = paraghGame + paraghPlayer;
  div.after(`<div class="row">${twoParagraphs}</div>`);
}

function changeGamePattern() {
  currentIndice = 0;
  userClickedPattern = [];
  addNewColour();
}

function loseGameAnimation() {
  console.log("Game over!");
  //visual
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  //audio
  const src = "./sounds/wrong.mp3";
  const audioObj = new Audio(src);
  audioObj.play();
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
    playBtnEffects(clickedObj, userColour);
    currentIndice++;
    checkEndOfGamePattern();
  } else {
    console.log(`Padrão correto: ${gamePattern}`);
    console.log(`Você mandou: ${userClickedPattern}`);
    showGamePatterns(gamePattern, userClickedPattern);
    loseGameAnimation();
    const reachedLevel = level;
    gamePattern = [];
    currentIndice = 0;
    level = 0;
    $("h1").html(`Game Over - Buscapé, seu nível foi: ${reachedLevel}`);
    $("h1").after(`<h2>Recarregue e jogue de novo!</h2>`);
    $("#inPhoneBtn").show();
    $(document).one("keydown", startGame);
  }
}

function startGame() {
  addNewColour();
  $("h1").text(`Nível: ${level}`);
  $("h2").hide();
  $("#inPhoneBtn").hide();
  $("div.container .row:nth-of-type(3)").remove();
}

function handleBtnClick(evt) {
  const clickedObj = $(evt.target);
  const userChosenColour = clickedObj.attr("id");
  userClickedPattern.push(userChosenColour);
  testChoosedColour(clickedObj);
}

function playBtnEffects(element, colour) {
  //visual
  element.addClass("pressed");
  setTimeout(() => {
    element.removeClass("pressed");
  }, 100);
  //audio
  const src = "./sounds/" + colour + ".mp3";
  const audioObj = new Audio(src);
  audioObj.play();
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
  const chosedElement = $("#" + randomChosenColour);
  playBtnEffects(chosedElement, randomChosenColour);
}

$(".btn").on("click", handleBtnClick);
$(document).one("keydown", startGame);
$("#inPhoneBtn").on("click", startGame);

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
