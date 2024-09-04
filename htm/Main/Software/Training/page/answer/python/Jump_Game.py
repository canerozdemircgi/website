from functools import cache

class Solution1: # Top-Down Memoization
	def __init__(self):
		self.__numbers = None
		self.__max_numbers = 0

	@cache
	def __canJumpRec(self, index):
		if index >= self.__max_numbers:
			return True

		for i in range(self.__numbers[index], 0, -1):
			if self.__canJumpRec(index + i):
				return True

		return False

	def canJump(self, numbers):
		self.__numbers = numbers
		self.__max_numbers = len(numbers) - 1

		return self.__canJumpRec(0)

class Solution2: # Bottom-Up DP
	def canJump(self, numbers):
		len_numbers = len(numbers)
		max_numbers = len_numbers - 1

		results = [0] * len_numbers
		for i in range(len_numbers):
			results[i] = max(results[i - 1], i + numbers[i])
			if results[i] >= max_numbers:
				return True
			if results[i] < i + 1:
				return False

class Solution3: # Bottom-Up DP _ Less Memory
	def canJump(self, numbers):
		len_numbers = len(numbers)
		max_numbers = len_numbers - 1

		results = [0]
		for i in range(len_numbers):
			results[i % 1] = max(results[(i - 1) % 1], i + numbers[i])
			if results[i % 1] >= max_numbers:
				return True
			if results[i % 1] < i + 1:
				return False

class Solution4: # Bottom-Up DP _ Less Memory
	def canJump(self, numbers):
		max_numbers = len(numbers) - 1

		result = result_prev = 0
		for i, number in enumerate(numbers):
			result = max(result_prev, i + number)
			if result >= max_numbers:
				return True
			if result < i + 1:
				return False
			result_prev = result

class Solution5: # Bottom-Up DP _ Less Memory
	def canJump(self, numbers):
		max_numbers = len(numbers) - 1

		result = 0
		for i, number in enumerate(numbers):
			result = max(result, i + number)
			if result >= max_numbers:
				return True
			if result < i + 1:
				return False

class Solution6: # Backward 0-1-2... Check
	def canJump(self, numbers):
		i = len(numbers) - 2
		while i >= 0:
			if numbers[i] == 0:
				i -= 1
				barrier = 1
				while i >= 0:
					if numbers[i] > barrier:
						break
					i -= 1
					barrier += 1
				else:
					return False
			i -= 1
		return True

class Solution7: # Backward 0-1-2... Check _ Simplified
	def canJump(self, numbers):
		len_numbers = len(numbers)
		if len_numbers <= 1:
			return True

		'''
		goal = len_numbers - 1
		for i in range(len_numbers - 2, -1, -1):
			if i + numbers[i] >= goal:
				goal = i
		return goal == 0
		'''

		barrier = 1
		for i in range(len_numbers - 2, -1, -1):
			barrier = (barrier + 1, 1)[numbers[i] >= barrier]
		return numbers[0] >= barrier