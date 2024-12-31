import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const puzzle = raw.split("\n");

// Part 1
function searchKeywordPart1(keyword: string, puzzle: string[]): number {
  let count = puzzle.reduce<number>((acc, line) => {
    return acc + (line.match(new RegExp(keyword, "g"))?.length ?? 0);
  }, 0);

  for (let i = 0; i < puzzle.length - 3; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      const conditions = [
        puzzle[i][j] === keyword[0],
        puzzle[i + 1][j] === keyword[1],
        puzzle[i + 2][j] === keyword[2],
        puzzle[i + 3][j] === keyword[3],
      ];
      if (conditions.every((condition) => condition)) {
        count++;
      }
    }
  }

  for (let i = 0; i < puzzle.length - 3; i++) {
    for (let j = 0; j < puzzle[i].length - 3; j++) {
      const conditions = [
        puzzle[i][j] === keyword[0],
        puzzle[i + 1][j + 1] === keyword[1],
        puzzle[i + 2][j + 2] === keyword[2],
        puzzle[i + 3][j + 3] === keyword[3],
      ];
      if (conditions.every((condition) => condition)) {
        count++;
      }
    }
  }

  for (let i = 0; i < puzzle.length - 3; i++) {
    for (let j = 3; j < puzzle[i].length; j++) {
      const conditions = [
        puzzle[i][j] === keyword[0],
        puzzle[i + 1][j - 1] === keyword[1],
        puzzle[i + 2][j - 2] === keyword[2],
        puzzle[i + 3][j - 3] === keyword[3],
      ];
      if (conditions.every((condition) => condition)) {
        count++;
      }
    }
  }
  return count;
}
const countPart1 =
  searchKeywordPart1("XMAS", puzzle) +
  searchKeywordPart1("XMAS".split("").toReversed().join(""), puzzle);
console.log("Part 1:", countPart1);

// Part 2
function searchKeywordPart2(keyword: string, puzzle: string[]): number {
  let count = 0;
  for (let i = 0; i < puzzle.length - 2; i++) {
    for (let j = 0; j < puzzle[i].length - 2; j++) {
      const conditions = [
        puzzle[i][j] === keyword[0],
        puzzle[i + 2][j] === keyword[0],
        puzzle[i + 1][j + 1] === keyword[1],
        puzzle[i][j + 2] === keyword[2],
        puzzle[i + 2][j + 2] === keyword[2],
      ];
      if (conditions.every((condition) => condition)) {
        count++;
      }
    }
  }

  for (let i = 0; i < puzzle.length - 2; i++) {
    for (let j = 0; j < puzzle[i].length - 2; j++) {
      const conditions = [
        puzzle[i][j + 2] === keyword[0],
        puzzle[i][j] === keyword[0],
        puzzle[i + 1][j + 1] === keyword[1],
        puzzle[i + 2][j] === keyword[2],
        puzzle[i + 2][j + 2] === keyword[2],
      ];
      if (conditions.every((condition) => condition)) {
        count++;
      }
    }
  }
  return count;
}
const countPart2 =
  searchKeywordPart2("MAS", puzzle) +
  searchKeywordPart2("MAS".split("").toReversed().join(""), puzzle);
console.log("Part 2:", countPart2);
