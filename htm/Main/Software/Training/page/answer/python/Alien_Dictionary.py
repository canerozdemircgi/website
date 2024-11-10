from collections import defaultdict, deque

class Solution1: # topological sorting
	def alienOrder(self, words):
		graph_connections = defaultdict(set)
		graph_degrees = defaultdict(int)
		chars = set(words[0])
		for word1, word2 in zip(words, words[1:]):
			chars.update(word2)
			for char1, char2 in zip(word1, word2):
				if char1 != char2:
					if char2 not in graph_connections[char1]:
						graph_connections[char1].add(char2)
						graph_degrees[char1] = graph_degrees[char1]
						graph_degrees[char2] += 1
					break
			else:
				if len(word1) > len(word2):
					return ''

		zero_keys = deque([char for char in graph_degrees if graph_degrees[char] == 0])
		result = []
		while zero_keys:
			key = zero_keys.popleft() # dfs - bfs
			result.append(key)
			for char in graph_connections[key]:
				graph_degrees[char] -= 1
				if graph_degrees[char] == 0:
					zero_keys.append(char)

		if len(result) < len(graph_degrees):
			return ''

		if len(result) != len(chars):
			chars_missing = chars - graph_degrees.keys()
			for char_missing in chars_missing:
				for i, char in enumerate(result): # bisect could be used
					if char_missing < char:
						index = i
						break
				else:
					index = len(result)
				result.insert(index, char_missing)

		return ''.join(result)