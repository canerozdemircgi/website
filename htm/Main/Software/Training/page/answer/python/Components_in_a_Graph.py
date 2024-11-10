import os
from collections import defaultdict, deque
from math import inf

def numberOfComponents(graph, start):
	visiteds = set()
	struct = deque([start])
	while struct:
		current = struct.pop() # dfs - bfs
		visiteds.add(current)
		for child in graph[current]:
			if child not in visiteds:
				struct.append(child)
	return visiteds

def componentsInGraph(edges):
	graph = defaultdict(set)
	vertices = set()
	for vertex1, vertex2 in edges:
		graph[vertex1].add(vertex2)
		graph[vertex2].add(vertex1)
		vertices.add(vertex1)
		vertices.add(vertex2)

	result_min = inf
	result_max = -inf
	while vertices:
		vertex = vertices.pop()
		visiteds = numberOfComponents(graph, vertex)
		vertices -= visiteds
		len_visiteds = len(visiteds)
		result_min = min(result_min, len_visiteds)
		result_max = max(result_max, len_visiteds)
	return result_min, result_max

if __name__ == '__main__':
	gb = []
	for _ in range(int(input().strip())):
		gb.append(next(map(int, input().rstrip().split())))
	result = componentsInGraph(gb)

	fptr = open(os.environ['OUTPUT_PATH'], 'w')
	fptr.write(' '.join(map(str, result)))
	fptr.write('\n')
	fptr.close()