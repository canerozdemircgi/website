from collections import deque

class Solution1: # matrix
	def exist(self, board, word):
		size_y = len(board)
		size_x = len(board[0])
		size_word = len(word)
		board_set = set()
		struct = deque()
		index = 0
		for y in range(size_y):
			for x in range(size_x):
				board_set.add(board[y][x]) # first pass
				if board[y][x] == word[index]:
					struct.append((y, x, index + 1, {(y, x)}))
		for char in word: # first pass
			if char not in board_set:
				return False
		while struct:
			y, x, index, path = struct.pop()
			if index == size_word:
				return True
			for i in (-1, 1):
				if 0 <= y + i < size_y and (y + i, x) not in path and word[index] == board[y + i][x]:
					struct.append((y + i, x, index + 1, path | {(y + i, x)}))
				if 0 <= x + i < size_x and (y, x + i) not in path and word[index] == board[y][x + i]:
					struct.append((y, x + i, index + 1, path | {(y, x + i)}))
		return False