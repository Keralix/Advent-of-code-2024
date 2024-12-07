import { readFileSync } from "fs";

function readInputFile() {
  return readFileSync("./day-7/day-seven-input.txt", "utf-8")
    .split("\r\n")
    .map((line) => {
      return line.split(":");
    });
}
function isEquation(result, inputs) {
  let possibles = [inputs[0]];

  for (let i = 1; i < inputs.length; i++) {
    let curr = inputs[i];
    let temp = [];

    for (let p of possibles) {
      temp.push(p + curr);
      temp.push(p * curr);
      temp.push(parseInt(p.toString() + curr.toString()));
    }
    possibles = [...temp];
  }

  return possibles.includes(result);
}
let data = readInputFile();
let sum = 0;
data.forEach((line) => {
  if (isEquation(parseInt(line[0]), line[1].split(" ").map(Number).splice(1))) {
    sum += parseInt(line[0]);
  }
});
console.log(sum);
