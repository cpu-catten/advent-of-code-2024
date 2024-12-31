import re

with open("./input.txt", "r") as txt:
  mem: str = txt.read().rstrip()
  txt.close()

# Part 1
resultsPart1 = re.findall(r"mul\(([0-9]+),([0-9]+)\)", mem)
sumPart1 = 0
for i in range(len(resultsPart1)):
  sumPart1 += int(resultsPart1[i][0]) * int(resultsPart1[i][1])
print("Part 1:", sumPart1)

# Part 2
resultsPart2 = re.findall(r"mul\(([0-9]+),([0-9]+)\)|(don?\'?t?\(\))", mem)
sumPart2 = 0
isDisabled = False
for i in range(len(resultsPart2)):
  if re.fullmatch(r"[0-9]+", resultsPart2[i][0]) != None and not isDisabled:
    sumPart2 += int(resultsPart2[i][0]) * int(resultsPart2[i][1])
  elif re.fullmatch(r"don\'t\(\)", resultsPart2[i][2]) != None:
    isDisabled = True
  elif re.fullmatch(r"do\(\)", resultsPart2[i][2]) != None:
    isDisabled = False
print("Part 2:", sumPart2)
