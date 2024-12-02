import { readFileSync } from "fs";
import { start } from "repl";
import {
  isAnyArrayBuffer,
  isArrayBuffer,
  isInt16Array,
  isInt8Array,
} from "util/types";

const returnInputs = () => {
  let input = readFileSync("./day-2/day-two-input.txt", "utf-8").split("\r\n");
  const inputArray = input.map((row) =>
    row
      .split(" ")
      .map(Number)
      .filter((num) => !isNaN(num))
  );
  return inputArray;
};
function isSafe(report) {
  let ascen = report[0] - report[1];
  let safe = true;
  console.log(ascen);
  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i] - report[i + 1];
    console.log(diff);
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3 || diff * ascen <= 0) {
      safe = false;
      break;
    }
  }
  return safe;
}
let input = returnInputs();
let safeCount = 0;
for (let i = 0; i <= input.length - 1; i++) {
  let safe = isSafe(input[i]);
  if (!safe) {
    for (let j = 0; j < input[i].length; j++) {
      let newReports = [...input[i]];
      newReports.splice(j, 1);
      safe = isSafe(newReports);
      if (safe) break;
    }
  }
  if (safe) safeCount++;
}
console.log(safeCount);
