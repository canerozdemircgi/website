class Solution1:
	def missingNumber(self, numbers):
		numbers_set = frozenset(numbers)
		for i in range(len(numbers) + 1):
			if i not in numbers_set:
				return i

class Solution2:
	def missingNumber(self, numbers):
		max_number = len(numbers)
		# sum [1, n] = n * (n + 1) / 2
		sum_number = max_number * (max_number + 1) // 2
		return sum_number - sum(numbers)