import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const connections = raw
  .split("\n")
  .map((connection) =>
    connection.split("-").toSorted((a, b) => a.localeCompare(b))
  )
  .toSorted((a, b) => a[0].localeCompare(b[0]));
// console.log(connections);

const tripleComputerSets: string[][] = [];
connections.forEach((connection) => {
  for (let i = 0; i < connections.length; i++) {
    for (let j = i + 1; j < connections.length; j++) {
      if (
        connection[0] === connections[i][0] &&
        connection[1] === connections[j][0] &&
        connections[i][1] === connections[j][1]
      ) {
        tripleComputerSets.push([
          connection[0],
          connection[1],
          connections[i][1],
        ]);
        // console.log(tripleComputerSets[tripleComputerSets.length - 1]);
      }
    }
  }
});
// console.log(tripleComputerSets.length);

function getComputerConnections(
  computerRegex: RegExp,
  connections: string[][]
): string[][] {
  const computerConnections: string[][] = [];
  for (const connection of connections) {
    if (
      [
        computerRegex.test(connection[0]),
        computerRegex.test(connection[1]),
        computerRegex.test(connection[2]),
      ].indexOf(true) !== -1
    ) {
      computerConnections.push(connection);
      //   console.log(computerConnections[computerConnections.length - 1]);
    }
  }
  return computerConnections;
}

const computerConnections = getComputerConnections(
  /^t[a-z]{1}$/g,
  tripleComputerSets
);
console.log(computerConnections.length);
