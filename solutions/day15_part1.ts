import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const rawData = raw.split("\n\n");
const warehouse = rawData[0].split("\n").map((row) => row.split(""));
const movements = rawData[1].replaceAll("\n", "").split("");
const directionsMap = new Map([
  ["^", [0, -1]],
  [">", [1, 0]],
  ["v", [0, 1]],
  ["<", [-1, 0]],
]);

// function displayWarehouse(map: string[][]): void {
//   console.log(map.map((row) => row.join("")).join("\n"));
// }

function locateStart(map: string[][]): [number, number] {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "@") return [j, i];
    }
  }
  return [-1, -1];
}

function moveRobot(map: string[][], movements: string[]): void {
  let [x, y] = locateStart(map);
  for (const movement of movements) {
    let movable = true;
    const [dx, dy] = directionsMap.get(movement)!;
    if (dx !== 0) {
      let lastBox = x;
      while (map[y][lastBox + dx] === "O") {
        lastBox += dx;
      }
      if (map[y][lastBox + dx] === ".") {
        const temp = map[y][x + dx];
        map[y][x + dx] = map[y][lastBox + dx];
        map[y][lastBox + dx] = temp;
      } else if (map[y][lastBox + dx] === "#") {
        movable = false;
      }
    } else {
      let lastBox = y;
      while (map[lastBox + dy][x] === "O") {
        lastBox += dy;
      }
      if (map[lastBox + dy][x] === ".") {
        const temp = map[y + dy][x];
        map[y + dy][x] = map[lastBox + dy][x];
        map[lastBox + dy][x] = temp;
      } else if (map[lastBox + dy][x] === "#") {
        movable = false;
      }
    }
    if (movable) {
      const temp = map[y][x];
      map[y][x] = map[y + dy][x + dx];
      map[y + dy][x + dx] = temp;
      x += dx;
      y += dy;
    }
  }
}

const newWarehouse: string[][] = JSON.parse(JSON.stringify(warehouse));
moveRobot(newWarehouse, movements);
const coordsSum = newWarehouse.reduce(
  (acc, row, i) =>
    acc +
    row.reduce(
      (accRow, position, j) =>
        position === "O" ? accRow + i * 100 + j : accRow,
      0
    ),
  0
);
console.log(coordsSum);
