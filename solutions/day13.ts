import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const machines = raw.split("\n\n").map((machine) =>
  machine.split("\n").map((coords) =>
    coords
      .split(", ")
      .map((item) => item.replace("=", "+").split("+")[1])
      .map(Number)
  )
);
const linearEquations = machines.map((machine) =>
  machine[0].map((_, colIndex) => machine.map((row) => row[colIndex]))
);

function solveLinearEquationInTwoUnknowns(equations: number[][]): {
  x: number;
  y: number;
  isReachable: boolean;
} {
  const [equation1, equation2] = equations;
  const m = equation1[0] * equation2[1] - equation1[1] * equation2[0];
  const solutions = {
    x: (equation1[2] * equation2[1] - equation1[1] * equation2[2]) / m,
    y: (equation1[0] * equation2[2] - equation1[2] * equation2[0]) / m,
  };
  return {
    ...solutions,
    isReachable: Number.isInteger(solutions.x) && Number.isInteger(solutions.y),
  };
}

// Part 1
const resultsPart1 = linearEquations.reduce((acc, equations) => {
  const result = solveLinearEquationInTwoUnknowns(equations);
  return result.isReachable ? acc + result.x * 3 + result.y : acc;
}, 0);
console.log("Part 1:", resultsPart1);

// Part 2
const resultsPart2 = linearEquations.reduce((acc, equations) => {
  const newEquations = equations.map((equation) => [
    ...equation.slice(0, 2),
    equation[2] + 10000000000000,
  ]);
  const result = solveLinearEquationInTwoUnknowns(newEquations);
  return result.isReachable ? acc + result.x * 3 + result.y : acc;
}, 0);
console.log("Part 2:", resultsPart2);
