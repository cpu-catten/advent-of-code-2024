with open("./input.txt", "r") as txt:
  rob: str = txt.read().rstrip()
  txt.close()

robots = list(map(list, zip(*[robot.split(' ') for robot in rob.split('\n')])))
locations = [list(map(int, location.split('=')[-1].split(','))) for location in robots[0]]
velocities = [list(map(int, velocity.split('=')[-1].split(','))) for velocity in robots[1]]

def multiplyQuadrants(locations: list[list[int]], width: int, height: int) -> int:
    width //= 2
    height //= 2
    quadrant = [0] * 4
    for location in locations:
        if location[0] < width and location[1] < height:
            quadrant[0] += 1
        elif location[0] > width and location[1] < height:
            quadrant[1] += 1
        elif location[0] < width and location[1] > height:
            quadrant[2] += 1
        elif location[0] > width and location[1] > height:
            quadrant[3] += 1
    # print(quadrant)
    return quadrant[0] * quadrant[1] * quadrant[2] * quadrant[3]

def getLocationsDisplay(locations: list[list[int]], width: int, height: int) -> str:
    grid = [['.'] * width for _ in range(height)]
    for location in locations:
        grid[location[1]][location[0]] = '#'
    result = ''
    for row in grid:
        result += ''.join(row) + '\n'
    return result[:-1]

width = 101
height = 103
i = 1
while True:
    for j in range(len(locations)):
        locations[j][0] = (locations[j][0] + velocities[j][0]) % width
        locations[j][1] = (locations[j][1] + velocities[j][1]) % height
    if i == 100:
        resultsPart1 = multiplyQuadrants(locations, width, height)
    display = getLocationsDisplay(locations, width, height)
    if '#' * 10 in display:
        print(display)
        print("Part 1:", resultsPart1)
        print("Part 2:", i)
        break
    i += 1
