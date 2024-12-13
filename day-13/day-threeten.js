import { readFileSync } from "fs";

function readFile() {
  return readFileSync("./day-13/day-threeten-input.txt", "utf-8")
    .split("\r\n")
    .filter((x) => x != "");
}
function checkIfPossible(machine) {
  let { Ax, Ay, Bx, By, Px, Py, _ } = machine;
  let m = (Ax * Py - Px * Ay) / (Ax * By - Ay * Bx);
  let n = (Px - m * Bx) / Ax;
  if (Number.isInteger(n) && Number.isInteger(m)) {
    return m + n * 3;
  }
  return 0;
}
let file = readFile();
let key = "";
let map = {};
const regex = /[=\+,]/;
for (let i = 0; i < file.length; i++) {
  let line = file[i].split(regex).filter(Number);
  key = Math.floor(i / 3);
  if (i % 3 === 1) {
    map[key].Bx = parseInt(line[0]);
    map[key].By = parseInt(line[1]);
  } else if (i % 3 === 2) {
    map[key].Px = parseInt(line[0]) + parseInt(10000000000000);
    map[key].Py = parseInt(line[1]) + parseInt(10000000000000);
  } else {
    map[key] = { Ax: 0, Ay: 0, Bx: 0, By: 0, Px: 0, Py: 0, poss: false };
    map[key].Ax = parseInt(line[0]);
    map[key].Ay = parseInt(line[1]);
  }
}
let len = Object.keys(map).length;
let tokens = 0;
for (let i = 0; i < len; i++) {
  tokens += checkIfPossible(map[i]);
}
console.log(tokens);
