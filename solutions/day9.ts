import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const disk: number[] = Array.from(raw.split("\n")[0]).flatMap(
  (blockLength, i) => {
    if (i % 2 === 0) {
      return Array(parseInt(blockLength)).fill(i / 2);
    } else {
      return Array(parseInt(blockLength)).fill(-1);
    }
  }
);

function getDiskChecksum(disk: number[]): number {
  return disk.reduce(
    (acc, block, i) => acc + i * (block === -1 ? 0 : block),
    0
  );
}

// Part 1
function compactDiskPart1(diskMap: number[]): number[] {
  const disk = [...diskMap];
  while (true) {
    if (disk[disk.length - 1] === -1) {
      while (disk[disk.length - 1] === -1) disk.pop();
    }
    if (disk.indexOf(-1) === -1) return disk;
    const index = disk.indexOf(-1);
    disk[index] = disk.pop()!;
  }
}
const compactedDiskPart1 = compactDiskPart1(disk);
const checksumPart1 = getDiskChecksum(compactedDiskPart1);
console.log("Part 1:", checksumPart1);

// Part 2
function compactDiskPart2(diskMap: number[]): number[] {
  const disk = [...diskMap];
  let index = disk.length - 1;
  while (index >= 0) {
    if (disk[index] === -1) {
      index--;
      continue;
    } // Skip empty spaces
    const startOfFile = disk.indexOf(disk[index]);
    const lengthOfFile = index - startOfFile + 1;
    let startOfEmptySpace = disk.indexOf(-1);
    if (startOfEmptySpace === -1) break; // No more empty spaces
    const diskWithoutSkippedData = disk.slice(0, index + 1);
    while (startOfEmptySpace !== -1) {
      let unfittingEmptySpace = -1;
      for (let i = 0; i < lengthOfFile; i++) {
        if (diskWithoutSkippedData[startOfEmptySpace + i] !== -1) {
          unfittingEmptySpace = startOfEmptySpace + i;
          break; // Found unfitting empty space
        }
      } // Check if empty space is large enough
      if (unfittingEmptySpace === -1) break; // Found a fitting empty space
      startOfEmptySpace = diskWithoutSkippedData.indexOf(
        -1,
        unfittingEmptySpace
      ); // Find next empty space starting from last unfitting empty space
    }
    if (startOfEmptySpace !== -1) {
      // Found a fitting empty space
      for (let i = 0; i < lengthOfFile; i++) {
        const temp = disk[startOfEmptySpace + i];
        disk[startOfEmptySpace + i] = disk[startOfFile + i];
        disk[startOfFile + i] = temp;
      } // Swap data with empty space
    }
    index -= lengthOfFile;
  }
  return disk;
}
const compactedDiskPart2 = compactDiskPart2(disk);
const checksumPart2 = getDiskChecksum(compactedDiskPart2);
console.log("Part 2:", checksumPart2);
