import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const location = raw.split("\n").map((pair) => pair.split("   "));
const locations = location[0]
  .map((_, colIndex) => location.map((row) => parseInt(row[colIndex])))
  .map((list) => list.toSorted());

// Part 1
const sumPart1 = location.reduce(
  (acc, _, i) => acc + Math.abs(locations[0][i] - locations[1][i]),
  0
);
console.log("Part 1:", sumPart1);

// Part 2
const sumPart2 = location.reduce(
  (acc, _, i) =>
    acc +
    locations[1].filter((location) => location === locations[0][i]).length *
      locations[0][i],
  0
);
console.log("Part 2:", sumPart2);
