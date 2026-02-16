from functools import cache
from math import factorial

class Solution1: # Top-Down Memoization
	@cache
	def __uniquePathsRec(self, y, x):
		if x < 0 or y < 0:
			return 0
		if y == x == 0:
			return 1

		return self.__uniquePathsRec(y - 1, x) + self.__uniquePathsRec(y, x - 1)

	def uniquePaths(self, y, x):
		return self.__uniquePathsRec(y - 1, x - 1)

class Solution2: # Bottom-Up DP
	def uniquePaths(self, y, x):
		results = [[1] * x for _ in range(y)]
		for yi in range(1, y):
			for xi in range(1, x):
				results[yi][xi] = results[yi - 1][xi] + results[yi][xi - 1]
		return results[-1][-1]

class Solution3: # Bottom-Up DP _ Less Memory
	def uniquePaths(self, y, x):
		if y < x:
			y, x = x, y # Reduce Memory Even More
		results = [[1] * x for _ in range(2)]
		for yi in range(1, y):
			for xi in range(1, x):
				results[yi % 2][xi] = results[(yi - 1) % 2][xi] + results[yi % 2][xi - 1]
		return results[(y - 1) % 2][-1]

class Solution4: # Bottom-Up DP _ Less Memory
	def uniquePaths(self, y, x):
		if y < x:
			y, x = x, y # Reduce Memory Even More
		results = [1] * x # prev_col
		for _ in range(1, y):
			for xi in range(1, x):
				results[xi] += results[xi - 1]
			''' prev_row = results[xi] '''
			''' results[xi] = prev_row + results[xi - 1] '''
		return results[-1]

class Solution5: # Math - Repeated Permutation
	def uniquePaths(self, y, x):
		return factorial(y + x - 2) // (factorial(y - 1) * factorial(x - 1))

class Solution6: # Math - Repeated Permutation _ Optimized
	def uniquePaths(self, y, x):
		result = 1
		for top, bot in zip(range(y, y + x), range(1, x)):
			result *= top
			result //= bot
		return result