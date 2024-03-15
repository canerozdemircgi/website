from collections import deque

'''
@cache
def decode(self, value):
	return value // self.xSize, value % self.xSize

@cache
def encode(self, y, x):
	return y * self.xSize + x
'''

class Solution1:
	def __init__(self):
		self.graph = {}
		self.ySize = 0
		self.xSize = 0

	def getWays(self, source):
		visiteds = set()
		struct = deque(source)
		while struct:
			current = struct.pop()
			visiteds.add(current)
			for child in self.graph[current]:
				if child not in visiteds:
					struct.append(child)
		return visiteds

	def pacificAtlantic(self, heights):
		self.ySize = len(heights)
		self.xSize = len(heights[0])
		source_pacifics = []
		source_anlantics = []
		for y in range(self.ySize):
			for x in range(self.xSize):
				if y == 0 or x == 0:
					source_pacifics.append((y, x))
				if y == self.ySize - 1 or x == self.xSize - 1:
					source_anlantics.append((y, x))
				self.graph[(y, x)] = []
				for i in (-1, 1):
					if self.xSize > x + i >= 0:
						if heights[y][x + i] >= heights[y][x]:
							self.graph[(y, x)] += [(y, x + i)]
					if self.ySize > y + i >= 0:
						if heights[y + i][x] >= heights[y][x]:
							self.graph[(y, x)] += [(y + i, x)]
		ways_pacifics = self.getWays(source_pacifics)
		ways_anlantics = self.getWays(source_anlantics)
		ways_both = ways_pacifics.intersection(ways_anlantics)
		return ways_both