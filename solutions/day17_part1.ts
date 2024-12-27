import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const device = raw.split("\n\n").map((device) => device.split("\n"));
const registers = device[0].map((register) =>
  parseInt(register.split(": ").pop()!)
);
const program = device[1][0].split(": ").pop()!.split(",").map(Number);
// console.log(registers, program);

function getComboOperand(operand: number, registers: number[]): number {
  return operand < 4 ? operand : registers[operand - 4];
}

let acc: { newRegisters: number[]; output: number[]; pointer: number } = {
  newRegisters: registers,
  output: [],
  pointer: 0,
};
while (true) {
  if (acc.pointer + 2 > program.length) break;
  const [opcode, operand] = program.slice(acc.pointer, acc.pointer + 2);
  const [a, b, c] = acc.newRegisters;
  // console.log(acc, getComboOperand(operand, acc.newRegisters));
  if (opcode === 0) {
    // adv
    acc = {
      ...acc,
      newRegisters: [
        Math.trunc(a / 2 ** getComboOperand(operand, acc.newRegisters)),
        b,
        c,
      ],
      pointer: acc.pointer + 2,
    };
  } else if (opcode === 1) {
    // bxl
    acc = {
      ...acc,
      newRegisters: [a, b ^ operand, c],
      pointer: acc.pointer + 2,
    };
  } else if (opcode === 2) {
    // bst
    acc = {
      ...acc,
      newRegisters: [a, getComboOperand(operand, acc.newRegisters) % 8, c],
      pointer: acc.pointer + 2,
    };
  } else if (opcode === 3) {
    // jnz
    acc = {
      ...acc,
      pointer: a === 0 ? acc.pointer + 2 : operand,
    };
  } else if (opcode === 4) {
    // bxc
    acc = {
      ...acc,
      newRegisters: [a, b ^ c, c],
      pointer: acc.pointer + 2,
    };
  } else if (opcode === 5) {
    // out
    acc = {
      ...acc,
      output: acc.output.concat([
        getComboOperand(operand, acc.newRegisters) % 8,
      ]),
      pointer: acc.pointer + 2,
    };
  } else if (opcode === 6) {
    // bdv
    acc = {
      ...acc,
      newRegisters: [
        a,
        Math.trunc(a / 2 ** getComboOperand(operand, acc.newRegisters)),
        c,
      ],
      pointer: acc.pointer + 2,
    };
  } else {
    // cdv
    acc = {
      ...acc,
      newRegisters: [
        a,
        b,
        Math.trunc(a / 2 ** getComboOperand(operand, acc.newRegisters)),
      ],
      pointer: acc.pointer + 2,
    };
  }
}
// console.log(acc.newRegisters);
console.log(acc.output.join(","));
