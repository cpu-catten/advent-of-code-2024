import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const { rawKeys, rawLocks } = raw
  .split("\n\n")
  .map((key) => key.split("\n"))
  .reduce<{ rawKeys: string[][]; rawLocks: string[][] }>(
    (acc, item) => {
      if (item[0] === "#####") {
        acc.rawLocks.push(item);
      } else {
        acc.rawKeys.push(item);
      }
      return acc;
    },
    { rawKeys: [], rawLocks: [] }
  );

function processRawItems(rawItems: string[][]): number[][] {
  return rawItems
    .map((key) =>
      key.map((pin) => pin.split("").map((space) => (space === "." ? 0 : 1)))
    )
    .map((key) => key[0].map((_, i) => key.map((row) => row[i])))
    .map((key) => key.map((row) => row[1] + row[2] + row[3] + row[4] + row[5]));
}
const locks = processRawItems(rawLocks);
const keys = processRawItems(rawKeys);

function lockMatchesKey(lock: number[], key: number[]): boolean {
  const compare = lock.map((column, i) => column + key[i] <= 5);
  if (compare.includes(false)) {
    return false;
  }
  return true;
}

const result = locks.reduce((acc, lock) => {
  for (let i = 0; i < keys.length; i++) {
    if (lockMatchesKey(lock, keys[i])) {
      acc++;
    }
  }
  return acc;
}, 0);

console.log(result);
