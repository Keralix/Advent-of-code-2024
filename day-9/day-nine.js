import { readFileSync } from "fs";
import { start } from "repl";

function getDiskMap() {
  return readFileSync("./day-9/day-nine-input.txt", "utf-8");
}
function writeDiskBlock() {
  let data;
  for (let i = 0; i < diskMap.length; i++) {
    if (i % 2) {
      data = ".";
    } else {
      data = Math.floor(i / 2);
    }
    for (let j = 0; j < diskMap[i]; j++) {
      diskBlock.push(data.toString());
    }
  }
}
function fragment() {
  let i = 0;
  let j = diskBlock.length - 1;
  while (i < j) {
    while (diskBlock[i] != ".") {
      i++;
    }
    while (diskBlock[j] === ".") {
      j--;
    }
    if (i < j) {
      let pom = diskBlock[i];
      diskBlock[i] = diskBlock[j];
      diskBlock[j] = pom;
    }
  }
}
function calculateCheckSum() {
  let checksum = 0;
  for (let i = 0; i < diskBlock.length; i++) {
    if (diskBlock[i] !== ".") checksum += parseInt(diskBlock[i]) * i;
  }
  return checksum;
}
let diskMap = getDiskMap();
let diskBlock = [];
writeDiskBlock();
fragment();
let checksum = calculateCheckSum();
//part two
function defragment(startFree, endBlock) {
  for (let i = endBlock; i >= 0; i--) {
    if (diskBlock[i] === ".") continue;

    let blockEnd = i;
    while (i > 0 && diskBlock[i - 1] === diskBlock[blockEnd]) i--;
    let blockStart = i;
    let blockSize = blockEnd - blockStart + 1;

    let freeSpaceEnd = -1;
    let freeSpaceStart = -1;
    let freeSpaceSize = 0;

    for (let j = 0; j < blockStart; j++) {
      if (diskBlock[j] === ".") {
        if (freeSpaceEnd === -1) freeSpaceStart = j;
        freeSpaceEnd = j;
        freeSpaceSize = freeSpaceEnd - freeSpaceStart + 1;
      } else {
        freeSpaceStart = -1;
        freeSpaceEnd = -1;
        freeSpaceSize = 0;
      }
      if (freeSpaceSize >= blockSize) {
        for (let k = 0; k < blockSize; k++) {
          diskBlock[freeSpaceStart + k] = diskBlock[blockStart + k];
          diskBlock[blockStart + k] = ".";
        }
        break;
      }
    }
  }
}

diskBlock = [];
writeDiskBlock();
defragment(0, diskBlock.length - 1);
checksum = calculateCheckSum();
console.log(checksum);
