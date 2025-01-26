from collections import defaultdict, deque

class Solution1:
	def isCircleDirected(self, graph, start):
		struct = deque([(start, set())])
		while struct:
			current, path = struct.pop()
			if current in path:
				return True
			for child in graph[current]:
				struct.append((child, path | {current}))
			del graph[current]
		return False

	def canFinish(self, _, prerequisites):
		graph = defaultdict(set)
		for course, req in prerequisites:
			graph[course].add(req)

		while graph:
			if self.isCircleDirected(graph, next(iter(graph))):
				return False
		return True

class Solution2:
	def isCircleDirected(self, graph, start, cache):
		struct = deque([(start, set())])
		cache_tmp = []
		while struct:
			current, path = struct.popleft()
			if current in cache:
				continue
			cache_tmp.append(current)
			if current in path:
				return True
			for child in graph[current]:
				struct.append((child, path | {current}))
		cache.update(cache_tmp)
		return False

	def canFinish(self, _, prerequisites):
		graph = defaultdict(set)
		for course, req in prerequisites:
			graph[course].add(req)

		cache = set()
		for key in list(graph.keys()):
			if self.isCircleDirected(graph, key, cache):
				return False
		return True

class Solution3:
	def isCircleDirected(self, graph, graph_degrees): # topological sorting
		zero_keys = deque([course for course in graph_degrees if graph_degrees[course] == 0])
		result = []
		while zero_keys:
			key = zero_keys.popleft() # dfs - bfs
			result.append(key)
			for course in graph[key]:
				graph_degrees[course] -= 1
				if graph_degrees[course] == 0:
					zero_keys.append(course)
		return len(result) == len(graph_degrees)

	def canFinish(self, _, prerequisites):
		graph = defaultdict(set)
		graph_degrees = defaultdict(int)
		for course, req in prerequisites:
			graph[course].add(req)
			graph_degrees[course] = graph_degrees[course]
			graph_degrees[req] += 1
		return self.isCircleDirected(graph, graph_degrees)