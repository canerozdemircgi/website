class Solution1:
	def rotate90(self, matrix):
		size_y = len(matrix)
		size_x = len(matrix[0])
		matrix_copy = [[0] * size_y for _ in range(size_x)]
		for y in range(size_y):
			for x in range(size_x):
				matrix_copy[x][y] = matrix[(size_y - 1 - y)][x]
		return matrix_copy

	def rotate180(self, matrix):
		size_y = len(matrix)
		size_x = len(matrix[0])
		for y in range(size_y):
			for x in range(y + 1, size_x):
				yN = (size_y - 1 - y)
				xN = (size_x - 1 - x)
				matrix[y][x], matrix[yN][xN] = matrix[yN][xN], matrix[y][x]
		return matrix

	def rotate270(self, matrix):
		size_y = len(matrix)
		size_x = len(matrix[0])
		matrix_copy = [[0] * size_y for _ in range(size_x)]
		for y in range(size_y):
			for x in range(size_x):
				matrix_copy[x][y] = matrix[y][(size_x - 1 - x)]
		return matrix_copy

	def rotate90_WithoutExtraSpace(self, matrix): # required size_y == size_x
		size_y = len(matrix)
		size_x = len(matrix[0])
		for y in range(size_y):
			for x in range(y + 1, size_x):
				matrix[y][x], matrix[x][y] = matrix[x][y], matrix[y][x]
			matrix[y].reverse()
		return matrix

	def rotate270_WithoutExtraSpace(self, matrix): # required size_y == size_x
		size_y = len(matrix)
		size_x = len(matrix[0])
		for y in range(size_y):
			for x in range(y + 1, size_x):
				matrix[y][x], matrix[x][y] = matrix[x][y], matrix[y][x]
		for y in range(size_y // 2):
			matrix[y], matrix[size_y - y - 1] = matrix[size_y - y - 1], matrix[y]
		return matrix