from functools import cache

# this question is about permutation, not combination

class Solution1: # Top-Down Memoization
	def __init__(self):
		self.__numbers = None

	@cache
	def __combinationSum4Rec(self, target):
		if target < 0:
			return 0
		if target == 0:
			return 1

		return sum(self.__combinationSum4Rec(target - number) for number in self.__numbers)

	def combinationSum4(self, numbers, target):
		# early termination is not obligatory since cache covers it
		self.__numbers = numbers
		return self.__combinationSum4Rec(target)

class Solution2: # Bottom-Up DP _ Backward
	def combinationSum4(self, numbers, target):
		numbers.sort() # early termination preparing
		results = [0] * (target + 1)
		results[0] = 1
		for index in range(1, target + 1): # loop order matters
			for number in numbers:
				if index < number: # early termination
					break
				results[index] += results[index - number]
		return results[-1]

class Solution3: # Bottom-Up DP _ Forward
	def combinationSum4(self, numbers, target):
		numbers.sort() # early termination preparing
		results = [0] * (target + 1)
		results[0] = 1
		for index in range(target + 1): # loop order matters
			if results[index] <= 0:
				continue
			for number in numbers:
				index_frw = index + number
				if index_frw > target: # early termination
					break
				results[index_frw] += results[index]
		return results[-1]