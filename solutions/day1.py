with open("./input.txt", "r") as txt:
  loc: str = txt.read().rstrip()
  txt.close()

location = [_.split('   ') for _ in loc.split('\n')]
locations = [list(map(lambda x: int(x[_]), location)) for _ in range(2)]

# Part 1
locations[0].sort()
locations[1].sort()
sumPart1 = 0
for i in range(len(location)):
  sumPart1 += abs(locations[0][i] - locations[1][i])
print("Part 1:", sumPart1)

# Part 2
sumPart2 = 0
for i in range(len(location)):
  sumPart2 += locations[1].count(locations[0][i]) * locations[0][i]
print("Part 2:", sumPart2)
