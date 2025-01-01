with open("./input.txt", "r") as txt:
  raw: str = txt.read().rstrip()
  txt.close()

data = list(map(list, zip(*[_.split(': ') for _ in raw.split('\n')])))
values, equations = list(map(int, data[0])), [list(map(int, _.split(' '))) for _ in data[1]]

# Part 1
resultsPart1 = 0
for i in range(len(values)):
    base10 = 2 ** (len(equations[i]) - 1)
    operators = list(map(int, f'{base10:b}'[1:]))
    while True:
        result = equations[i][0]
        for j in range(len(operators)):
            if operators[j] == 0:
                result += equations[i][j + 1]
            else:
                result *= equations[i][j + 1]
        if result == values[i]:
            resultsPart1 += values[i]
            # print(operators)
            break
        # print(result, operators)
        base10 += 1
        if len(list(map(int, f'{base10:b}'[1:]))) > len(operators):
            break
        operators = list(map(int, f'{base10:b}'[1:]))

print("Part 1:", resultsPart1)

# Part 2
# referencing https://stackoverflow.com/questions/34559663/convert-decimal-to-ternarybase3-in-python
def ternary(n: int) -> str:
    if n == 0:
        return '0'
    nums = []
    while n:
        n, r = divmod(n, 3)
        nums.append(str(r))
    return ''.join(reversed(nums))

resultsPart2 = 0
for i in range(len(values)):
    base10 = 3 ** (len(equations[i]) - 1)
    operators = list(map(int, ternary(base10)[1:]))
    while True:
        result = equations[i][0]
        for j in range(len(operators)):
            if operators[j] == 0:
                result += equations[i][j + 1]
            elif operators[j] == 1:
                result *= equations[i][j + 1]
            else:
                result = int(str(result) + str(equations[i][j + 1]))
        if result == values[i]:
            resultsPart2 += values[i]
            # print(operators)
            break
        # print(result, operators)
        base10 += 1
        if len(list(map(int, ternary(base10)[1:]))) > len(operators):
            break
        operators = list(map(int, ternary(base10)[1:]))

print("Part 2:", resultsPart2)
