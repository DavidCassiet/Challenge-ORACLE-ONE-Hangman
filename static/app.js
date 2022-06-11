const homeSection = document.querySelector("#home"),
  difficultySection = document.querySelector("#difficulty"),
  gameSection = document.querySelector("#game"),
  addWordSection = document.querySelector("#addWord"),
  canvasContainer = document.querySelector(".canvas-container"),
  input = document.querySelector(".input"),
  canvas = document.querySelector("canvas"),
  paintBrush = canvas.getContext("2d");
paintBrush.font = "50px 'Open Sans', sans-serif";

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

function addWordPage() {
  homeSection.classList.add("hide");
  addWordSection.classList.remove("hide");
  input.focus();
}

function addWord() {
  if (validateWord()) {
    customAlert(3);
    setTimeout(() => {
      input.focus();
    }, 2000);
  }
}

function addWordAndPlay() {
  if (validateWord()) {
    addWordSection.classList.add("hide");
    chooseDifficulty();
  }
}

function validateWord() {
  let wordInput = input.value.toUpperCase().trim(),
    wordLength = wordInput.length,
    validity = false;

  if (wordLength < 4 || wordLength > 16) {
    customAlert(4);
  } else if (
    wordsList1.includes(wordInput) ||
    wordsList2.includes(wordInput) ||
    wordsList3.includes(wordInput)
  ) {
    customAlert(5);
  } else if (wordInput.includes(" ")) {
    customAlert(6);
  } else if (!input.checkValidity()) {
    customAlert(7);
  } else {
    if (wordLength >= 4 && wordLength <= 7) {
      wordsList1.push(wordInput);
    } else if (wordLength >= 8 && wordLength <= 11) {
      wordsList2.push(wordInput);
    } else if (wordLength >= 12 && wordLength <= 16) {
      wordsList3.push(wordInput);
    }
    input.value = "";
    validity = true;
  }
  return validity;
}

function cancel() {
  addWordSection.classList.add("hide");
  homeSection.classList.remove("hide");
  input.value = "";
}

function playGame() {
  difficultySection.classList.add("hide");
  gameSection.classList.remove("hide");
  clearCanvas();
  game();
}

function game() {
  word = chooseWord();
  lines = drawLine(word);
  correctLetters = [];
  wrongLetters = [];
  x = 390;
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
  clearCanvas();
  game();
}

function desist() {
  removeListeners();
  gameSection.classList.add("hide");
  difficultySection.classList.remove("hide");
}

function removeListeners() {
  document.removeEventListener("keypress", listenKeyboard, false);
}

function clearCanvas() {
  paintBrush.clearRect(0, 0, canvas.width, canvas.height);
  paintBrush.beginPath();
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
  while (word === list[index]) {
    index = Math.round(Math.random() * (list.length - 1));
  }
  return list[index];
}

function drawLine(word) {
  const positionsList = [];
  let x = 600 - 39 * word.length;

  for (let i = 0; i < word.length; i++) {
    draw(2, x, 580, x + 60, 580, drawShadow("rgb(58, 111, 255)", 10));
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

function drawLetter(letter, color, shadowColor, x, y) {
  paintBrush.beginPath();
  drawShadow(shadowColor, 12);
  paintBrush.fillStyle = color;
  paintBrush.fillText(letter, x, y);
}

function drawCorrectLetter(indexes, letter, x, correctLetters) {
  indexes.forEach((index) => {
    drawLetter(
      letter,
      "rgb(237, 255, 221)",
      "rgb(0, 239, 11)",
      x[index] + (30 - paintBrush.measureText(letter).width / 2),
      570
    );
    correctLetters.push(letter);
  });
}

function drawWrongLetter(letter, x) {
  drawLetter(letter, "rgb(255, 205, 210)", "rgb(255, 0, 0 )", x, 660);
  return (x += paintBrush.measureText(letter).width + 15);
}

function draw(thickness, xInitial, yInitial, xFinal, yFinal, shadow) {
  paintBrush.lineWidth = thickness;
  paintBrush.strokeStyle = "rgb(26, 248, 255)";
  paintBrush.beginPath();
  shadow;
  paintBrush.moveTo(xInitial, yInitial);
  paintBrush.lineTo(xFinal, yFinal);
  paintBrush.stroke();
}

function drawShadow(color, blur) {
  paintBrush.shadowColor = color;
  paintBrush.shadowBlur = blur;
}

function drawHangman(failures) {
  let color = "rgb(58, 111, 255)";
  let blur = 10;

  switch (failures) {
    case 1:
      draw(10, 500, 445, 500, 90, drawShadow(color, blur));
      draw(30, 440, 460, 760, 460, drawShadow(color, blur));
      break;
    case 2:
      draw(10, 485, 105, 680, 105, drawShadow(color, blur));
      draw(10, 500, 180, 575, 105, drawShadow(color, blur));
      break;
    case 3:
      draw(4, 670, 110, 670, 170, drawShadow(color, blur));
      break;
    case 4:
      paintBrush.fillStyle = "rgb(26, 248, 255)";
      paintBrush.beginPath();
      drawShadow(color, blur);
      paintBrush.arc(670, 202, 34, 0, 2 * 3.14);
      paintBrush.stroke();
      break;
    case 5:
      draw(10, 670, 236, 670, 246, drawShadow(color, blur));
      draw(24, 670, 246, 670, 310, drawShadow(color, blur));
      break;
    case 6:
      draw(18, 668, 306, 633, 370, drawShadow(color, blur));
      draw(24, 670, 246, 670, 310, drawShadow("", 0));
      break;
    case 7:
      draw(18, 672, 306, 707, 370, drawShadow(color, blur));
      draw(18, 668, 306, 633, 370, drawShadow("", 0));
      draw(24, 670, 246, 670, 310, drawShadow("", 0));
      break;
    case 8:
      draw(14, 666, 250, 633, 310, drawShadow(color, blur));
      draw(24, 670, 246, 670, 310, drawShadow("", 0));
      break;
    case 9:
      draw(14, 674, 250, 707, 310, drawShadow(color, blur));
      draw(24, 670, 246, 670, 310, drawShadow(color, blur));

      draw(4, 650, 194, 664, 208, drawShadow(color, blur));
      draw(4, 650, 208, 664, 194, drawShadow(color, blur));
      draw(4, 674, 194, 688, 208, drawShadow(color, blur));
      draw(4, 674, 208, 688, 194, drawShadow(color, blur));
      break;
    default:
      draw(30, 440, 460, 760, 460, drawShadow(color, blur));
      break;
  }
}
