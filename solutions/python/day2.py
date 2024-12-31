with open("./input.txt", "r") as txt:
  rep: str = txt.read().rstrip()
  txt.close()

report = [list(map(int, _.split(' '))) for _ in rep.split('\n')]

levels: list[list[int]] = []
for i in range(len(report)):
  diffs = [0] * (len(report[i]) - 1)
  for j in range(len(report[i]) - 1):
    diffs[j] = report[i][j] - report[i][j + 1]
  levels.append(diffs)

countPart1, countPart2 = 0, 0
for diffs in levels:
  countPos, countNeg, countBadDiff = 0, 0, 0
  for diff in diffs:
    if diff > 0:
      countPos += 1
    else:
      countNeg += 1
    if abs(diff) > 3 or abs(diff) == 0:
      countBadDiff += 1
  
  if countBadDiff == 0 and (countPos == 0 or countNeg == 0):
    countPart1 += 1

  conditions = [
    countBadDiff == 0 and (countPos == 0 or countNeg == 0),
    countBadDiff == 1 and (countPos == 0 or countNeg == 0),
    countBadDiff == 0 and ((countPos == 1 and countNeg > 0) or (countNeg == 1 and countPos > 0))
  ]
  if conditions.count(True) == 1:
    countPart2 += 1

print("Part 1:", countPart1)
print("Part 2:", countPart2)
