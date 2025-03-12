from enum import Enum

class Direction(Enum):
	right = 0
	down = 1
	left = 2
	up = 3
	matrix = [(0, 1), (1, 0), (0, -1), (-1, 0)]

	def get_new_direction(self):
		return Direction((self.value + 1) % (len(Direction) - 1))

class Solution1: # more understandable clear way
	def move(self, y, x, direction):
		matrix = Direction.matrix.value[direction.value]
		return y + matrix[0], x + matrix[1]

	def check(self, y, x, size_y, size_x, visiteds):
		if x < 0 or x >= size_x:
			return False
		if y < 0 or y >= size_y:
			return False
		if visiteds[y][x]:
			return False
		return True

	def spiralOrder(self, matrix):
		size_y, size_x = len(matrix), len(matrix[0])
		size_all = size_y * size_x
		y = x = 0
		result = [matrix[y][x]]
		visiteds = [[False] * size_x for _ in range(size_y)]
		visiteds[0][0] = True
		visiteds_count = 1
		direction = Direction.right
		while visiteds_count != size_all:
			y_try, x_try = self.move(y, x, direction)
			is_success = self.check(y_try, x_try, size_y, size_x, visiteds)
			if is_success:
				y, x = y_try, x_try
			else:
				direction = direction.get_new_direction()
				y, x = self.move(y, x, direction)
			result.append(matrix[y][x])
			visiteds[y][x] = True
			visiteds_count += 1
		return result

class Solution2:
	def __init__(self):
		self.size_y = self.size_x = 0
		self.index_y = self.index_x = 0
		self.index = 0

	def get_direction(self, direction):
		if self.index == 0:
			if self.index_x > 0:
				self.index_x -= 1
				return direction
			self.index = 1
			self.size_x -= 1
			self.index_x = self.size_x
			return self.get_direction(direction.get_new_direction())
		else:
			if self.index_y > 0:
				self.index_y -= 1
				return direction
			self.index = 0
			self.size_y -= 1
			self.index_y = self.size_y
			return self.get_direction(direction.get_new_direction())

	def move(self, y, x, direction):
		matrix = Direction.matrix.value[direction.value]
		return y + matrix[0], x + matrix[1]

	def spiralOrder(self, matrix):
		self.size_y, self.size_x = len(matrix) - 1, len(matrix[0])
		self.index_y, self.index_x = self.size_y, self.size_x
		size_all = len(matrix) * len(matrix[0])
		y, x = 0, -1
		result = []
		direction = Direction.right
		while len(result) != size_all:
			direction = self.get_direction(direction)
			y, x = self.move(y, x, direction)
			result.append(matrix[y][x])
		return result