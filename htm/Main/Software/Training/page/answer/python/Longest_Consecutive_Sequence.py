from collections import defaultdict
from functools import cache

import Union_Find

class Solution1: # Sorted Set
	def longestConsecutive(self, numbers):
		if not numbers:
			return 0

		numbers = sorted(frozenset(numbers))
		results = [1]
		for i in range(1, len(numbers)):
			# without set
			# if numbers[i] == numbers[i - 1]:
			#	continue
			if numbers[i] - numbers[i - 1] == 1:
				results[-1] += 1
			else:
				results.append(1)
		return max(results)

class Solution2: # Sorted Set _ Less Memory
	def longestConsecutive(self, numbers):
		if not numbers:
			return 0

		numbers = sorted(frozenset(numbers))
		result = result_current = 1
		for i in range(1, len(numbers)):
			# without set
			# if numbers[i] == numbers[i - 1]:
			#	continue
			if numbers[i] - numbers[i - 1] == 1:
				result_current += 1
			else:
				result, result_current = max(result, result_current), 1
		return max(result, result_current)

class Solution3: # Set Only
	def longestConsecutive(self, numbers):
		numbers = frozenset(numbers)
		result = 0
		for number in numbers:
			if number - 1 not in numbers:
				number_end = number + 1
				while number_end in numbers:
					number_end += 1
				result = max(result, number_end - number)
		return result

class Solution4: # Set Only with Removal
	def longestConsecutive(self, numbers):
		numbers = set(numbers)
		result = 0
		while numbers:
			left = right = numbers.pop()
			while left - 1 in numbers:
				left -= 1
				numbers.remove(left)
			while right + 1 in numbers:
				right += 1
				numbers.remove(right)
			result = max(result, right - left + 1)
		return result

class Solution5: # Top-Down Memoization
	def longestConsecutive(self, numbers):
		@cache
		def longestConsecutiveRec(number):
			number -= 1
			if number in numbers:
				return longestConsecutiveRec(number) + 1
			return 1

		if not numbers:
			return 0

		numbers = frozenset(numbers)
		return max(longestConsecutiveRec(number) for number in numbers)

class Solution6(Union_Find.Solution): # Union-Find
	def longestConsecutive(self, numbers):
		if not numbers:
			return 0

		numbers = frozenset(numbers)

		parent = {number: number for number in numbers}
		size = defaultdict(lambda: 1)
		size['d'] = 1

		def callbackNotEq(ia, ib):
			size[ia] += size[ib]

		for number in numbers:
			if number - 1 in numbers:
				self.union(parent, number, number - 1, callbackNotEq=callbackNotEq)

		return max(size.values())