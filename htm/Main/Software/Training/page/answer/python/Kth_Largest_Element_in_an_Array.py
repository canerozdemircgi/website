import heapq # Priority Queue
from itertools import islice

import Sort_Quick

class Solution1: # O(n * logn) time
	def findKthLargest(self, numbers, k):
		# numbers.sort(reverse=True)
		# return numbers[k - 1]
		numbers.sort()
		return numbers[-k]

# Solution1 can be also implemented using 'Bubble Sort' by limiting first loop to range(k)
# Solution1 can be also implemented using 'Selection Sort' by limiting first loop to range(k) and inverting comparison

class Solution2: # O(k * logn) time
	def findKthLargest(self, numbers, k):
		return heapq.nlargest(k, numbers)[-1]

class Solution3: # O(k * logn) time
	def findKthLargest(self, numbers, k):
		struct = numbers[:]
		heapq.heapify(struct)
		for _ in range(len(numbers) - k):
			heapq.heappop(struct)
		return struct[0]

class Solution4: # O(k * logn) time
	def findKthLargest(self, numbers, k):
		struct = numbers[:k]
		heapq.heapify(struct)
		for number in islice(numbers, k, None):
			heapq.heappushpop(struct, number)
		return struct[0]

class Solution5: # O(k * logn) time
	def findKthLargest(self, numbers, k):
		struct = numbers[:k]
		heapq.heapify(struct)
		for number in islice(numbers, k, None):
			if number > struct[0]:
				heapq.heapreplace(struct, number)
		return struct[0]

class Solution6(Sort_Quick.Solution): # O(n) time
	def findKthLargest(self, numbers, k):
		len_numbers = len(numbers)
		return self.quickSelect(numbers, 0, len_numbers - 1, len_numbers - k)