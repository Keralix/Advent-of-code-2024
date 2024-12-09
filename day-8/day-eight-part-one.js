import { readFileSync } from "fs";

function getAntennaMap() {
  return readFileSync("./day-8/day-eight-input.txt", "utf-8").split("\r\n");
}

function createAntinodesMap(mapAntenna) {
  let line = [];
  let map = [];
  for (let i = 0; i < mapAntenna.length; i++) {
    line = [];
    for (let j = 0; j < mapAntenna[i].length; j++) {
      line.push(".");
    }
    map.push(line);
  }
  return map;
}
function findAntennaLocations() {
  let locations = [];
  for (let i = 0; i < mapAntenna.length; i++) {
    for (let j = 0; j < mapAntenna[i].length; j++) {
      if (mapAntenna[i][j] != ".") {
        locations.push([i, j, mapAntenna[i][j]]);
      }
    }
  }
  return locations;
}
function getAntinodeLocations() {
  let antinodes = [];
  for (let i = 0; i < antennas.length; i++) {
    for (let j = i + 1; j < antennas.length; j++) {
      if (antennas[i][2] === antennas[j][2]) {
        let deltaX = antennas[j][0] - antennas[i][0];
        let deltaY = antennas[j][1] - antennas[i][1];
        antinodes.push([antennas[i][0] - deltaX, antennas[i][1] - deltaY]);
        antinodes.push([antennas[j][0] + deltaX, antennas[j][1] + deltaY]);
      }
    }
  }
  return antinodes;
}
function setAntinode(antinode) {
  let [x, y] = antinode;
  if (
    x >= 0 &&
    x < mapAntinode[0].length &&
    y >= 0 &&
    y < mapAntinode[0].length
  ) {
    mapAntinode[x][y] = "#";
  }
}
function countAntinodes(antinode) {
  for (let i = 0; i < antinode.length; i++) {
    if (antinode[i] === "#") count++;
  }
}
const mapAntenna = getAntennaMap();
let mapAntinode = createAntinodesMap(mapAntenna);
let antennas = findAntennaLocations();
let antinodes = getAntinodeLocations();
let count = 0;
for (let antinode of antinodes) {
  setAntinode(antinode);
}
for (let antinode of mapAntinode) {
  countAntinodes(antinode);
}
console.log(count);
