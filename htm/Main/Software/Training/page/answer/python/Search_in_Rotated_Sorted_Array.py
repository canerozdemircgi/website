import Find_Minimum_in_Rotated_Sorted_Array

class Solution1(Find_Minimum_in_Rotated_Sorted_Array.Solution1): # Binary Search with Find Minimum
	def search(self, numbers, target):
		index_min = self._findMinIndex(numbers)
		if numbers[index_min] == target:
			return index_min

		if numbers[index_min] <= target <= numbers[-1]:
			left, right = index_min + 1, len(numbers) - 1
		else:
			left, right = 0, index_min - 1

		while left <= right:
			middle = left + (right - left) // 2 # overflow middle
			if numbers[middle] < target:
				left = middle + 1
			elif numbers[middle] > target:
				right = middle - 1
			else:
				return middle
		return -1

class Solution2: # Binary Search without Find Minimum
	def search(self, numbers, target):
		left, right = 0, len(numbers) - 1
		while left <= right:
			middle = left + (right - left) // 2 # overflow middle
			if numbers[middle] == target:
				return middle
			if numbers[left] <= numbers[middle]:
				if numbers[left] <= target < numbers[middle]:
					right = middle - 1
				else:
					left = middle + 1
			else:
				if numbers[middle] < target <= numbers[right]:
					left = middle + 1
				else:
					right = middle - 1
		return -1