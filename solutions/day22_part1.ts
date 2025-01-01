import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const numbers = raw.split("\n").map(Number);

function generateNewNumber(number: number): number {
  const mix = (value: number, secret: number): number => {
    return (value ^ secret) >>> 0;
  };
  const prune = (secret: number): number => {
    return secret % 16777216;
  };
  const step1 = prune(mix(number * 64, number));
  const step2 = prune(mix(Math.floor(step1 / 32), step1));
  const step3 = prune(mix(step2 * 2048, step2));
  return step3;
}

const result = numbers.reduce<number>((acc, number) => {
  const iterate = (remaining: number, iteratedNumber: number) => {
    if (remaining === 0) return iteratedNumber;
    return iterate(remaining - 1, generateNewNumber(iteratedNumber));
  };
  acc += iterate(2000, number);
  return acc;
}, 0);
console.log(result);
