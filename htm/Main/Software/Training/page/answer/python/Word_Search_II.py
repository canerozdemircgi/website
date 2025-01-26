from collections import deque

class Solution1:
	def findWord(self, graph, word):
		len_word = len(word)
		struct = deque()
		for key in graph:
			struct.append((key, 0, set()))
		while struct:
			current, index, path = struct.pop()
			current_char = current.split('_')[0]
			if current_char == word[index]:
				if index == len_word - 1:
					return True
				path_new = path | {current}
				index += 1
				for child in graph[current]:
					if child not in path:
						struct.append((child, index, path_new))
		return False

	def findWords(self, board, words):
		yMax = len(board)
		xMax = len(board[0])
		identifier = 0
		graph = {}
		graphD = set() # for first pass
		for y in range(yMax):
			for x in range(xMax):
				if not board[y][x] in graphD:
					graphD.add(board[y][x]) # for first pass
				board[y][x] += '_' + str(identifier)
				graph[board[y][x]] = set()
				identifier += 1
		for y in range(yMax):
			for x in range(xMax):
				for i in (-1, 1):
					if 0 <= x + i < xMax:
						graph[board[y][x]].add(board[y][x + i])
					if 0 <= y + i < yMax:
						graph[board[y][x]].add(board[y + i][x])
		result = []
		for word in words:
			pass_first = True
			for char in frozenset(word):
				if char not in graphD:
					pass_first = False
					break
			if pass_first and self.findWord(graph, word):
				result.append(word)
		return result