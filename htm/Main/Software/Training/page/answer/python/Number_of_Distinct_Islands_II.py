from collections import deque
from copy import deepcopy
from math import inf

class Island:
	def __init__(self):
		self.yMin = self.xMin = inf
		self.yMax = self.xMax = -inf

	def expand(self, y, x):
		self.yMin = min(self.yMin, y)
		self.yMax = max(self.yMax, y)
		self.xMin = min(self.xMin, x)
		self.xMax = max(self.xMax, x)

	def crop(self, grid):
		island = tuple(tuple(col[self.xMin:self.xMax + 1]) for col in grid[self.yMin:self.yMax + 1])

		yLen = len(island)
		xLen = len(island[0])
		instances = [island]
		for _ in range(1, 4):
			instances.append([[0] * xLen for _ in range(yLen)])
		for _ in range(4, 7):
			instances.append([[0] * yLen for _ in range(xLen)])

		for y in range(yLen):
			for x in range(xLen):
				yi = yLen - 1 - y
				xi = xLen - 1 - x
				instances[1][y][x] = instances[4][x][y] = island[yi][x]
				instances[2][y][x] = instances[5][x][y] = island[y][xi]
				instances[3][y][x] = instances[6][x][y] = island[yi][xi]

		for i in range(1, 7):
			instances[i] = tuple(map(tuple, instances[i])) # convert list to tuple
		return island, tuple(instances)

class Solution1:
	def getIslands(self, grid_orig, grid, y, x, yLen, xLen):
		island = Island()
		struct = deque([(y, x)])
		while struct:
			y, x = struct.pop() # dfs - bfs
			grid[y][x] = 0
			island.expand(y, x)
			for yi, xi in (y + 1, x), (y, x + 1), (y - 1, x), (y, x - 1):
				if 0 <= yi < yLen and 0 <= xi < xLen and grid[yi][xi] == 1:
					struct.append((yi, xi))
		return island.crop(grid_orig)

	def numDistinctIslands2(self, grid):
		yLen = len(grid)
		xLen = len(grid[0])
		grid_orig = deepcopy(grid)

		islands = set()
		result = 0
		for y in range(yLen):
			for x in range(xLen):
				if grid[y][x] == 1:
					island, instances = self.getIslands(grid_orig, grid, y, x, yLen, xLen)
					if island not in islands:
						islands.update(instances)
						result += 1
		return result