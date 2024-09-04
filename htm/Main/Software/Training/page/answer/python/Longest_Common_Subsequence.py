from collections import defaultdict, deque
from functools import cache

import Sort_Patience

# Path Tracing results may have more than one variation

class Solution1: # Top-Down Memoization
	@cache
	def longestCommonSubsequence(self, text1, text2):
		if not text1 or not text2:
			return 0
		if text1[-1] == text2[-1]:
			return 1 + self.longestCommonSubsequence(text1[:-1], text2[:-1])
		return max(self.longestCommonSubsequence(text1[:-1], text2), self.longestCommonSubsequence(text1, text2[:-1]))

class Solution2: # Top-Down Memoization _ Less Memory
	@cache
	def __longestCommonSubsequenceRec(self, text1, text2, pos1, pos2):
		if -1 in (pos1, pos2):
			return 0
		if text1[pos1] == text2[pos2]:
			return 1 + self.__longestCommonSubsequenceRec(text1, text2, pos1 - 1, pos2 - 1)
		return max(self.__longestCommonSubsequenceRec(text1, text2, pos1 - 1, pos2), self.__longestCommonSubsequenceRec(text1, text2, pos1, pos2 - 1))

	def longestCommonSubsequence(self, text1, text2):
		return self.__longestCommonSubsequenceRec(text1, text2, len(text1) - 1, len(text2) - 1)

class Solution3: # Top-Down Memoization _ Less Memory | Path Tracing
	@cache
	def __pathCommonSubsequenceRec(self, text1, text2, pos1, pos2):
		if -1 in (pos1, pos2):
			return 0, ''
		if text1[pos1] == text2[pos2]:
			count, path = self.__pathCommonSubsequenceRec(text1, text2, pos1 - 1, pos2 - 1)
			return 1 + count, path + text1[pos1]
		count1, path1 = self.__pathCommonSubsequenceRec(text1, text2, pos1 - 1, pos2)
		count2, path2 = self.__pathCommonSubsequenceRec(text1, text2, pos1, pos2 - 1)
		return (count1, path1) if count1 > count2 else (count2, path2)

	def pathCommonSubsequence(self, text1, text2):
		return self.__pathCommonSubsequenceRec(text1, text2, len(text1) - 1, len(text2) - 1)

class Solution4: # Bottom-Up DP
	def longestCommonSubsequence(self, text1, text2):
		len_text1, len_text2 = len(text1), len(text2)
		results = [[0] * (len_text2 + 1) for _ in range(len_text1 + 1)]
		for i in range(1, len_text1 + 1):
			for j in range(1, len_text2 + 1):
				if text1[i - 1] == text2[j - 1]:
					results[i][j] = results[i - 1][j - 1] + 1
				else:
					results[i][j] = max(results[i - 1][j], results[i][j - 1])
		return results[-1][-1]

class Solution5: # Bottom-Up DP | Path Tracing
	def pathCommonSubsequence(self, text1, text2):
		len_text1, len_text2 = len(text1), len(text2)
		results = [[0] * (len_text2 + 1) for _ in range(len_text1 + 1)]
		for i in range(1, len_text1 + 1):
			for j in range(1, len_text2 + 1):
				if text1[i - 1] == text2[j - 1]:
					results[i][j] = results[i - 1][j - 1] + 1
				else:
					results[i][j] = max(results[i - 1][j], results[i][j - 1])

		i, j = len_text1, len_text2
		path = deque()
		while i > 0 and j > 0:
			if text1[i - 1] == text2[j - 1]:
				path.appendleft(text1[i - 1])
				i -= 1
				j -= 1
			elif results[i - 1][j] > results[i][j - 1]:
				i -= 1
			else:
				j -= 1
		return ''.join(path)

class Solution6: # Bottom-Up DP _ Less Memory
	def longestCommonSubsequence(self, text1, text2):
		len_text1, len_text2 = len(text1), len(text2)
		if len_text1 < len_text2:
			text1, text2, len_text1, len_text2 = text2, text1, len_text2, len_text1 # Reduce Memory Even More
		results = [[0] * (len_text2 + 1) for _ in range(2)]
		for i in range(1, len_text1 + 1):
			for j in range(1, len_text2 + 1):
				if text1[i - 1] == text2[j - 1]:
					results[i % 2][j] = results[(i - 1) % 2][j - 1] + 1
				else:
					results[i % 2][j] = max(results[(i - 1) % 2][j], results[i % 2][j - 1])
		return results[len_text1 % 2][-1]

class Solution7: # Bottom-Up DP _ Less Memory
	def longestCommonSubsequence(self, text1, text2):
		len_text1, len_text2 = len(text1), len(text2)
		if len_text1 < len_text2:
			text1, text2, len_text1, len_text2 = text2, text1, len_text2, len_text1 # Reduce Memory Even More
		results = [0] * (len_text2 + 1) # prev_col
		for i in range(1, len_text1 + 1):
			prev_rowcol = 0
			for j in range(1, len_text2 + 1):
				prev_row = results[j]
				if text1[i - 1] == text2[j - 1]:
					results[j] = prev_rowcol + 1
				else:
					results[j] = max(prev_row, results[j - 1])
				prev_rowcol = prev_row
		return results[-1]

class Solution8(Sort_Patience.Solution): # Patience Sorting
	def longestCommonSubsequence(self, text1, text2):
		indexes_text1 = defaultdict(deque)
		for i, char in enumerate(text1):
			# not using append in order to avoid increasing common subsequence of same char
			indexes_text1[char].appendleft(i)

		indexes_common = []
		for char in text2:
			indexes_common.extend(indexes_text1[char])
		return len(self._createPiles(indexes_common))

class Solution9(Sort_Patience.SolutionPath): # Patience Sorting | Path Tracing
	def pathCommonSubsequence(self, text1, text2):
		indexes_text1 = defaultdict(deque)
		for i, char in enumerate(text1):
			# not using append in order to avoid increasing common subsequence of same char
			indexes_text1[char].appendleft(i)

		indexes_common = []
		for char in text2:
			indexes_common.extend(indexes_text1[char])
		return self._createPaths(indexes_common)