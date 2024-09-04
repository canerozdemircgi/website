from math import inf

class Solution1: # Kadane's Algorithm
	def maxProfit(self, prices):
		result, min_prev = 0, inf
		for price in prices:
			result = max(result, price - min_prev)
			min_prev = min(min_prev, price)
		return result

class Solution2: # Kadane's Algorithm _ Reversed
	def maxProfit(self, prices):
		result, max_next = 0, -inf
		for price in reversed(prices):
			result = max(result, max_next - price)
			max_next = max(max_next, price)
		return result