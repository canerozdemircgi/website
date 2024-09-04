from functools import cache

class Solution1: # Top-Down Memoization _ 1
	def __init__(self):
		self._moneys = None

	@cache
	def _robRec(self, index):
		if index < 0:
			return 0

		choice1, choice2 = self._robRec(index - 2), self._robRec(index - 3)
		return self._moneys[index] + max(choice1, choice2)

	def rob(self, moneys):
		self._moneys = moneys
		len_moneys = len(moneys)
		return max(self._robRec(len_moneys - 1), self._robRec(len_moneys - 2))

class Solution2: # Top-Down Memoization _ 2
	def __init__(self):
		self._moneys = None

	@cache
	def _robRec(self, index):
		if index < 0:
			return 0

		choice1, choice2 = self._robRec(index - 1), self._robRec(index - 2)
		return max(choice1, choice2 + self._moneys[index])

	def rob(self, moneys):
		self._moneys = moneys
		return self._robRec(len(moneys) - 1)

class Solution3: # Bottom-Up DP
	def rob(self, moneys):
		len_moneys = len(moneys)
		if len_moneys == 1:
			return moneys[0]

		results = [0] * len_moneys
		for i in range(len_moneys):
			results[i] = max(results[i - 1], results[i - 2] + moneys[i])
		return results[-1]

class Solution4: # Bottom-Up DP _ Less Memory
	def rob(self, moneys):
		len_moneys = len(moneys)
		results = [0, 0]
		for i in range(len_moneys):
			results[i % 2] = max(results[(i - 1) % 2], results[(i - 2) % 2] + moneys[i])
		return results[(len_moneys - 1) % 2]

class Solution5: # Bottom-Up DP _ Less Memory
	def rob(self, moneys):
		result = result_prev1 = result_prev2 = 0
		for money in moneys:
			result = max(result_prev1, result_prev2 + money)
			result_prev1, result_prev2 = result, result_prev1
		return result

class Solution6: # Bottom-Up DP _ Less Memory
	def rob(self, moneys):
		result = result_prev1 = 0
		for money in moneys:
			result, result_prev1 = max(result, result_prev1 + money), result
		return result