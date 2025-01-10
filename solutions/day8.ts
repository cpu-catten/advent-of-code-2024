import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const map = raw.split("\n").map((line) => line.split(""));

// function displayMap(map: string[][] | number[][]): void {
//   map.forEach((line) => {
//     console.log(line.join(""));
//   });
// }

const antinodesPart1: string[][] = Array.from({ length: map.length }, () =>
  Array.from({ length: map[0].length }, () => ".")
);
const antinodesPart2: string[][] = Array.from({ length: map.length }, () =>
  Array.from({ length: map[0].length }, () => ".")
);

map.forEach((line, y) => {
  line.forEach((cell, x) => {
    if (cell !== ".") {
      map.forEach((line2, y2) => {
        line2.forEach((cell2, x2) => {
          if (cell2 === cell && x !== x2 && y !== y2) {
            const dx = x2 - x;
            const dy = y2 - y;

            // Part 1
            if (
              y - dy >= 0 &&
              y - dy < map.length &&
              x - dx >= 0 &&
              x - dx < map[0].length
            ) {
              antinodesPart1[y - dy][x - dx] = "#";
            }

            // Part 2
            const acc = [y, x];
            while (
              acc[0] - dy >= 0 &&
              acc[0] - dy < map.length &&
              acc[1] - dx >= 0 &&
              acc[1] - dx < map[0].length
            ) {
              acc[0] -= dy;
              acc[1] -= dx;
              antinodesPart2[acc[0]][acc[1]] = "#";
            }
          }
        });
      });
    }
  });
});

const antinodeCountPart1 = antinodesPart1.reduce(
  (acc, line) => acc + line.filter((cell) => cell === "#").length,
  0
);
console.log("Part 1:", antinodeCountPart1);
const antinodeCountPart2 = antinodesPart2.reduce(
  (acc, line, y) =>
    acc + line.filter((cell, x) => cell !== "." || map[y][x] !== ".").length,
  0
);
console.log("Part 2:", antinodeCountPart2);
