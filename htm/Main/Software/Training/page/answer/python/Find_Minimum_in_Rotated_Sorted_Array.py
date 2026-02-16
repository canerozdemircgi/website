class Solution1: # Binary Search
	def _findMinIndex(self, numbers):
		len_numbers = len(numbers)
		if len_numbers == 1 or numbers[0] < numbers[-1]:
			return 0

		left, right = 0, len_numbers - 1
		while left <= right:
			middle = left + (right - left) // 2 # overflow middle
			if numbers[middle - 1] > numbers[middle]:
				return middle

			if numbers[-1] < numbers[middle]:
				left = middle + 1
			else:
				right = middle - 1

	def findMin(self, numbers):
		return numbers[self._findMinIndex(numbers)]

class Solution2: # Binary Search _ Alternative
	def _findMinIndex(self, numbers):
		len_numbers = len(numbers)
		if len_numbers == 1 or numbers[0] < numbers[-1]:
			return 0

		left, right = 0, len_numbers - 1
		while left <= right:
			middle = left + (right - left) // 2 # overflow middle
			if numbers[-1] < numbers[middle]:
				left = middle + 1
			else:
				right = middle - 1
		return left

	def findMin(self, numbers):
		return numbers[self._findMinIndex(numbers)]