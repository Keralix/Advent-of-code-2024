import { readFileSync } from "fs";

function getHeightMap() {
  let file = readFileSync("./day-10/day-ten-input.txt", "utf-8").split("\r\n");
  let output = [];
  file.forEach((line) => {
    line = line.split("").map(Number);
    output.push(line);
  });
  return output;
}
function getTrailHeads(heightMap) {
  let trailHeads = [];
  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      if (heightMap[i][j] === 0) trailHeads.push([i, j]);
    }
  }
  return trailHeads;
}
function searchTrail(cords, heightMapCopy) {
  const [x, y] = cords;
  const height = heightMapCopy[x][y];
  if (height != 9) {
    if (x > 0 && heightMapCopy[x - 1][y] === height + 1) {
      searchTrail([x - 1, y], heightMapCopy);
    }
    if (y > 0 && heightMapCopy[x][y - 1] === height + 1) {
      searchTrail([x, y - 1], heightMapCopy);
    }
    if (
      x < heightMapCopy.length - 1 &&
      heightMapCopy[x + 1][y] === height + 1
    ) {
      searchTrail([x + 1, y], heightMapCopy);
    }
    if (
      y < heightMapCopy[0].length - 1 &&
      heightMapCopy[x][y + 1] === height + 1
    ) {
      searchTrail([x, y + 1], heightMapCopy);
    }
  } else {
    totalScore++;
    //heightMapCopy[x][y]==0
    //uncomment the line above to get solution to part 1
  }
}
const heightMap = getHeightMap();
let totalScore = 0;
const trailHeads = getTrailHeads(heightMap);
trailHeads.forEach((cords) => {
  let heightMapCopy = getHeightMap();
  searchTrail(cords, heightMapCopy);
});

console.log(totalScore);
