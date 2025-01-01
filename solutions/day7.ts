import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const rawData = raw.split("\n").map((line) => line.split(": "));
const data = rawData[0].map((_, colIndex) =>
  rawData.map((row) => row[colIndex])
);
const values = data[0].map(Number);
const equations = data[1].map((equation) => equation.split(" ").map(Number));

// Part 1
const resultsPart1 = values.reduce((acc, value, i) => {
  while (true) {
    const tryOperators = (base10: number): boolean => {
      const operators = base10.toString(2).split("").slice(1).map(Number);
      const result = operators.reduce((accResult, operator, j) => {
        if (operator === 0) {
          return accResult + equations[i][j + 1];
        } else {
          return accResult * equations[i][j + 1];
        }
      }, equations[i][0]);
      if (result === values[i]) {
        return true;
      }
      if (
        (base10 + 1).toString(2).split("").slice(1).length > operators.length
      ) {
        return false;
      }
      return tryOperators(base10 + 1);
    };
    if (tryOperators(2 ** (equations[i].length - 1))) {
      return acc + value;
    } else {
      return acc;
    }
  }
}, 0);
console.log("Part 1:", resultsPart1);

// Part 2
const resultsPart2 = values.reduce((acc, value, i) => {
  let base10 = 3 ** (equations[i].length - 1);
  while (true) {
    const operators = base10.toString(3).split("").slice(1).map(Number);
    const result = operators.reduce((accResult, operator, j) => {
      if (operator === 0) {
        return accResult + equations[i][j + 1];
      } else if (operator === 1) {
        return accResult * equations[i][j + 1];
      } else {
        return Number(accResult.toString() + equations[i][j + 1].toString());
      }
    }, equations[i][0]);
    if (result === values[i]) {
      return acc + value;
    }
    base10 += 1;
    if (base10.toString(3).split("").slice(1).length > operators.length) {
      return acc;
    }
  }
}, 0);
console.log("Part 2:", resultsPart2);
