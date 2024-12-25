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

# Part 1
resultsPart1 = 0
for i in range(len(machines)):
    m = machines[i][0][0] * machines[i][1][1] - machines[i][0][1] * machines[i][1][0]
    solutions = [
        (machines[i][2][0] * machines[i][1][1] - machines[i][1][0] * machines[i][2][1]) // m,
        (machines[i][0][0] * machines[i][2][1] - machines[i][2][0] * machines[i][0][1]) // m,
        (machines[i][2][0] * machines[i][1][1] - machines[i][1][0] * machines[i][2][1]) % m +
        (machines[i][0][0] * machines[i][2][1] - machines[i][2][0] * machines[i][0][1]) % m == 0
    ]
    resultsPart1 += solutions[0] * 3 + solutions[1] if solutions[2] else 0
print("Part 1:", resultsPart1)

# Part 2
resultsPart2 = 0
for i in range(len(machines)):
    machines[i][2][0] += 10000000000000
    machines[i][2][1] += 10000000000000
    m = machines[i][0][0] * machines[i][1][1] - machines[i][0][1] * machines[i][1][0]
    solutions = [
        (machines[i][2][0] * machines[i][1][1] - machines[i][1][0] * machines[i][2][1]) // m,
        (machines[i][0][0] * machines[i][2][1] - machines[i][2][0] * machines[i][0][1]) // m,
        (machines[i][2][0] * machines[i][1][1] - machines[i][1][0] * machines[i][2][1]) % m +
        (machines[i][0][0] * machines[i][2][1] - machines[i][2][0] * machines[i][0][1]) % m == 0
    ]
    resultsPart2 += solutions[0] * 3 + solutions[1] if solutions[2] else 0
print("Part 2:", resultsPart2)
