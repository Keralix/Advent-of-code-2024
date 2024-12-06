import { readFileSync } from "fs";

function readInputFile() {
  const input = readFileSync("./day-6/day-six-input.txt", "utf-8").split(
    "\r\n"
  );
  return input.map((line) => {
    return line.split("");
  });
}
function getStartCord(map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (
        map[i][j] === "^" ||
        map[i][j] === ">" ||
        map[i][j] === "V" ||
        map[i][j] === "<"
      )
        return [i, j];
    }
  }
  return [-1, -1];
}
function moveGuard(cords, map) {
  let [x, y] = cords;
  if (x < 0 || y < 0 || x >= map.length || y >= map[0].length) return;
  switch (map[x][y]) {
    case "^":
      if (x > 0) {
        if (map[x - 1][y] != "#") {
          map[x][y] = "X";
          map[x - 1][y] = "^";
        } else {
          map[x][y] = ">";
        }
      } else map[x][y] = "X";
      break;
    case ">":
      if (y < map[x].length - 1) {
        if (map[x][y + 1] != "#") {
          map[x][y] = "X";
          map[x][y + 1] = ">";
        } else map[x][y] = "V";
      } else map[x][y] = "X";
      break;
    case "V":
      if (x < map.length - 1) {
        if (map[x + 1][y] != "#") {
          map[x][y] = "X";
          map[x + 1][y] = "V";
        } else map[x][y] = "<";
      } else map[x][y] = "X";
      break;
    case "<":
      if (y > 0) {
        if (map[x][y - 1] != "#") {
          map[x][y] = "X";
          map[x][y - 1] = "<";
        } else map[x][y] = "^";
      } else map[x][y] = "X";
      break;
  }
}
function getTraversedPath(map) {
  let path = [];

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "X") {
        path.push([i, j]);
      }
    }
  }
  return path;
}
const inputMap = readInputFile();
const startCords = getStartCord(inputMap);
let testMap = readInputFile();
let cords = getStartCord(testMap);
while (true) {
  moveGuard(cords, testMap);
  cords = getStartCord(testMap);
  if (cords[0] == -1) break;
}
let traversedPathCords = getTraversedPath(testMap).filter(
  (coord) => !(coord[0] === startCords[0] && coord[1] === startCords[1])
);
//console.log(traversedPathCords, length + 1);
//part two
function updateMap(cords, map) {
  let [x, y] = cords;
  map[x][y] = "#";
}
let counter = 0;
traversedPathCords.forEach((cords) => {
  testMap = readInputFile();
  let testCoords = getStartCord(testMap);
  updateMap(cords, testMap);
  let loop = 0;
  while (true) {
    moveGuard(testCoords, testMap);
    loop++;
    testCoords = getStartCord(testMap);
    if (testCoords[0] == -1) break;
    if (loop > 10000) {
      counter++;
      break;
    }
  }
});
console.log(counter);
