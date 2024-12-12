import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./day-12/day-twelve-input.txt", "utf-8").split("\r\n");
}

function transformTo2DArray(input) {
  return input.map((line) => line.split(""));
}

function countFences(plant) {
  if (dick[plant].area === 1) {
    dick[plant].fences = 4;
  } else {
    dick[plant].fences =
      dick[plant].area +
      dick[plant].fence2 +
      2 * dick[plant].fence3 -
      dick[plant].noFence;
  }
  dick[plant].price = dick[plant].area * dick[plant].fences;
  total_price += dick[plant].price;
}

function plantNoted(plant, planteArea, startI, startJ) {
  const key = `${plant}_${startI}_${startJ}`;
  dick[key] = {
    area: 0,
    fence2: 0,
    fence3: 0,
    noFence: 0,
    fences: 0,
    price: 0,
  };
  const stack = [[startI, startJ]];

  while (stack.length > 0) {
    const [i, j] = stack.pop();

    if (file2[i][j] === "." || file2[i][j] !== plant) continue;

    file2[i][j] = ".";
    dick[key].area++;

    let fence = 0;
    if (i === 0 || i === file.length - 1) fence++;
    if (j === 0 || j === file[i].length - 1) fence++;
    if (i > 0 && file[i - 1][j] !== plant) fence++;
    if (i < file.length - 1 && file[i + 1][j] !== plant) fence++;
    if (j > 0 && file[i][j - 1] !== plant) fence++;
    if (j < file[i].length - 1 && file[i][j + 1] !== plant) fence++;

    switch (fence) {
      case 0:
        dick[key].noFence++;
        break;
      case 2:
        dick[key].fence2++;
        break;
      case 3:
        dick[key].fence3++;
        break;
    }

    if (i > 0 && file2[i - 1][j] === plant) stack.push([i - 1, j]);
    if (i < file.length - 1 && file2[i + 1][j] === plant)
      stack.push([i + 1, j]);
    if (j > 0 && file2[i][j - 1] === plant) stack.push([i, j - 1]);
    if (j < file[i].length - 1 && file2[i][j + 1] === plant)
      stack.push([i, j + 1]);
  }

  countFences(key);
}

function goThroughGarden(file, dick) {
  for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < file[i].length; j++) {
      if (file2[i][j] !== ".") plantNoted(file[i][j], file[i][j], i, j);
    }
  }
}

let file = readInput();
let file2 = transformTo2DArray(file);
let dick = {};
let total_price = 0;

goThroughGarden(file, dick);
console.log(total_price);
