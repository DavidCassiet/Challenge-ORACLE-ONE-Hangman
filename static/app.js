const homeSection = document.querySelector("#home"),
  difficultySection = document.querySelector("#difficulty"),
  gameSection = document.querySelector("#game"),
  addWordSection = document.querySelector("#addWord"),
  canvasContainer = document.querySelector(".canvas-container"),
  input = document.querySelector(".input");

const wordsList1 = [
    "PLATO",
    "CELULAR",
    "CAMPERA",
    "MONTAÑA",
    "VIDRIO",
    "BUITRE",
  ],
  wordsList2 = [
    "GUITARRA",
    "PLATAFORMA",
    "CALENDARIO",
    "ALFOMBRA",
    "ESTRUCTURA",
    "CAMPAMENTO",
  ],
  wordsList3 = [
    "ENCICLOPEDIA",
    "MULTIPLICACION",
    "CONSTITUCION",
    "PARALELOGRAMO",
    "RADIOACTIVIDAD",
    "ESTABLECIMIENTO",
  ];
let lines, correctLetters, wrongLetters, x, word, list;

function chooseDifficulty() {
  homeSection.classList.add("hide");
  difficultySection.classList.remove("hide");
}

function addWord() {
  homeSection.classList.add("hide");
  addWordSection.classList.remove("hide");
}

function addWordAndPlay() {
  let wordInput = input.value.toUpperCase(),
    wordLength = wordInput.length;

  if (
    wordsList1.includes(wordInput) ||
    wordsList2.includes(wordInput) ||
    wordsList3.includes(wordInput)
  ) {
    customAlert(4);
  } else if (wordInput.trim().includes(" ")) {
    customAlert(5);
  } else if (!input.checkValidity()) {
    customAlert(6);
  } else if (wordLength >= 4 && wordLength <= 16) {
    if (wordLength >= 4 && wordLength < 8) {
      wordsList1.push(wordInput.trim());
    } else if (wordLength >= 8 && wordLength < 12) {
      wordsList2.push(wordInput.trim());
    } else if (wordLength >= 12 && wordLength <= 16) {
      wordsList3.push(wordInput.trim());
    }
    input.value = "";
    addWordSection.classList.add("hide");
    chooseDifficulty();
  } else {
    customAlert(3);
  }
}

function cancel() {
  addWordSection.classList.add("hide");
  homeSection.classList.remove("hide");
  input.value = "";
}

function playGame() {
  difficultySection.classList.add("hide");
  gameSection.classList.remove("hide");
  createCanvas();
  game();
}

function game() {
  word = chooseWord();
  lines = drawLine(word);
  correctLetters = [];
  wrongLetters = [];
  x = 400;
  drawHangman();
  document.addEventListener("keypress", listenKeyboard);
}

function listenKeyboard(event) {
  event.stopPropagation();
  let letter = captureLetter(event),
    indexes = index(word, letter);

  if (indexes && !correctLetters.includes(letter)) {
    drawCorrectLetter(indexes, letter, lines, correctLetters);
    if (correctLetters.length === word.length) {
      removeListeners();
      customAlert(1);
    }
  } else if (letter) {
    if (!(correctLetters.includes(letter) || wrongLetters.includes(letter))) {
      x = drawWrongLetter(letter, x);
    }
    wrongLetters.push(letter);
    drawHangman(wrongLetters.length);
    if (wrongLetters.length === 9) {
      removeListeners();
      customAlert(2);
    }
  }
}

function goHome() {
  difficultySection.classList.add("hide");
  homeSection.classList.remove("hide");
}

function newGame() {
  removeListeners();
  let canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  game();
}

function desist() {
  removeListeners();
  let canvas = document.querySelector("canvas");
  canvasContainer.removeChild(canvas);
  gameSection.classList.add("hide");
  difficultySection.classList.remove("hide");
}

function removeListeners() {
  document.removeEventListener("keypress", listenKeyboard, false);
}

function getCurrentContext() {
  return document.querySelector("canvas").getContext("2d");
}

function createCanvas() {
  let canvas = document.createElement("canvas");
  canvas.width = "1200";
  canvas.height = "700";
  canvasContainer.appendChild(canvas);
}

function chooseWord() {
  switch (event.target.id) {
    case "difficultyBtn1":
      list = wordsList1;
      break;
    case "difficultyBtn2":
      list = wordsList2;
      break;
    case "difficultyBtn3":
      list = wordsList3;
      break;
  }
  let index = Math.round(Math.random() * (list.length - 1));
  return list[index];
}

function drawLine(word) {
  const paintBrush = getCurrentContext(),
    positionsList = [];
  let x = 600 - 39 * word.length;

  for (let i = 0; i < word.length; i++) {
    draw(paintBrush, 4, x, 580, x + 60, 580);
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
  const pencil = getCurrentContext();
  pencil.font = "bold 50px 'Open Sans', sans-serif";
  pencil.fillStyle = color;
  pencil.fillText(letter, x, y);
}

function drawCorrectLetter(indexes, letter, x, correctLetters) {
  indexes.forEach((index) => {
    drawLetter(letter, "rgb(255, 225, 0)", x[index] + 15, 570);
    correctLetters.push(letter);
  });
}

function drawWrongLetter(letter, x) {
  drawLetter(letter, "rgb(255, 0, 120)", x, 660);
  return (x += 50);
}

function draw(paintBrush, thickness, xInitial, yInitial, xFinal, yFinal) {
  paintBrush.lineWidth = thickness;
  paintBrush.strokeStyle = "rgb(26, 248, 255)";
  paintBrush.beginPath();
  paintBrush.moveTo(xInitial, yInitial);
  paintBrush.lineTo(xFinal, yFinal);
  paintBrush.stroke();
}

function drawHangman(failures) {
  const paintBrush = getCurrentContext();

  switch (failures) {
    case 1:
      draw(paintBrush, 10, 500, 445, 500, 90);
      break;
    case 2:
      draw(paintBrush, 10, 485, 105, 680, 105);
      draw(paintBrush, 10, 500, 180, 575, 105);
      break;
    case 3:
      draw(paintBrush, 4, 670, 105, 670, 170);
      break;
    case 4:
      paintBrush.fillStyle = "rgb(26, 248, 255)";
      paintBrush.beginPath();
      paintBrush.arc(670, 202, 34, 0, 2 * 3.14);
      paintBrush.stroke();
      break;
    case 5:
      draw(paintBrush, 10, 670, 236, 670, 246);
      draw(paintBrush, 24, 670, 246, 670, 310);
      break;
    case 6:
      draw(paintBrush, 18, 668, 306, 633, 370);
      break;
    case 7:
      draw(paintBrush, 18, 672, 306, 707, 370);
      break;
    case 8:
      draw(paintBrush, 14, 666, 250, 633, 310);
      break;
    case 9:
      draw(paintBrush, 14, 674, 250, 707, 310);

      draw(paintBrush, 4, 650, 194, 664, 208);
      draw(paintBrush, 4, 650, 208, 664, 194);
      draw(paintBrush, 4, 674, 194, 688, 208);
      draw(paintBrush, 4, 674, 208, 688, 194);
      break;
    default:
      draw(paintBrush, 30, 440, 460, 760, 460);
      break;
  }
}
