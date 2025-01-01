with open("./input.txt", "r") as txt:
  num: str = txt.read().rstrip()
  txt.close()

numbers = list(map(int, num.split('\n')))

def mix(value: int, secret: int) -> int:
  return value ^ secret
def prune(secret: int) -> int:
  return secret % 16777216
def generateNewNumber(number: int) -> int:
  step1 = prune(mix(number * 64, number))
  step2 = prune(mix(step1 // 32, step1))
  step3 = prune(mix(step2 * 2048, step2))
  return step3

for i in range(2000):
  for j in range(len(numbers)):
    numbers[j] = generateNewNumber(numbers[j])

result = 0
for number in numbers:
  result += number
print(result)
