from collections import deque

class Solution1: # graph solution
	def eliminateIslands(self, graph, start):
		struct = deque([start])
		while struct:
			current = struct.pop() # dfs - bfs
			if current in graph:
				for child in graph[current]:
					struct.append(child)
				del graph[current]

	def numIslands(self, grid):
		yLen = len(grid)
		xLen = len(grid[0])

		graph = {}
		for y in range(yLen):
			for x in range(xLen):
				if grid[y][x] == '1':
					key = (y, x)
					graph[key] = []
					for yi, xi in (y + 1, x), (y, x + 1), (y - 1, x), (y, x - 1):
						if 0 <= yi < yLen and 0 <= xi < xLen and grid[yi][xi] == '1':
							graph[key].append((yi, xi))

		result = 0
		while graph:
			self.eliminateIslands(graph, next(iter(graph)))
			result += 1
		return result

class Solution2: # grid solution
	def eliminateIslands(self, grid, y, x, yLen, xLen):
		struct = deque([(y, x)])
		while struct:
			y, x = struct.pop() # dfs - bfs
			if grid[y][x] == '1':
				grid[y][x] = '0'
				for yi, xi in (y + 1, x), (y, x + 1), (y - 1, x), (y, x - 1):
					if 0 <= yi < yLen and 0 <= xi < xLen and grid[yi][xi] == '1':
						struct.append((yi, xi))

	def numIslands(self, grid):
		yLen = len(grid)
		xLen = len(grid[0])

		result = 0
		for y in range(yLen):
			for x in range(xLen):
				if grid[y][x] == '1':
					self.eliminateIslands(grid, y, x, yLen, xLen)
					result += 1
		return result

class Solution3: # union-find solution _ not recommended
	def findParent(self, parent, y, x):
		if parent[y][x] == (-1, -1):
			return y, x
		return self.findParent(parent, *parent[y][x])

	def union(self, parent, y1, x1, y2, x2):
		y1, x1 = self.findParent(parent, y1, x1)
		y2, x2 = self.findParent(parent, y2, x2)
		if (y1, x1) == (y2, x2):
			return 0
		parent[y1][x1] = y2, x2
		return -1

	def numIslands(self, grid):
		yLen = len(grid)
		xLen = len(grid[0])

		result = 0
		parent = [[(-1, -1) for _ in range(xLen)] for _ in range(yLen)] # init 2-D list
		for y in range(yLen):
			for x in range(xLen):
				if grid[y][x] == '1':
					result += 1
					for yi, xi in (y + 1, x), (y, x + 1):
						if yi < yLen and xi < xLen and grid[yi][xi] == '1':
							result += self.union(parent, y, x, yi, xi)
		return result