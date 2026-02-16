class Solution:
	def insertionSort(self, data): # In-Place
		for i in range(1, len(data)):
			j, current = i - 1, data[i]
			while j >= 0 and current < data[j]:
				data[j + 1] = data[j]
				j -= 1
			data[j + 1] = current