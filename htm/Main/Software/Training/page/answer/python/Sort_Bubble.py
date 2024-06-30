class Solution:
	def bubbleSort(self, data): # In-Place
		len_data = len(data)
		for i in range(len_data - 1):
			for j in range(len_data - 1 - i):
				if data[j] > data[j + 1]:
					data[j], data[j + 1] = data[j + 1], data[j]