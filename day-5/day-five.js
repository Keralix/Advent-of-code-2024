import { group } from "console";
import { readFileSync } from "fs";

function readPageRules() {
  const input = readFileSync("./day-5/day-five-input-1.txt", "utf-8")
    .split(/\r?\n/)
    .filter(Boolean);
  return input.map((line) => {
    const [X, Y] = line.split("|").map(Number);
    return { X, Y };
  });
}
function readPageUpdate() {
  const input = readFileSync("./day-5/day-five-input-2.txt", "utf-8")
    .split(/\r?\n/)
    .filter(Boolean);
  return input.map((line) => line.split(",").map(Number));
}

function isGroupValid(group, rules) {
  for (const { X, Y } of rules) {
    const indexX = group.indexOf(X);
    const indexY = group.indexOf(Y);
    if (indexX !== -1 && indexY !== -1 && indexX > indexY) {
      return false;
    }
  }
  return true;
}
function fixGroup(group, rules) {
  let fixedGroup = group;
  for (const { X, Y } of rules) {
    const indexX = fixedGroup.indexOf(X);
    const indexY = fixedGroup.indexOf(Y);
    if (indexX !== -1 && indexY !== -1 && indexX > indexY) {
      let Z = group[indexX];
      fixedGroup[indexX] = group[indexY];
      fixedGroup[indexY] = Z;
    }
  }
  return fixedGroup;
}
const rules = readPageRules();
const updates = readPageUpdate();
let sum = 0;

updates.forEach((group) => {
  if (isGroupValid(group, rules)) {
    const middleIndex = Math.floor(group.length / 2);
    sum += group[middleIndex];
  }
});

console.log(sum);
//Part two
sum = 0;
updates.forEach((group) => {
  if (!isGroupValid(group, rules)) {
    let fixedGroup = fixGroup(group, rules);
    while (!isGroupValid(fixedGroup, rules)) {
      fixedGroup = fixGroup(fixedGroup, rules);
    }
    sum += fixedGroup[Math.floor(fixedGroup.length / 2)];
  }
});
console.log(sum);
