import heapq # Priority Queue

from sortedcontainers import SortedList

class MedianFinder1:
	def __init__(self):
		self.struct = []

	def addNum(self, number):
		if len(self.struct) < 2:
			self.struct.append(number)
			self.struct.sort()
		else:
			if number <= self.struct[0]:
				self.struct.insert(0, number)
			elif number >= self.struct[-1]:
				self.struct.append(number)
			else:
				# index = bisect.bisect_left(self.struct, number)
				index = self.binary_search(self.struct, number)
				self.struct.insert(index, number)

	def binary_search(self, data, value):
		left = 0
		right = len(data) - 1

		while left <= right:
			middle = left + (right - left) // 2 # overflow middle
			if data[middle - 1] <= value <= data[middle]:
				return middle

			elif data[middle] < value:
				left = middle + 1
			else:
				right = middle - 1

		return -1

	def findMedian(self):
		len_struct = len(self.struct)
		middle = len_struct // 2
		if len_struct % 2 == 1:
			return self.struct[middle]
		else:
			return (self.struct[middle] + self.struct[middle - 1]) / 2

class MedianFinder2:
	def __init__(self):
		self.minheap = [] # includes big values
		self.maxheap = [] # includes small values

	def addNum(self, number):
		if len(self.minheap) == 0:
			self.minheap.append(number)
			return

		min_of_max = self.minheap[0]
		if number >= min_of_max:
			heapq.heappush(self.minheap, number)
		else:
			heapq.heappush(self.maxheap, number * -1)

		len_min = len(self.minheap)
		len_max = len(self.maxheap)
		if len_min - len_max > 1:
			value = heapq.heappop(self.minheap)
			heapq.heappush(self.maxheap, value * -1)
		elif len_max - len_min > 1:
			value = heapq.heappop(self.maxheap) * -1
			heapq.heappush(self.minheap, value)

	def findMedian(self):
		len_min = len(self.minheap)
		len_max = len(self.maxheap)
		if len_min == len_max:
			return (self.minheap[0] + self.maxheap[0] * -1) / 2
		elif len_min > len_max:
			return self.minheap[0]
		else:
			return self.maxheap[0] * -1

class MedianFinder3:

	def __init__(self):
		self.struct = SortedList()

	def addNum(self, number):
		self.struct.add(number)

	def findMedian(self):
		len_struct = len(self.struct)
		middle = len_struct // 2
		if len_struct % 2 == 1:
			return self.struct[middle]
		else:
			return (self.struct[middle] + self.struct[middle - 1]) / 2