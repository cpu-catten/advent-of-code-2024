import fs from "node:fs";

const raw = fs.readFileSync("./input.txt", "utf-8");
const [rules, pages] = raw
  .split("\n\n")
  .map((data) =>
    data.split("\n").map((item) => item.replaceAll(",", "|").split("|"))
  );

// Part 1
function isValidPage(page: string[]): boolean {
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
function getFixedPage(page: string[]): string[] {
  const fixedPage = [...page];
  for (let i = 0; i < rules.length - 0; i++) {
    for (const rule of rules.slice(i)) {
      if (fixedPage.includes(rule[0]) && fixedPage.includes(rule[1])) {
        const pageIndex0 = fixedPage.indexOf(rule[0]);
        const pageIndex1 = fixedPage.indexOf(rule[1]);
        if (pageIndex0 > pageIndex1) {
          const temp = fixedPage[pageIndex0];
          fixedPage[pageIndex0] = fixedPage[pageIndex1];
          fixedPage[pageIndex1] = temp;
        }
      }
    }
  }
  return fixedPage;
}

const { validPages, fixedPages } = pages.reduce<{
  validPages: string[][];
  fixedPages: string[][];
}>(
  (acc, page) => {
    if (isValidPage(page)) {
      acc.validPages.push(page);
    } else {
      acc.fixedPages.push(getFixedPage(page));
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
