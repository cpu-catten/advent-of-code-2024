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
    // console.log(index);
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
    // console.log(index);
    if (disk[index] === -1) {
      index--;
      // console.log("skipping: -1");
      continue;
    }
    const startOfFile = disk.indexOf(disk[index]);
    const lengthOfFile = index - startOfFile + 1;
    let startOfEmptySpace = disk.indexOf(-1);
    if (startOfEmptySpace === -1) break;
    // console.log("finding empty space");
    const diskWithoutSkippedData = disk.slice(0, index + 1);
    while (
      // disk
      //   .slice(0, index + 1)
      //   .slice(startOfEmptySpace, startOfEmptySpace + lengthOfFile)
      //   .toString() !==
      //   Array.from({ length: lengthOfFile }).fill(-1).toString() &&
      startOfEmptySpace !== -1
    ) {
      let unfittingEmptySpace = -1;
      for (let i = 0; i < lengthOfFile; i++) {
        if (diskWithoutSkippedData[startOfEmptySpace + i] !== -1) {
          unfittingEmptySpace = startOfEmptySpace + i;
          break;
        }
      }
      if (unfittingEmptySpace === -1) break;
      startOfEmptySpace = diskWithoutSkippedData.indexOf(
        -1,
        unfittingEmptySpace
      );
    }
    if (startOfEmptySpace !== -1) {
      // console.log("moving files");
      for (let i = 0; i < lengthOfFile; i++) {
        const temp = disk[startOfEmptySpace + i];
        disk[startOfEmptySpace + i] = disk[startOfFile + i];
        disk[startOfFile + i] = temp;
      }
    }
    // disk.splice(
    //   startOfEmptySpace,
    //   lengthOfFile,
    //   ...disk.slice(startOfFile, index + 1)
    // );
    // disk.splice(
    //   startOfFile,
    //   lengthOfFile,
    //   ...Array.from<number>({ length: lengthOfFile }).fill(-1)
    // );
    index -= lengthOfFile;
  }
  return disk;
}
const compactedDiskPart2 = compactDiskPart2(disk);
const checksumPart2 = getDiskChecksum(compactedDiskPart2);
console.log("Part 2:", checksumPart2);

// function compactDiskPart2(diskMap: number[]): number[] {
//   const disk = [...diskMap];
//   const largeFiles: number[] = [];
//   while (true) {
//     if (disk[disk.length - 1] === -1) {
//       while (disk[disk.length - 1] === -1) largeFiles.push(disk.pop()!);
//     }
//     if (disk.indexOf(-1) === -1) {
//       if (disk[disk.length - 1] === -1) {
//         while (disk[disk.length - 1] === -1) disk.pop();
//       }
//       return disk;
//     }
//     const eof = disk[disk.length - 1];
//     let lengthOfFile = 0;
//     while (disk[disk.length - 1 - lengthOfFile] === eof) {
//       lengthOfFile++;
//     }
//     const index = disk
//       .toString()
//       .replaceAll(",", "")
//       .replaceAll("-1", "A")
//       .indexOf("A".repeat(lengthOfFile));

//     if (index === -1) {
//       for (let i = 0; i < lengthOfFile; i++) {
//         largeFiles.push(disk.pop()!);
//       }
//       // continue;
//     } else {
//       for (let i = 0; i < lengthOfFile; i++) {
//         disk[index + i] = disk.pop()!;
//         largeFiles.push(-1);
//       }
//     }
//     // console.log(
//     //   disk.toString().replaceAll(",", "").replaceAll("-1", "A"),
//     //   largeFiles.toString().replaceAll(",", "").replaceAll("-1", "A"),
//     //   index
//     // );
//   }
// }
