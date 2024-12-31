with open("./input.txt", "r") as inp:
  wli: str = inp.read().rstrip()
  inp.close()

warehouse, movements = wli.split('\n\n')
warehouse = [list(row) for row in warehouse.split('\n')]
movements = list(movements.replace('\n', ''))
dxdy = {
    '^': (0, -1),
    '>': (1, 0),
    'v': (0, 1),
    '<': (-1, 0)
}

def checkWarehouse(map: list[list[str]]) -> None:
    for i in range(len(map)):
        for j in range(len(map[i])):
            print(map[i][j], end='')
        print()
    print()

def locateRobot(map: list[list[str]]) -> tuple[int, int]:
    for i in range(len(map)):
        for j in range(len(map[i])):
            if map[i][j] == '@':
                return (j, i)
    # return (-1, -1)

def moveRobot(map: list[list[str]], movements: list[str]) -> None:
    x, y = locateRobot(map)
    for i in range(len(movements)):
        movable = True
        dx, dy = dxdy[movements[i]]
        if dx != 0:
            lastBox = x
            while map[y][lastBox + dx] == 'O':
                lastBox += dx
            if map[y][lastBox + dx] == '.':
                map[y][x + dx], map[y][lastBox + dx] = map[y][lastBox + dx], map[y][x + dx]
            elif map[y][lastBox + dx] == '#':
                movable = False
        else:
            lastBox = y
            while map[lastBox + dy][x] == 'O':
                lastBox += dy
            if map[lastBox + dy][x] == '.':
                map[y + dy][x], map[lastBox + dy][x] = map[lastBox + dy][x], map[y + dy][x]
            elif map[lastBox + dy][x] == '#':
                movable = False
        if movable:
            map[y][x], map[y + dy][x + dx] = map[y + dy][x + dx], map[y][x]
            x += dx
            y += dy
    # print(i, dy, dx, lastBox, movable)
    # checkWarehouse(map)

# checkWarehouse(map)
map = [row[:] for row in warehouse]
moveRobot(map, movements)
coordsSum = 0
for i in range(1, len(map) - 1):
    for j in range(1, len(map[i]) - 1):
        if map[i][j] == 'O':
            coordsSum += i * 100 + j
print(coordsSum)

# if movements[i] == '^' and (warehouse[y - 1][x] == '.' or (warehouse[y - 1][x] == 'O' and warehouse[y - 2][x] != '#')):
#     if warehouse[y - 1][x] == 'O':
#         warehouse[y - 1][x], warehouse[y - 2][x] = warehouse[y - 2][x], warehouse[y - 1][x]
#     warehouse[y][x], warehouse[y - 1][x] = warehouse[y - 1][x], warehouse[y][x]
#     y -= 1
# elif movements[i] == 'v' and (warehouse[y + 1][x] == '.' or (warehouse[y + 1][x] == 'O' and warehouse[y + 2][x] != '#')):
#     if warehouse[y + 1][x] == 'O':
#         warehouse[y + 1][x], warehouse[y + 2][x] = warehouse[y + 2][x], warehouse[y + 1][x]
#     warehouse[y][x], warehouse[y + 1][x] = warehouse[y + 1][x], warehouse[y][x]
#     y += 1
# elif movements[i] == '<' and (warehouse[y][x - 1] == '.' or (warehouse[y][x - 1] == 'O' and warehouse[y][x - 2] != '#')):
#     if warehouse[y][x - 1] == 'O':
#         warehouse[y][x - 1], warehouse[y][x - 2] = warehouse[y][x - 2], warehouse[y][x - 1]
#     warehouse[y][x], warehouse[y][x - 1] = warehouse[y][x - 1], warehouse[y][x]
#     x -= 1
# elif movements[i] == '>' and (warehouse[y][x + 1] == '.' or (warehouse[y][x + 1] == 'O' and warehouse[y][x + 2] != '#')):
#     if warehouse[y][x + 1] == 'O':
#         warehouse[y][x + 1], warehouse[y][x + 2] = warehouse[y][x + 2], warehouse[y][x + 1]
#     warehouse[y][x], warehouse[y][x + 1] = warehouse[y][x + 1], warehouse[y][x]
#     x += 1
