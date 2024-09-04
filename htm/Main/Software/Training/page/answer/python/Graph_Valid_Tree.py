from collections import defaultdict, deque

class Solution1:
	def isCircleUnDirected(self, graph, start):
		struct = deque([(None, start)])
		path = set()
		while struct:
			parent, current = struct.pop()
			if current in path:
				return True
			path.add(current)
			for child in graph[current]:
				if child != parent:
					struct.append((current, child))
			del graph[current]
		return False

	def validTree(self, n, edges):
		if not edges:
			return n == 1

		graph = defaultdict(set)
		for value1, value2 in edges:
			graph[value1].add(value2)
			graph[value2].add(value1)

		if n != len(graph):
			return False

		while graph:
			if self.isCircleUnDirected(graph, next(iter(graph))):
				return False
		return True

class Solution2:
	def isCircleUnDirected(self, graph, start, cache):
		struct = deque([(None, start)])
		path = set()
		while struct:
			parent, current = struct.popleft()
			if current in cache:
				return False
			if current in path:
				return True
			path.add(current)
			for child in graph[current]:
				if child != parent:
					struct.append((current, child))
		cache.update(path)
		return False

	def validTree(self, n, edges):
		if not edges:
			return n == 1

		graph = defaultdict(set)
		for value1, value2 in edges:
			graph[value1].add(value2)
			graph[value2].add(value1)

		if n != len(graph):
			return False

		cache = set()
		for key in list(graph.keys()):
			if self.isCircleUnDirected(graph, key, cache):
				return False
		return True

class Solution3:
	def findParent(self, graph_degrees, current):
		if graph_degrees[current] == -1:
			return current
		return self.findParent(graph_degrees, graph_degrees[current])

	def isCircleUnDirected(self, graph, graph_degrees): # union-find
		for value1 in graph:
			parent1 = self.findParent(graph_degrees, value1)
			for value2 in graph[value1]:
				parent2 = self.findParent(graph_degrees, value2)
				if parent1 == parent2:
					return True
				graph_degrees[parent2] = parent1 # union
		return False

	def validTree(self, n, edges):
		if not edges:
			return n == 1

		graph = defaultdict(set)
		for value1, value2 in edges:
			# graph[value2].add(value1)
			graph[value1].add(value2)

		if n != len(set.union(*graph.values(), graph.keys())):
			return False

		graph_degrees = defaultdict(lambda: -1)
		return not self.isCircleUnDirected(graph, graph_degrees)