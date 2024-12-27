import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const disk = Array.from(raw.split("\n")[0]).flatMap((blockLength, i) => {
  if (i % 2 === 0) {
    return Array(parseInt(blockLength)).fill(i / 2);
  } else {
    return Array(parseInt(blockLength)).fill(-1);
  }
});
// console.log(disk.slice(disk.length - 100));

function compactDiskPart1(disk: number[]): number[] {
  while (true) {
    if (disk[disk.length - 1] === -1) {
      while (disk[disk.length - 1] === -1) disk.pop();
    }
    if (disk.indexOf(-1) === -1) return disk;
    const index = disk.indexOf(-1);
    disk[index] = disk.pop()!;
    // console.log(index);
  }
}
const compactedDiskPart1 = compactDiskPart1(disk);
// console.log(compactedDisk);

function getDiskChecksum(disk: number[]): number {
  return disk.reduce((acc, block, i) => acc + i * block, 0);
}
const checksumPart1 = getDiskChecksum(compactedDiskPart1);
console.log(checksumPart1);
