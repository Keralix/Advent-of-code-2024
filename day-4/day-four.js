import { readFileSync } from "fs";

function readInputFile() {
  return readFileSync("./day-4/day-four-input.txt", "utf-8")
    .replace(/(\r\n)/g, " ")
    .split(" ");
}
function horizontalXMASCount(text) {
  let num = 0;
  text.forEach((element) => {
    for (let i = 0; i < element.length; i++) {
      if (
        (element[i] === "X" &&
          element[i + 1] === "M" &&
          element[i + 2] === "A" &&
          element[i + 3] === "S") ||
        (element[i] === "S" &&
          element[i + 1] === "A" &&
          element[i + 2] === "M" &&
          element[i + 3] === "X")
      )
        num++;
    }
  });
  return num;
}
function verticalXMASCount(text) {
  let num = 0;
  for (let i = 0; i < text[0].length; i++) {
    for (let j = 0; j < text.length - 3; j++) {
      if (
        (text[j][i] === "X" &&
          text[j + 1][i] === "M" &&
          text[j + 2][i] === "A" &&
          text[j + 3][i] === "S") ||
        (text[j][i] === "S" &&
          text[j + 1][i] === "A" &&
          text[j + 2][i] === "M" &&
          text[j + 3][i] === "X")
      )
        num++;
    }
  }
  return num;
}
function diagonalXMASCount(text) {
  let num = 0;
  for (let i = 0; i < text.length - 3; i++) {
    for (let j = 0; j < text[i].length; j++) {
      if (
        (text[i][j] === "X" &&
          text[i + 1][j + 1] === "M" &&
          text[i + 2][j + 2] === "A" &&
          text[i + 3][j + 3] === "S") ||
        (text[i][j] === "S" &&
          text[i + 1][j + 1] === "A" &&
          text[i + 2][j + 2] === "M" &&
          text[i + 3][j + 3] === "X")
      )
        num++;
      if (
        (text[i][j + 3] === "X" &&
          text[i + 1][j + 2] === "M" &&
          text[i + 2][j + 1] === "A" &&
          text[i + 3][j] === "S") ||
        (text[i][j + 3] === "S" &&
          text[i + 1][j + 2] === "A" &&
          text[i + 2][j + 1] === "M" &&
          text[i + 3][j] === "X")
      )
        num++;
    }
  }
  return num;
}
const inputText = readInputFile();
let sum = horizontalXMASCount(inputText);
sum += verticalXMASCount(inputText);
sum += diagonalXMASCount(inputText);
//Part two
function masCount(text) {
  let num = 0;
  for (let i = 0; i < text[0].length - 2; i++) {
    for (let j = 0; j < text.length; j++) {
      if (
        text[i][j] == "M" &&
        text[i + 1][j + 1] === "A" &&
        text[i + 2][j + 2] === "S"
      ) {
        if (
          (text[i + 2][j] == "M" && text[i][j + 2] == "S") ||
          (text[i + 2][j] === "S" && text[i][j + 2] === "M")
        )
          num++;
      }
      if (
        text[i][j] == "S" &&
        text[i + 1][j + 1] === "A" &&
        text[i + 2][j + 2] === "M"
      ) {
        if (
          (text[i + 2][j] == "S" && text[i][j + 2] == "M") ||
          (text[i + 2][j] === "M" && text[i][j + 2] === "S")
        )
          num++;
      }
    }
  }
  return num;
}
sum = masCount(inputText);
console.log(sum);
