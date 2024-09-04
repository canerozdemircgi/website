from functools import cache
from itertools import islice, chain
from math import inf

# min_prev & max_prev variants could be transformed into 'Bottom-Up DP' by using min_prev and max_prev arrays

class Solution1: # Top-Down Memoization
	def maxProduct(self, numbers):
		@cache
		def maxProductRec(i):
			if i == 0:
				return numbers[0], None, numbers[0]
			min_try, _, max_try = maxProductRec(i - 1)
			return sorted([numbers[i], numbers[i] * max_try, numbers[i] * min_try])

		return max(maxProductRec(i)[-1] for i in range(len(numbers)))

class Solution2: # Kadane's Algorithm Variant _ min_prev & max_prev
	def maxProduct(self, numbers):
		result = min_prev = max_prev = numbers[0]
		for number in islice(numbers, 1, None):
			if number < 0:
				min_prev, max_prev = max_prev, min_prev
			min_prev = min(number, number * min_prev)
			max_prev = max(number, number * max_prev)
			result = max(result, max_prev)
		return result

class Solution3: # Kadane's Algorithm Variant _ min_prev & max_prev
	def maxProduct(self, numbers):
		result = min_prev = max_prev = numbers[0]
		for number in islice(numbers, 1, None):
			# min_prev, max_prev = min(number, number * min_prev, number * max_prev), max(number, number * min_prev, number * max_prev)
			min_prev, _, max_prev = sorted((number, number * min_prev, number * max_prev))
			result = max(result, max_prev)
		return result

class Solution4: # Kadane's Algorithm Variant _ prefix array & suffix array
	# combined two pass into one
	def maxProduct(self, numbers):
		srebmun = numbers[:]
		for i in range(1, len(numbers)):
			numbers[i] *= numbers[i - 1] or 1
			srebmun[~i] *= srebmun[~(i - 1)] or 1
		# return max(max(numbers), max(srebmun))
		return max(chain(numbers, srebmun))

class Solution5: # Kadane's Algorithm Variant _ prefix & suffix
	# combined two pass into one
	def maxProduct(self, numbers):
		result = -inf
		prefix = suffix = 1
		for i in range(len(numbers)):
			prefix = (prefix or 1) * numbers[i]
			suffix = (suffix or 1) * numbers[~i]
			result = max(result, prefix, suffix)
		return result