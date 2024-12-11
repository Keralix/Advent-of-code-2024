import { count } from "console";
import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./day-11/day-eleven-input.txt", "utf-8").split(" ");
}
function addEntry(key, dick, value) {
  if (!dick[key]) dick[key] = value;
  else dick[key] += value;
}
function blink(stoneDic) {
  let dick = { ...stoneDic };
  for (let key in dick) {
    if (key === "0") {
      dick[key] -= stoneDic[key];
      addEntry("1", dick, stoneDic[key]);
    } else if (key.length % 2 === 0) {
      let middle = key.length / 2;
      let left = parseInt(key.substring(0, middle)).toString();
      let right = parseInt(key.substring(middle)).toString();

      dick[key] -= stoneDic[key];
      addEntry(left, dick, stoneDic[key]);
      addEntry(right, dick, stoneDic[key]);
    } else {
      let newKey = (parseInt(key) * 2024).toString();

      dick[key] -= stoneDic[key];
      addEntry(newKey, dick, stoneDic[key]);
    }
  }

  deleteEmpty(dick);
  return dick;
}
function deleteEmpty(dick) {
  for (let key in dick) {
    if (dick[key] === 0) delete dick[key];
  }
}
function countStones() {
  for (let key in stoneDic) result += stoneDic[key];
}
const input = readInput();
let stoneDic = {};
input.forEach((element) => {
  if (!stoneDic[element]) stoneDic[element] = 1;
  else stoneDic[element]++;
});
for (let i = 0; i < 75; i++) {
  stoneDic = { ...blink(stoneDic) };
}
let result = 0;
countStones();
console.log(result);
