with open("./input.txt", "r") as inp:
  sto: str = inp.read().rstrip()
  inp.close()

stones = list(map(int, sto.split(' ')))
print(stones)

for i in range(25):
    j = 0
    new_stones = []
    while j < len(stones):
        if stones[j] == 0:
            new_stones.append(1)
            # stones[j] = 1
        elif len(str(stones[j])) % 2 == 0:
            stone = str(stones[j])
            new_stones.append(int(stone[:len(stone) // 2]))
            new_stones.append(int(stone[len(stone) // 2:]))
            # stones = stones[:j] + [int(stone[:len(stone) // 2])] + [int(stone[len(stone) // 2:])] + stones[j + 1:]
            # j += 1
        else:
            new_stones.append(stones[j] * 2024)
            # stones[j] *= 2024
        j += 1
    stones = new_stones

print(len(stones))
