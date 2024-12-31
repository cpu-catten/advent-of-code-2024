with open("./input.txt", "r") as txt:
  mac: str = txt.read().rstrip()
  txt.close()

machines = [
    [
        [
            int(i.replace('=', '+').split('+')[-1]) for i in coords.split(', ')
        ]
    for coords in machine.split('\n')]
for machine in mac.split('\n\n')]

def solveLinearEquationInTwoUnknowns(a: int, b: int, c: int, d: int, x: int, y: int) -> tuple:
    m = a * x - b * d
    return (
        (c * x - b * y) // m,
        (a * y - c * d) // m,
        (c * x - b * y) % m + (a * y - c * d) % m == 0
    )

# Part 1
resultsPart1 = 0
for i in range(len(machines)):
    x, y, isReachable = solveLinearEquationInTwoUnknowns(machines[i][0][0], machines[i][1][0], machines[i][2][0], machines[i][0][1], machines[i][1][1], machines[i][2][1])
    resultsPart1 += x * 3 + y if isReachable else 0
print("Part 1:", resultsPart1)

# Part 2
resultsPart2 = 0
for i in range(len(machines)):
    machines[i][2][0] += 10000000000000
    machines[i][2][1] += 10000000000000
    x, y, isReachable = solveLinearEquationInTwoUnknowns(machines[i][0][0], machines[i][1][0], machines[i][2][0], machines[i][0][1], machines[i][1][1], machines[i][2][1])
    resultsPart2 += x * 3 + y if isReachable else 0
print("Part 2:", resultsPart2)
