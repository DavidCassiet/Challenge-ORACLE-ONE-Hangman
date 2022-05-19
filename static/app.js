const main = document.querySelector("#main");
const sectionGame = document.querySelector("#game");
const game = document.querySelector(".canvas");

const wordsList = ["PLATO", "GUITARRA", "CELULAR", "CAMPERA"];

function playGame() {
  main.classList.add("hide");
  sectionGame.classList.remove("hide");
  createCanvas();
  drawHangman();
  let word = chooseWord(wordsList),
    lines = drawLine(word),
    rightLetters = [],
    wrongLetters = [],
    x = 400;

  document.addEventListener("keypress", function listenKeyboard(event) {
    let letter = captureLetter(event),
      indexes = index(word, letter);

    if (indexes && !rightLetters.includes(letter)) {
      drawRightLetter(indexes, letter, lines, rightLetters);

      if (rightLetters.length === word.length) {
        personalizedAlert(listenKeyboard, youWon());
      }
    } else if (letter) {
      if (!(rightLetters.includes(letter) || wrongLetters.includes(letter))) {
        x = drawWrongLetter(letter, x);
      }
      wrongLetters.push(letter);
      drawHangman(wrongLetters.length);

      if (wrongLetters.length === 9) {
        personalizedAlert(listenKeyboard, youLost());
      }
    }
  });
}

function brush() {
  return document.querySelector("canvas").getContext("2d");
}

function createCanvas() {
  let canvas = document.createElement("canvas");
  canvas.width = "1200";
  canvas.height = "700";
  game.appendChild(canvas);
}

function chooseWord(list) {
  let index = Math.round(Math.random() * (list.length - 1)),
    word = list[index];
  return word;
}

function drawLine(word) {
  const paintBrush = brush();
  let x = 570 - 35 * word.length;
  const positionsList = [];

  for (let i = 0; i < word.length; i++) {
    paintBrush.fillStyle = "rgb(26, 248, 255)";
    paintBrush.fillRect(x, 580, 60, 10);
    positionsList.push(x);
    x += 80;
  }
  return positionsList;
}

function captureLetter(event) {
  let keyValue = event.which;

  if (
    (keyValue >= 97 && keyValue <= 122) ||
    (keyValue >= 65 && keyValue <= 90) ||
    keyValue === 209 ||
    keyValue === 241
  ) {
    return event.key.toUpperCase();
  } else {
    return false;
  }
}

function index(word, letter) {
  let wordSplit = word.split(""),
    indexList = [],
    index = wordSplit.indexOf(letter);

  if (wordSplit.includes(letter)) {
    while (index != -1) {
      indexList.push(index);
      index = wordSplit.indexOf(letter, index + 1);
    }
    return indexList;
  } else {
    return false;
  }
}

function drawLetter(letter, color, x, y) {
  const pencil = brush();
  pencil.fillStyle = color;
  pencil.font = "50px 'Oxanium'";
  pencil.fillText(letter, x, y);
}

function drawRightLetter(indexes, letter, x, rightLetters) {
  indexes.forEach((index) => {
    drawLetter(letter, "rgb(255, 225, 0)", x[index] + 15, 570);
    rightLetters.push(letter);
  });
}

function drawWrongLetter(letter, x) {
  drawLetter(letter, "rgb(255, 0, 158)", x, 660);
  return (x += 50);
}

function drawHangman(failures) {
  const paintBrush = brush();

  switch (failures) {
    case 1:
      draw(paintBrush, 540, 440, 540, 140);
      break;
    case 2:
      draw(paintBrush, 537, 140, 660, 140);
      break;
    case 3:
      draw(paintBrush, 657, 140, 657, 200);
      break;
    case 4:
      paintBrush.fillStyle = "rgb(26, 248, 255)";
      paintBrush.beginPath();
      paintBrush.arc(657, 232, 34, 0, 2 * 3.14);
      paintBrush.stroke();
      break;
    case 5:
      draw(paintBrush, 657, 268, 657, 340);
      break;
    case 6:
      draw(paintBrush, 657, 338, 620, 400);
      break;
    case 7:
      draw(paintBrush, 657, 338, 694, 400);
      break;
    case 8:
      draw(paintBrush, 657, 280, 620, 340);
      break;
    case 9:
      draw(paintBrush, 657, 280, 694, 340);
      draw(paintBrush, 638, 224, 652, 238);
      draw(paintBrush, 638, 238, 652, 224);
      draw(paintBrush, 662, 224, 676, 238);
      draw(paintBrush, 662, 238, 676, 224);
      break;
    default:
      draw(paintBrush, 490, 440, 710, 440);
      break;
  }
}

function draw(paintBrush, xInitial, yInitial, xFinal, yFinal) {
  paintBrush.lineWidth = 6;
  paintBrush.strokeStyle = "rgb(26, 248, 255)";
  paintBrush.beginPath();
  paintBrush.moveTo(xInitial, yInitial);
  paintBrush.lineTo(xFinal, yFinal);
  paintBrush.stroke();
}

function personalizedAlert(listener, alert) {
  document.removeEventListener("keypress", listener, false);
  setTimeout(function () {
    alert;
  }, 100);
}

function desist() {
  location.reload();
}

function newGame() {
  let canvas = document.querySelector("canvas");
  game.removeChild(canvas);
  playGame();
}
