import { readFileSync } from "fs";

const returnInputs = () => {
  let input = readFileSync("./day-1/day-one-input.txt", "utf-8").replace(
    /(\r\n|\n|\r)/gm,
    "   "
  );
  const inputArray = input.split("   ");
  let input1 = [];
  let input2 = [];
  for (let i = 0; i < inputArray.length; i++) {
    if (i % 2) {
      input2.push(inputArray[i]);
    } else {
      input1.push(inputArray[i]);
    }
  }
  return [input1.sort(), input2.sort()];
};

const [input1, input2] = returnInputs();
let distance = 0;
let j = 0;
let k = 0;
let similarity = 0;
let ocurance;
for (let i = 0; i < input1.length; i++) {
  distance += Math.abs(input1[i] - input2[i]);
  ocurance = 0;
  j = input2.indexOf(input1[i]);
  k = input2.lastIndexOf(input1[i]);
  if (j != -1) {
    for (; j <= k; j++) {
      ocurance++;
    }
  }
  similarity += ocurance * input1[i];
}
console.log(distance, similarity);
