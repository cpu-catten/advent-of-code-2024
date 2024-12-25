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

def locateRobot(lab: list[list[str]]) -> tuple[int, int]:
    for i in range(len(lab)):
        for j in range(len(lab[i])):
            if lab[i][j] == '^':
                return (j, i)

def checkLab(lab: list[list[str]]) -> None:
    for i in range(len(lab)):
        for j in range(len(lab[i])):
            print(lab[i][j], end='')
        print()
    print()

def checkObstructions(dx: int, dy: int) -> bool:
    global x, y, direction
    newX, newY = x + dx, y + dy
    if newX < 0 or newX > len(lab[0]) - 1 or newY < 0 or newY > len(lab) - 1:
        lab[y][x] = 'X'
        return True
    
    if lab[newY][newX] == '#':
        direction = directions[(directions.index(direction) + 1) % len(directions)]
        newX, newY = x - dy, y + dx

    # print(x, y, newX, newY, direction)
    lab[y][x], lab[newY][newX] = 'X', '^'
    x, y = newX, newY
    # checkLab()
    return False

x, y = locateRobot(lab)
direction = directions[0]
leftArea = False
while not leftArea:
    if direction == directions[0]:
        leftArea = checkObstructions(0, -1)
    elif direction == directions[1]:
        leftArea = checkObstructions(1, 0)
    elif direction == directions[2]:
        leftArea = checkObstructions(0, 1)
    elif direction == directions[3]:
        leftArea = checkObstructions(-1, 0)

uniqueLocations = 0
for row in lab:
    uniqueLocations += row.count('X')

# checkLab()
print(uniqueLocations)
