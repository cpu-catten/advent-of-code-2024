with open("./input.txt", "r") as txt:
  puz: str = txt.read().rstrip()
  txt.close()

puzzle = puz.split('\n')

# Part 1
def searchKeywordPart1(keyword: str, puzzle: list[str]) -> int:
    count = 0
    for i in range(len(puzzle)):
        for j in range(len(puzzle[i]) - 3):
            if puzzle[i][j:j + 4] == keyword:
                count += 1
                # print(0, count, j, i)
    
    for i in range(len(puzzle) - 3):
        for j in range(len(puzzle[i])):
            conditions = [
                puzzle[i][j] == keyword[0],
                puzzle[i + 1][j] == keyword[1],
                puzzle[i + 2][j] == keyword[2],
                puzzle[i + 3][j] == keyword[3]
            ]
            if not False in conditions:
                count += 1
                # print(1, count, j, i)
    
    for i in range(len(puzzle) - 3):
        for j in range(len(puzzle[i]) - 3):
            conditions = [
                puzzle[i][j] == keyword[0],
                puzzle[i + 1][j + 1] == keyword[1],
                puzzle[i + 2][j + 2] == keyword[2],
                puzzle[i + 3][j + 3] == keyword[3]
            ]
            if not False in conditions:
                count += 1
                # print(2, count, j, i)
    
    for i in range(len(puzzle) - 3):
        for j in range(3, len(puzzle[i])):
            conditions = [
                puzzle[i][j] == keyword[0],
                puzzle[i + 1][j - 1] == keyword[1],
                puzzle[i + 2][j - 2] == keyword[2],
                puzzle[i + 3][j - 3] == keyword[3]
            ]
            if not False in conditions:
                count += 1
                # print(3, count, j, i)
    return count

countPart1 = searchKeywordPart1('XMAS', puzzle) + searchKeywordPart1('XMAS'[::-1], puzzle)
print("Part 1:", countPart1)

# Part 2
def searchKeywordPart2(keyword: str, puzzle: list[str]) -> int:
    count = 0
    for i in range(len(puzzle) - 2):
        for j in range(len(puzzle[i]) - 2):
            conditions = [
                puzzle[i][j] == keyword[0],
                puzzle[i + 2][j] == keyword[0],
                puzzle[i + 1][j + 1] == keyword[1],
                puzzle[i][j + 2] == keyword[2],
                puzzle[i + 2][j + 2] == keyword[2]
            ]
            if not False in conditions:
                count += 1
                # print(5, count, j, i)
    
    for i in range(len(puzzle) - 2):
        for j in range(len(puzzle[i]) - 2):
            conditions = [
                puzzle[i][j + 2] == keyword[0],
                puzzle[i][j] == keyword[0],
                puzzle[i + 1][j + 1] == keyword[1],
                puzzle[i + 2][j] == keyword[2],
                puzzle[i + 2][j + 2] == keyword[2]
            ]
            if not False in conditions:
                count += 1
                # print(6, count, j, i)
    return count

countPart2 = searchKeywordPart2('MAS', puzzle) + searchKeywordPart2('SAM', puzzle)
print("Part 2:", countPart2)
