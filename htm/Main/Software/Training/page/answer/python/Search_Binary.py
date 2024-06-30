class Solution:
	def binarySearch(self, data, target):
		left, right = 0, len(data) - 1

		while left <= right:
			middle = left + (right - left) // 2 # overflow middle
			if data[middle] < target:
				left = middle + 1
			elif data[middle] > target:
				right = middle - 1
			else:
				return middle

		return -1