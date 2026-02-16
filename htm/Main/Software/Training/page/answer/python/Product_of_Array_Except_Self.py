class Solution1: # Two Pass * O(2n) space
	def productExceptSelf(self, numbers):
		len_numbers = len(numbers)

		left = [1] * len_numbers
		for i in range(1, len_numbers):
			left[i] = left[i - 1] * numbers[i - 1]

		right = [1] * len_numbers
		for i in range(len_numbers - 2, -1, -1):
			right[i] = right[i + 1] * numbers[i + 1]

		return [left[i] * right[i] for i in range(len_numbers)]

class Solution2: # Two Pass * O(n) space
	def productExceptSelf(self, numbers):
		len_numbers = len(numbers)
		result = [1] * len_numbers

		for i in range(1, len_numbers):
			result[i] = result[i - 1] * numbers[i - 1]

		prod = 1
		for i in range(len_numbers - 1, -1, -1):
			result[i] *= prod
			prod *= numbers[i]

		return result

class Solution3: # One Pass * O(n) space
	def productExceptSelf(self, numbers):
		len_numbers = len(numbers)
		result = [1] * len_numbers

		left = right = 1
		for i in range(len_numbers):
			result[i] *= left
			left *= numbers[i]
			result[~i] *= right
			right *= numbers[~i]

		return result