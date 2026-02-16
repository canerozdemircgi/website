from random import randint

class Solution:
	def quickSortRecursive(self, data, left, right): # Recursive _ In-Place
		if left < right:
			index_pivot = self.__partition_rand(data, left, right)
			self.quickSortRecursive(data, left, index_pivot - 1)
			self.quickSortRecursive(data, index_pivot + 1, right)

	def quickSortIterative(self, data, left, right): # Iterative _ In-Place
		struct = [(left, right)]
		while struct:
			left, right = struct.pop()
			if left < right:
				index_pivot = self.__partition_rand(data, left, right)
				struct.append((left, index_pivot - 1))
				struct.append((index_pivot + 1, right))

	def quickSelect(self, data, left, right, k):
		while left <= right:
			index_pivot = self.__partition_rand(data, left, right)
			if index_pivot == k:
				return data[index_pivot]
			elif index_pivot < k:
				left = index_pivot + 1
			else:
				right = index_pivot - 1
		return -1

	def __partition_rand(self, data, left, right):
		index_random = randint(left, right)
		# data[left], data[index_random] = data[index_random], data[left]
		# return self.__partitionL(data, left, right)
		data[right], data[index_random] = data[index_random], data[right]
		return self.__partitionR(data, left, right)

	def __partitionR(self, data, left, right): # Right Pivot
		for i in range(left, right):
			if data[i] < data[right]:
				data[i], data[left] = data[left], data[i]
				left += 1
		data[left], data[right] = data[right], data[left]
		return left

	def __partitionL(self, data, left, right): # Left Pivot
		for i in range(right, left, -1):
			if data[i] > data[left]:
				data[i], data[right] = data[right], data[i]
				right -= 1
		data[left], data[right] = data[right], data[left]
		return right