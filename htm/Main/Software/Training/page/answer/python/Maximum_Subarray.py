from functools import cache
from itertools import islice

# max_prev variant could be transformed into 'Bottom-Up DP' by using max_prev arrays

class Solution1: # Top-Down Memoization
	def maxSubArray(self, numbers):
		@cache
		def maxSubArrayRec(i):
			if i == 0:
				return numbers[0]
			max_try = maxSubArrayRec(i - 1)
			return max(numbers[i], numbers[i] + max_try)

		return max(maxSubArrayRec(i) for i in range(len(numbers)))

class Solution2: # Kadane's Algorithm Variant _ max_prev
	def maxSubArray(self, numbers):
		result = max_prev = numbers[0]
		for number in islice(numbers, 1, None):
			max_prev = max(number, number + max_prev)
			result = max(result, max_prev)
		return result