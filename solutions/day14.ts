import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const robots = raw.split("\n").map((robot) => robot.split(" "));
const [locations, velocities] = robots[0]
  .map((_, colIndex) => robots.map((row) => row[colIndex]))
  .map((items) =>
    items.map((item) => item.split("=")[1].split(",").map(Number))
  );

function multiplyQuadrants(
  locations: number[][],
  dimensions: [number, number]
): number {
  const [width, height] = dimensions.map((dim) => Math.floor(dim / 2));
  const quadrants = locations.reduce(
    (acc, location) => {
      if (location[0] > width && location[1] < height) {
        acc[0]++;
      } else if (location[0] < width && location[1] < height) {
        acc[1]++;
      } else if (location[0] < width && location[1] > height) {
        acc[2]++;
      } else if (location[0] > width && location[1] > height) {
        acc[3]++;
      }
      return acc;
    },
    [0, 0, 0, 0]
  );
  //   console.log(quadrants);
  return quadrants.reduce((acc, quadrant) => acc * quadrant, 1);
}

function displayLocations(
  locations: number[][],
  dimensions: [number, number]
): string {
  const [width, height] = dimensions;
  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ".")
  );
  locations.forEach((location) => {
    grid[location[1]][location[0]] = "#";
  });
  const output = grid.map((row) => row.join("")).join("\n");
  return output;
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

const width = 101;
const height = 103;
let i = 1;
let resultsPart1 = 0;
while (true) {
  locations.forEach((location, j) => {
    locations[j][0] = mod(location[0] + velocities[j][0], width);
    locations[j][1] = mod(location[1] + velocities[j][1], height);
  });
  if (i === 100) {
    resultsPart1 = multiplyQuadrants(locations, [width, height]);
  }
  const display = displayLocations(locations, [width, height]);
  if (display.includes(new Array(10).fill("#").join(""))) {
    console.log(display);
    console.log("Part 1:", resultsPart1);
    console.log("Part 2:", i);
    break;
  }
  i++;
}
