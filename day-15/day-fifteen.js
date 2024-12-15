import { read, readFileSync } from "fs";
import { stringify } from "querystring";

function readFile() {
  let [map, moves] = readFileSync(
    "./day-15/day-fifteen-input.txt",
    "utf-8"
  ).split("\r\n\r\n");
  map = map.split("\r\n");
  let newMap = [];
  map.forEach((word) => {
    newMap.push(word.split(""));
  });
  moves = moves.replace("\r\n", "").split("");
  return [newMap, moves];
}
function getRobotLocation(map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "@") return [i, j];
    }
  }
}
function getBoxesEndRight(cords) {
  let [i, j] = cords;
  for (; j < map[i].length; j++) {
    if (map[i][j] != "O") break;
  }
  return [i, j];
}
function getBoxesEndLeft(cords) {
  let [i, j] = cords;
  for (; j > 1; j--) {
    if (map[i][j] != "O") break;
  }
  return [i, j];
}
function getBoxesEndDown(cords) {
  let [i, j] = cords;
  for (; i < map.length; i++) {
    if (map[i][j] != "O") break;
  }
  return [i, j];
}
function getBoxesEndUp(cords) {
  let [i, j] = cords;
  for (; i > 1; i--) {
    if (map[i][j] != "O") break;
  }
  return [i, j];
}
function moveRobot(direction) {
  switch (direction) {
    case ">":
      if (robot[1] < map[0].length - 1) {
        if (map[robot[0]][robot[1] + 1] === ".") {
          map[robot[0]][robot[1]] = ".";
          map[robot[0]][robot[1] + 1] = "@";
          robot[1]++;
        } else if (map[robot[0]][robot[1] + 1] === "O") {
          let end = getBoxesEndRight([robot[0], robot[1] + 1]);
          if (map[end[0]][end[1]] === ".") {
            map[end[0]][end[1]] = "O";
            map[robot[0]][robot[1]] = ".";
            map[robot[0]][robot[1] + 1] = "@";
            robot[1]++;
          }
        }
      }
      break;
    case "^":
      if (robot[0] > 0) {
        if (map[robot[0] - 1][robot[1]] === ".") {
          map[robot[0]][robot[1]] = ".";
          map[robot[0] - 1][robot[1]] = "@";
          robot[0]--;
        } else if (map[robot[0] - 1][robot[1]] === "O") {
          let end = getBoxesEndUp([robot[0] - 1, robot[1]]);
          if (map[end[0]][end[1]] === ".") {
            map[end[0]][end[1]] = "O";
            map[robot[0]][robot[1]] = ".";
            map[robot[0] - 1][robot[1]] = "@";
            robot[0]--;
          }
        }
      }
      break;
    case "<":
      if (robot[1] > 0) {
        if (map[robot[0]][robot[1] - 1] === ".") {
          map[robot[0]][robot[1]] = ".";
          map[robot[0]][robot[1] - 1] = "@";
          robot[1]--;
        } else if (map[robot[0]][robot[1] - 1] === "O") {
          let end = getBoxesEndLeft([robot[0], robot[1] - 1]);
          if (map[end[0]][end[1]] === ".") {
            map[end[0]][end[1]] = "O";
            map[robot[0]][robot[1]] = ".";
            map[robot[0]][robot[1] - 1] = "@";
            robot[1]--;
          }
        }
      }
      break;
    case "v":
      if (robot[0] < map.length - 1) {
        if (map[robot[0] + 1][robot[1]] === ".") {
          map[robot[0]][robot[1]] = ".";
          map[robot[0] + 1][robot[1]] = "@";
          robot[0]++;
        } else if (map[robot[0] + 1][robot[1]] === "O") {
          let end = getBoxesEndDown([robot[0] + 1, robot[1]]);
          if (map[end[0]][end[1]] === ".") {
            map[end[0]][end[1]] = "O";
            map[robot[0]][robot[1]] = ".";
            map[robot[0] + 1][robot[1]] = "@";
            robot[0]++;
          }
        }
      }
      break;
    default:
      break;
  }
}
function calculateGps() {
  let score = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "O") score += i * 100 + j;
    }
  }
  return score;
}

let [map, moves] = readFile();
let robot = getRobotLocation(map);

for (let direction of moves) {
  moveRobot(direction);
}
console.log(calculateGps());
