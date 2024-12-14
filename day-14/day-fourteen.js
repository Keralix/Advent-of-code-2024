import { readFileSync } from "fs";
import { execArgv } from "process";

function readInput() {
  return readFileSync("./day-14/day-fourteen-input.txt", "utf-8").split("\r\n");
}
function moveRobots() {
  for (let i = 0; i < input.length; i++) {
    robots[i].px += robots[i].vx;
    if (robots[i].px >= width) {
      robots[i].px -= width;
    } else if (robots[i].px < 0) {
      robots[i].px += width;
    }
    robots[i].py += robots[i].vy;
    if (robots[i].py >= height) {
      robots[i].py -= height;
    } else if (robots[i].py < 0) {
      robots[i].py += height;
    }
  }
}
function checkQuadrants(robot) {
  let x = robot.px;
  let y = robot.py;
  if (x < xOs) {
    if (y < yOs) inQuadrants[0]++;
    else if (y > yOs) inQuadrants[2]++;
  } else if (x > xOs) {
    if (y < yOs) inQuadrants[1]++;
    else if (y > yOs) inQuadrants[3]++;
  }
}

const input = readInput();
let robots = {};
let width = 101;
let height = 103;
const regex = /[=, ]/;
for (let i = 0; i < input.length; i++) {
  let robot = input[i]
    .split(regex)
    .filter((value) => value === "0" || Number(value));
  robots[i] = {
    px: Number(robot[0]),
    py: Number(robot[1]),
    vx: Number(robot[2]),
    vy: Number(robot[3]),
  };
}

let xOs = Math.floor(width / 2);
let yOs = Math.floor(height / 2);
let inQuadrants = [0, 0, 0, 0];

let minSafe;
let safetyFactor;
let iteration = 0;
for (let i = 0; i < width * height; i++) {
  moveRobots();
  safetyFactor = 1;
  inQuadrants = [0, 0, 0, 0];
  for (let j = 0; j < input.length; j++) {
    checkQuadrants(robots[j]);
  }
  for (let z = 0; z < 4; z++) {
    safetyFactor *= inQuadrants[z];
  }
  console.log(safetyFactor);
  if (minSafe === undefined || minSafe > safetyFactor) {
    minSafe = safetyFactor;
    iteration = i;
  }
}

console.log(iteration + 1);
