class Solution1: # saving values
	def setZeroes(self, matrix):
		xs = set()
		ys = set()
		for y in range(len(matrix)):
			for x in range(len(matrix[y])):
				if matrix[y][x] == 0:
					ys.add(y)
					xs.add(x)
		for y in range(len(matrix)):
			if y in ys:
				matrix[y] = [0] * len(matrix[y])
			else:
				for x in range(len(matrix[y])):
					if x in xs:
						matrix[y][x] = 0

class Solution2: # replacing values
	def setZeroes(self, matrix):
		for y in range(len(matrix)):
			for x in range(len(matrix[y])):
				if matrix[y][x] == 0:
					for yi in range(len(matrix)):
						if matrix[yi][x] != 0:
							matrix[yi][x] = None
					for xi in range(len(matrix[0])):
						if matrix[y][xi] != 0:
							matrix[y][xi] = None
		for y in range(len(matrix)):
			for x in range(len(matrix[y])):
				if matrix[y][x] is None:
					matrix[y][x] = 0

class Solution3: # using first row and first column to save
	def setZeroes(self, matrix):
		yZero = False
		for y in range(len(matrix)):
			if matrix[y][0] == 0:
				yZero = True
				break
		xZero = False
		for x in range(len(matrix[0])):
			if matrix[0][x] == 0:
				xZero = True
				break
		for y in range(len(matrix)):
			for x in range(len(matrix[y])):
				if matrix[y][x] == 0:
					matrix[y][0] = 0
					matrix[0][x] = 0
		for y in range(1, len(matrix)):
			for x in range(1, len(matrix[y])):
				if matrix[y][0] == 0 or matrix[0][x] == 0:
					matrix[y][x] = 0
		if yZero:
			for y in range(len(matrix)):
				matrix[y][0] = 0
		if xZero:
			for x in range(len(matrix[0])):
				matrix[0][x] = 0