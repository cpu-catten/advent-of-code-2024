with open("./input.txt", "r") as txt:
  raw: str = txt.read().rstrip()
  txt.close()

lab = [list(i) for i in raw.split('\n')]

directions = [
    'up',
    'right',
    'down',
    'left'
]

def locateRobot(map: list[list[str]]) -> tuple[int, int]:
    for i in range(len(map)):
        for j in range(len(map[i])):
            if map[i][j] == '^':
                return (j, i)
    # return (-1, -1)

def checkLab(map: list[list[str]]) -> None:
    for i in range(len(map)):
        for j in range(len(map[i])):
            print(map[i][j], end='')
        print()
    print()

def checkObstructions(map: list[list[str]], x: int, y: int, direction: str, isPart1: bool) -> tuple[bool, int, int, str]:
    dxdy = {
        'up': (0, -1),
        'right': (1, 0),
        'down': (0, 1),
        'left': (-1, 0)
    }
    dx, dy = dxdy[direction]
    newX, newY = x + dx, y + dy
    if newX < 0 or newX > len(map[0]) - 1 or newY < 0 or newY > len(map) - 1:
        if isPart1: map[y][x] = 'X'
        return (True, newX, newY, direction)
    
    while map[newY][newX] == '#':
        direction = directions[(directions.index(direction) + 1) % len(directions)]
        dx, dy = dxdy[direction]
        newX, newY = x + dx, y + dy

    map[y][x], map[newY][newX] = 'X' if isPart1 else map[newY][newX], map[y][x]
    return (False, newX, newY, direction)

# Part 1
x, y = locateRobot(lab)
newLab = [row[:] for row in lab]
direction = directions[0]
leftArea = False
while not leftArea:
    leftArea, x, y, direction = checkObstructions(newLab, x, y, direction, True)

uniqueLocations = 0
for row in newLab:
    uniqueLocations += row.count('X')
# checkLab(newLab)
print('Part 1:', uniqueLocations)

# Part 2
loops = 0
for i in range(len(lab)):
    for j in range(len(lab[i])):
        # print(i, j)
        statesSet = set()
        newLab = [row[:] for row in lab]
        newLab[i][j] = '#'
        x, y = locateRobot(lab)
        direction = directions[0]
        
        leftArea, x, y, direction = checkObstructions(newLab, x, y, direction, False)
        while not leftArea:
            if (x, y, direction) in statesSet:
                loops += 1
                break
            statesSet.add((x, y, direction))
            leftArea, x, y, direction = checkObstructions(newLab, x, y, direction, False)
print('Part 2:', loops)
