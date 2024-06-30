class Solution:
	def selectionSort(self, data): # In-Place
		len_data = len(data)
		for i in range(len_data):
			i_min = i
			for j in range(i + 1, len_data):
				if data[j] < data[i_min]:
					i_min = j
			data[i], data[i_min] = data[i_min], data[i]