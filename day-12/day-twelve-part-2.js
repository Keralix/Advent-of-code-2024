import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./day-12/day-twelve-input.txt", "utf-8").split("\r\n");
}

function transformTo2DArray(input) {
  return input.map((line) => line.split(""));
}

function goThroughGarden(file, dick) {
  for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < file[i].length; j++) {
      if (file2[i][j] !== ".") plantNoted(file[i][j], file[i][j], i, j);
    }
  }
}

function plantNoted(plant, planteArea, startI, startJ) {
  const key = `${plant}_${startI}_${startJ}`;
  dick[key] = {
    area: 0,
    corners: 0,
    price: 0,
  };
  const stack = [[startI, startJ]];

  while (stack.length > 0) {
    const [i, j] = stack.pop();

    if (file2[i][j] === "." || file2[i][j] !== plant) continue;

    file2[i][j] = ".";
    dick[key].area++;

    if (
      (i === 0 || file[i - 1][j] !== plant) &&
      (j === 0 || file[i][j - 1] !== plant)
    ) {
      dick[key].corners++;
    }
    if (
      (i === file.length - 1 || file[i + 1][j] !== plant) &&
      (j === 0 || file[i][j - 1] !== plant)
    ) {
      dick[key].corners++;
    }
    if (
      (i === 0 || file[i - 1][j] !== plant) &&
      (j === file[i].length - 1 || file[i][j + 1] !== plant)
    ) {
      dick[key].corners++;
    }
    if (
      (i === file.length - 1 || file[i + 1][j] !== plant) &&
      (j === file[i].length - 1 || file[i][j + 1] !== plant)
    ) {
      dick[key].corners++;
    }

    if (
      i < file.length - 1 &&
      j < file[i].length - 1 &&
      file[i + 1][j] === plant &&
      file[i + 1][j + 1] === plant &&
      file[i][j + 1] != plant
    ) {
      dick[key].corners++;
    }
    if (
      i > 0 &&
      j > 0 &&
      file[i - 1][j - 1] != plant &&
      file[i][j - 1] === plant &&
      file[i - 1][j] === plant
    ) {
      dick[key].corners++;
    }
    if (
      i < file.length - 1 &&
      j < file[i].length - 1 &&
      file[i + 1][j] === plant &&
      file[i][j + 1] === plant &&
      file[i + 1][j + 1] != plant
    ) {
      dick[key].corners++;
    }
    if (
      i < file.length - 1 &&
      j < file[i].length - 1 &&
      (file[i + 1][j + 1] === plant) & (file[i][j + 1] === plant) &&
      file[i + 1][j] != plant
    ) {
      dick[key].corners++;
    }
    if (i > 0 && file2[i - 1][j] === plant) stack.push([i - 1, j]);
    if (i < file.length - 1 && file2[i + 1][j] === plant)
      stack.push([i + 1, j]);
    if (j > 0 && file2[i][j - 1] === plant) stack.push([i, j - 1]);
    if (j < file[i].length - 1 && file2[i][j + 1] === plant)
      stack.push([i, j + 1]);
  }
  calculatePrice(key);
}
function calculatePrice(plant) {
  dick[plant].price = dick[plant].area * dick[plant].corners;
  total_price += dick[plant].price;
}

let file = readInput();
let file2 = transformTo2DArray(file);
let dick = {};
let total_price = 0;

goThroughGarden(file, dick);
console.log(total_price);
