import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const lab = raw.split("\n").map((row) => row.split(""));
const directions = ["up", "right", "down", "left"];
const directionsMap = new Map<string, [number, number]>([
  ["up", [0, -1]],
  ["right", [1, 0]],
  ["down", [0, 1]],
  ["left", [-1, 0]],
]);

function locateStart(map: string[][]): [number, number] {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "^") return [j, i];
    }
  }
  return [-1, -1];
}

// function displayLab(map: string[][]): void {
//   console.log(map.map((row) => row.join("")).join("\n"));
//   console.log();
// }

function iterate(
  map: string[][],
  [x, y]: [number, number],
  direction: string,
  isPart1: boolean,
  statesSet: Set<string>
): {
  conditions: { leftArea: boolean; enteredLoop: boolean };
  coords: [number, number];
  direction: string;
} {
  let [dx, dy] = directionsMap.get(direction)!;
  let newX = x + dx;
  let newY = y + dy;
  if (
    newX < 0 ||
    newX > map[0].length - 1 ||
    newY < 0 ||
    newY > map.length - 1
  ) {
    if (isPart1) map[y][x] = "X";
    return {
      conditions: { leftArea: true, enteredLoop: false },
      coords: [newX, newY],
      direction,
    };
  }

  const rotate = (direction: string) => {
    if (map[newY][newX] !== "#") return direction;
    const newDirection =
      directions[(directions.indexOf(direction) + 1) % directions.length];
    [dx, dy] = directionsMap.get(newDirection)!;
    newX = x + dx;
    newY = y + dy;
    return rotate(newDirection);
  };
  const newDirection = rotate(direction);

  const temp = map[y][x];
  map[y][x] = isPart1 ? "X" : map[newY][newX];
  map[newY][newX] = temp;

  if (statesSet.has(JSON.stringify([x, y, direction]))) {
    return {
      conditions: { leftArea: false, enteredLoop: true },
      coords: [newX, newY],
      direction: newDirection,
    };
  }
  statesSet.add(JSON.stringify([x, y, direction]));

  return {
    conditions: { leftArea: false, enteredLoop: false },
    coords: [newX, newY],
    direction: newDirection,
  };
}

// Part 1
const newLab: string[][] = JSON.parse(JSON.stringify(lab));
let [x, y] = locateStart(newLab);
let direction = directions[0];
let leftArea = false;
const statesSet = new Set<string>();
while (!leftArea) {
  const nextState = iterate(newLab, [x, y], direction, true, statesSet);
  leftArea = nextState.conditions.leftArea;
  [x, y] = nextState.coords;
  direction = nextState.direction;
}

const uniqueLocations = newLab.reduce(
  (acc, row) => acc + row.filter((position) => position === "X").length,
  0
);
console.log("Part 1:", uniqueLocations);

// Part 2
const loops = lab.reduce<number>(
  (acc, row, i) =>
    acc +
    row.reduce<number>((acc, _, j) => {
      const statesSet = new Set<string>();
      const newLab: string[][] = JSON.parse(JSON.stringify(lab));
      newLab[i][j] = "#";
      let [x, y] = locateStart(newLab);
      let direction = directions[0];
      let leftArea = false;
      let enteredLoop = false;
      while (!leftArea) {
        if (enteredLoop) {
          acc++;
          break;
        }
        const nextState = iterate(newLab, [x, y], direction, false, statesSet);
        leftArea = nextState.conditions.leftArea;
        enteredLoop = nextState.conditions.enteredLoop;
        [x, y] = nextState.coords;
        direction = nextState.direction;
      }
      return acc;
    }, 0),
  0
);
console.log("Part 2:", loops);
