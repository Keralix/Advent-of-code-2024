import { readFileSync } from "fs";
import { before } from "node:test";

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
  let beforeLocation = [];
  let afterLocations = [];
  for (let i = 0; i < antennas.length; i++) {
    antinodes.push([antennas[i][0], antennas[i][1]]);
    for (let j = i + 1; j < antennas.length; j++) {
      if (antennas[i][2] === antennas[j][2]) {
        let deltaX = antennas[j][0] - antennas[i][0];
        let deltaY = antennas[j][1] - antennas[i][1];

        if (
          antennas[i][0] - deltaX >= 0 &&
          antennas[i][1] - deltaY >= 0 &&
          antennas[i][1] - deltaY < mapAntenna[0].length
        ) {
          beforeLocation.push([
            antennas[i][0] - deltaX,
            antennas[i][1] - deltaY,
          ]);
          while (
            beforeLocation[beforeLocation.length - 1][0] - deltaX >= 0 &&
            beforeLocation[beforeLocation.length - 1][1] - deltaY >= 0 &&
            beforeLocation[beforeLocation.length - 1][1] - deltaY <
              mapAntenna[0].length
          ) {
            beforeLocation.push([
              beforeLocation[beforeLocation.length - 1][0] - deltaX,
              beforeLocation[beforeLocation.length - 1][1] - deltaY,
            ]);
          }
        }
        if (
          antennas[j][0] + deltaX < mapAntenna.length &&
          antennas[j][1] + deltaY >= 0 &&
          antennas[j][1] + deltaY < mapAntenna[0].length
        ) {
          afterLocations.push([
            antennas[j][0] + deltaX,
            antennas[j][1] + deltaY,
          ]);
          while (
            afterLocations[afterLocations.length - 1][0] + deltaX <
              mapAntenna.length &&
            afterLocations[afterLocations.length - 1][1] + deltaY >= 0 &&
            afterLocations[afterLocations.length - 1][1] + deltaY <
              mapAntenna[0].length
          ) {
            afterLocations.push([
              afterLocations[afterLocations.length - 1][0] + deltaX,
              afterLocations[afterLocations.length - 1][1] + deltaY,
            ]);
          }
        }
      }
    }
  }
  antinodes.push(...beforeLocation);
  antinodes.push(...afterLocations);
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
