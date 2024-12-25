with open("./input.txt", "r") as txt:
  raw: str = txt.read().rstrip()
  txt.close()

rawData = [item.split('\n') for item in raw.split('\n\n')]
rules, pages = [rule.split('|') for rule in rawData[0]], [page.split(',') for page in rawData[1]]

def pageIsValid(page: list[str]) -> bool:
    for rule in rules:
        if rule[0] in page and rule[1] in page:
            # print(rule, page.index(rule[0]), page.index(rule[1]))
            if page.index(rule[0]) > page.index(rule[1]):
                return False
    return True

def fixPage(page: list[str]) -> list[str]:
    for i in range(len(rules) - 1):
        for j in range(i, len(rules)):
            if rules[j][0] in page and rules[j][1] in page:
                if page.index(rules[j][0]) > page.index(rules[j][1]):
                    page[page.index(rules[j][0])], page[page.index(rules[j][1])] = page[page.index(rules[j][1])], page[page.index(rules[j][0])]
    return page

validPages, fixedPages = [], []
for page in pages:
    if pageIsValid(page):
        validPages.append(page)
    else:
        fixedPages.append(fixPage(page))

resultsPart1 = 0
for page in validPages:
    resultsPart1 += int(page[len(page) // 2])
print("Part 1:", resultsPart1)

resultsPart2 = 0
for page in fixedPages:
    resultsPart2 += int(page[len(page) // 2])
print("Part 2:", resultsPart2)
