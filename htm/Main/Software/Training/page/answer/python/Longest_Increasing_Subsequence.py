from collections import deque
from functools import cache

import Sort_Patience

# Path Tracing results may have more than one variation

class Solution1: # Top-Down Memoization
	def __init__(self):
		self.__numbers = None

	@cache
	def __lengthOfLISRec(self, index):
		result = 1
		for i in range(index):
			if self.__numbers[index] > self.__numbers[i]:
				result = max(result, self.__lengthOfLISRec(i) + 1)
		return result

	def lengthOfLIS(self, numbers):
		self.__numbers = numbers
		return max(self.__lengthOfLISRec(i) for i in range(len(numbers)))

class Solution2: # Top-Down Memoization | Path Tracing
	def __init__(self):
		self.__numbers = None

	@cache
	def __pathOfLISRec(self, index):
		count, path = 1, []
		for i in range(index):
			if self.__numbers[index] > self.__numbers[i]:
				count_try, path_try = self.__pathOfLISRec(i)
				count_try += 1
				if count_try > count:
					count, path = count_try, path_try
		return count, path + [self.__numbers[index]]

	def pathOfLIS(self, numbers):
		self.__numbers = numbers
		return max(self.__pathOfLISRec(i) for i in range(len(numbers)))

class Solution3: # Bottom-Up DP
	def lengthOfLIS(self, numbers):
		len_numbers = len(numbers)
		results = [1] * len_numbers
		for i in range(1, len_numbers):
			for j in range(i):
				if numbers[i] > numbers[j]:
					results[i] = max(results[i], results[j] + 1)
		return max(results)

class Solution4: # Bottom-Up DP | Path Tracing
	def pathOfLIS(self, numbers):
		len_numbers = len(numbers)
		results = [1] * len_numbers
		for i in range(1, len_numbers):
			for j in range(i):
				if numbers[i] > numbers[j]:
					results[i] = max(results[i], results[j] + 1)

		i_max = results.index(max(results))
		path = deque([numbers[i_max]])
		for i in range(i_max - 1, -1, -1):
			if numbers[i] < numbers[i_max] and results[i] == results[i_max] - 1:
				path.appendleft(numbers[i])
				i_max = i
		return path

class Solution5(Sort_Patience.Solution): # Patience Sorting
	def lengthOfLIS(self, numbers):
		return len(self._createPiles(numbers))

class Solution6(Sort_Patience.SolutionPath): # Patience Sorting | Path Tracing
	def pathOfLIS(self, numbers):
		return self._createPaths(numbers)