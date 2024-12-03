import { match } from "assert";
import { readFileSync } from "fs";

function readInputFile() {
  let result = [];
  let input = readFileSync("./day-3/day-three-input.txt", "utf-8")
    .split("do()")
    .forEach((el) => {
      result.push(el.toString().split("don't()")[0]);
    });

  return result;
}

const inputText = readInputFile();

const reg = /mul\((0|[1-9][0-9]{0,2}),(0|[1-9][0-9]{0,2})\)/g;
const matches = inputText
  .map((el) => {
    const match = el.match(reg);
    if (match) return match;
  })
  .join();
const reg2 = /(0|[1-9][0-9]{0,2})/g;
const numberPairs = matches.match(reg2);
let sum = 0;
for (let i = 0; i < numberPairs.length; i += 2) {
  sum += parseInt(numberPairs[i]) * parseInt(numberPairs[i + 1]);
}
console.log(sum);
