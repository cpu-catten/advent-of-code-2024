import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const report = raw.split("\n").map((level) => level.split(" ").map(Number));

const levels = report.map((level) => {
  const diffs = [];
  for (let i = 0; i < level.length - 1; i++) {
    diffs.push(level[i] - level[i + 1]);
  }
  return diffs;
});

const { countPart1, countPart2 } = levels.reduce<{
  countPart1: number;
  countPart2: number;
}>(
  (acc, diffs) => {
    const { countPos, countNeg, countBadDiff } = diffs.reduce<{
      countPos: number;
      countNeg: number;
      countBadDiff: number;
    }>(
      (acc, diff) => {
        if (diff > 0) {
          acc.countPos++;
        } else {
          acc.countNeg++;
        }
        if (Math.abs(diff) > 3 || Math.abs(diff) === 0) {
          acc.countBadDiff++;
        }
        return acc;
      },
      { countPos: 0, countNeg: 0, countBadDiff: 0 }
    );

    // Part 1
    if (countBadDiff === 0 && (countPos === 0 || countNeg === 0)) {
      acc.countPart1++;
    }

    // Part 2
    const conditions = [
      countBadDiff <= 1 && (countPos === 0 || countNeg === 0),
      countBadDiff === 0 &&
        ((countPos === 1 && countNeg > 0) || (countNeg === 1 && countPos > 0)),
    ];
    if (conditions.some(Boolean)) {
      acc.countPart2++;
    }
    return acc;
  },
  { countPart1: 0, countPart2: 0 }
);

console.log("Part 1:", countPart1);
console.log("Part 2:", countPart2);
