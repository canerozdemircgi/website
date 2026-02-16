# import heapq # Priority Queue

class Solution:
	def mergeSortRecursive(self, data): # Recursive _ In-Place
		len_data = len(data)
		if len_data < 2:
			return

		middle = len_data // 2
		dataL, dataR = data[:middle], data[middle:]
		self.mergeSortRecursive(dataL)
		self.mergeSortRecursive(dataR)

		# data[:] = heapq.merge(dataL, dataR)
		self.__merge(data, dataL, dataR)

	def mergeSortIterative(self, data): # Iterative _ In-Place
		i, low, high = 1, 0, len(data)
		while i < high:
			for left in range(low, high, i * 2):
				middle, right = left + i, left + i * 2
				# data[left:right] = heapq.merge(data[left:middle], data[middle:right])
				self.__merge(data, data[left:middle], data[middle:right], left)
			i *= 2

	def __merge(self, data, dataL, dataR, i=0):
		len_dataL, len_dataR = len(dataL), len(dataR)
		iL = iR = 0
		while iL < len_dataL and iR < len_dataR:
			if dataL[iL] < dataR[iR]:
				data[i] = dataL[iL]
				iL += 1
			else:
				data[i] = dataR[iR]
				iR += 1
			i += 1

		while iL < len_dataL:
			data[i] = dataL[iL]
			iL += 1
			i += 1

		while iR < len_dataR:
			data[i] = dataR[iR]
			iR += 1
			i += 1