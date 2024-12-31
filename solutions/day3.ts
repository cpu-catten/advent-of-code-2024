import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");

// Part 1
const regexPart1 = /mul\(([0-9]+),([0-9]+)\)/g;
const sumPart1 = [...raw.matchAll(regexPart1)]
  .map((match) => parseInt(match[1]) * parseInt(match[2]))
  .reduce((acc, curr) => acc + curr, 0);
console.log("Part 1:", sumPart1);

// Part 2
const regexPart2 = /mul\(([0-9]+),([0-9]+)\)|don?\'?t?\(\)/g;
let isDisabled = false;
const sumPart2 = [...raw.matchAll(regexPart2)].reduce<number>((acc, match) => {
  if (match[1] && !isDisabled) {
    return acc + parseInt(match[1]) * parseInt(match[2]);
  } else if (match[0] === "don't()") {
    isDisabled = true;
  } else if (match[0] === "do()") {
    isDisabled = false;
  }
  return acc;
}, 0);
console.log("Part 2:", sumPart2);
