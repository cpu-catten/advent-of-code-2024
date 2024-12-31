import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const rawData = raw.split("\n\n").map((data) => data.split("\n"));
const rules = rawData[0].map((rule) => rule.split("|"));
const pages = rawData[1].map((page) => page.split(","));

// Part 1
function pageIsValid(page: string[]): boolean {
  for (const rule of rules) {
    if (
      page.includes(rule[1]) &&
      page.indexOf(rule[0]) > page.indexOf(rule[1])
    ) {
      return false;
    }
  }
  return true;
}

// Part 2
function fixPage(page: string[]): string[] {
  for (let i = 0; i < rules.length - 0; i++) {
    for (const rule of rules.slice(i)) {
      if (page.includes(rule[0]) && page.includes(rule[1])) {
        const pageIndex0 = page.indexOf(rule[0]);
        const pageIndex1 = page.indexOf(rule[1]);
        if (pageIndex0 > pageIndex1) {
          const temp = page[pageIndex0];
          page[pageIndex0] = page[pageIndex1];
          page[pageIndex1] = temp;
        }
      }
    }
  }
  return page;
}

const { validPages, fixedPages } = pages.reduce<{
  validPages: string[][];
  fixedPages: string[][];
}>(
  (acc, page) => {
    if (pageIsValid(page)) {
      acc.validPages.push(page);
    } else {
      acc.fixedPages.push(fixPage(page));
    }
    return acc;
  },
  { validPages: [], fixedPages: [] }
);

const resultsPart1 = validPages.reduce<number>(
  (acc, page) => acc + parseInt(page[Math.floor(page.length / 2)]),
  0
);
console.log("Part 1:", resultsPart1);
const resultsPart2 = fixedPages.reduce<number>(
  (acc, page) => acc + parseInt(page[Math.floor(page.length / 2)]),
  0
);
console.log("Part 2:", resultsPart2);
