import fs from "node:fs";
import { LRUCache } from "npm:lru-cache@11.0.2";

const raw = fs.readFileSync("./input.txt", "utf-8");
const stones = raw.split(" ").map(Number);

function splitStone(stone: number): number[] {
  // const stringifiedStone = stone.toString();
  // const midIndex = stringifiedStone.length / 2;
  //   console.log(
  //     "setting",
  //     Array.from(stonesMap.set(stone, splittedStone)).pop()
  //   );
  const denominator = 10 ** ((Math.floor(Math.log10(stone)) - 1) / 2 + 1);
  const firstHalf = Math.floor(stone / denominator);
  const secondHalf = stone % denominator;
  return [firstHalf, secondHalf];
}

const options = {
  max: 1000,
};
function iterateStones(
  stones: number[],
  iterationLeft: number,
  stonesMap: LRUCache<number, number[]> = new LRUCache(options)
): number[] {
  // console.log("iteration", iterationLeft);
  if (iterationLeft === 0) return stones;
  const newStones = stones.flatMap((stone) => {
    if (stone === 0) {
      return [1];
    } else if (Math.floor(Math.log10(stone)) % 2 === 1) {
      const foundStone = stonesMap.get(stone);
      if (foundStone) {
        return foundStone;
      } else {
        const splittedStone = splitStone(stone);
        stonesMap.set(stone, splittedStone);
        return splittedStone;
      }
    } else {
      return [stone * 2024];
    }
  });
  return iterateStones(newStones, iterationLeft - 1, stonesMap);
}

const result = iterateStones(stones, 25);
console.log(result.length);
