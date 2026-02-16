import heapq # Priority Queue
from collections import Counter
from random import randint

class Solution1: # Counter _ Builtin
	def topKFrequent(self, numbers, k):
		# return next(zip(*Counter(numbers).most_common(k)))
		# return dict(Counter(numbers).most_common(k)).keys()
		# return [item[0] for item in Counter(numbers).most_common(k)]
		return [key for key, _ in Counter(numbers).most_common(k)]

class Solution2: # Sorted Counter
	def topKFrequent(self, numbers, k):
		counter = Counter(numbers)
		return sorted(counter, key=lambda x: counter[x], reverse=True)[:k]

class Solution3: # Heaped Counter
	def topKFrequent(self, numbers, k):
		struct = [(-value, key) for key, value in Counter(numbers).items()]
		heapq.heapify(struct)
		return [heapq.heappop(struct)[1] for _ in range(k)]

class Solution4: # Heaped Counter _ Builtin
	def topKFrequent(self, numbers, k):
		counter = Counter(numbers)
		return heapq.nlargest(k, counter, key=lambda x: counter[x])

class Solution5: # Modified Quick Select
	def topKFrequent(self, numbers, k):
		counter = Counter(numbers)
		data = list(zip(counter.values(), counter.keys()))
		self.quickSelect(data, 0, len(data) - 1, len(data) - k)
		return [val[1] for val in data[-k:]]

	def quickSelect(self, data, left, right, k):
		while left <= right:
			index_pivot = self.__partition_rand(data, left, right)
			if index_pivot == k:
				return # data[index_pivot]
			elif index_pivot < k:
				left = index_pivot + 1
			else:
				right = index_pivot - 1
		return # -1

	def __partition_rand(self, data, left, right):
		index_random = randint(left, right)
		# data[left], data[index_random] = data[index_random], data[left]
		# return self.__partitionL(data, left, right)
		data[right], data[index_random] = data[index_random], data[right]
		return self.__partitionR(data, left, right)

	def __partitionR(self, data, left, right): # Right Pivot
		for i in range(left, right):
			if data[i][0] < data[right][0]:
				data[i], data[left] = data[left], data[i]
				left += 1
		data[left], data[right] = data[right], data[left]
		return left

	def __partitionL(self, data, left, right): # Left Pivot
		for i in range(right, left, -1):
			if data[i][0] > data[left][0]:
				data[i], data[right] = data[right], data[i]
				right -= 1
		data[left], data[right] = data[right], data[left]
		return right