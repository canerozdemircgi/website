from functools import cache

class Solution1: # Top-Down Memoization
	def __init__(self):
		self.__words = None

	@cache
	def __wordBreakRec(self, text, pos):
		if not text:
			return True
		if pos == -1:
			return False

		if text[pos:] in self.__words:
			return self.__wordBreakRec(text[:pos], pos) or self.__wordBreakRec(text, pos - 1)
		else:
			return self.__wordBreakRec(text, pos - 1)

	def wordBreak(self, text, words):
		self.__words = frozenset(words)
		return self.__wordBreakRec(text, len(text) - 1)

class Solution2: # Top-Down Memoization _ Less Memory
	def __init__(self):
		self.__words = None

	@cache
	def __wordBreakRec(self, text, pos_sta, pos_end):
		if pos_end == 0:
			return True
		if pos_sta == -1:
			return False

		if text[pos_sta:pos_end] in self.__words:
			return self.__wordBreakRec(text, pos_sta - 1, pos_sta) or self.__wordBreakRec(text, pos_sta - 1, pos_end)
		else:
			return self.__wordBreakRec(text, pos_sta - 1, pos_end)

	def wordBreak(self, text, words):
		self.__words = frozenset(words)
		len_text = len(text)
		return self.__wordBreakRec(text, len_text - 1, len_text)

class Solution3: # Bottom-Up DP _ Backward
	def wordBreak(self, text, words):
		words = frozenset(words)
		results = [True]
		for i in range(1, len(text) + 1):
			results.append(any(results[j] and text[j:i] in words for j in range(i)))
			''' `text[j:i] in words` can be replaced to Trie '''
		return results[-1]

class Solution4: # Bottom-Up DP _ Backward _ Optimized
	def wordBreak(self, text, words):
		words, len_max_words = frozenset(words), len(max(words, key=len))
		results = [True]
		for i in range(1, len(text) + 1):
			results.append(any(results[j] and text[j:i] in words for j in range(max(0, i - len_max_words), i)))
			''' `text[j:i] in words` can be replaced to Trie '''
		return results[-1]

class Solution5: # Bottom-Up DP _ Forward
	def wordBreak(self, text, words):
		words = frozenset(words)
		len_text = len(text)

		results = [False] * (len_text + 1)
		results[0] = True
		for i in range(len_text):
			if results[i]:
				for j in range(i + 1, len_text + 1):
					if text[i: j] in words: # `text[i: j] in words` can be replaced to Trie
						results[j] = True
		return results[-1]

class Solution6: # Bottom-Up DP _ Forward _ Optimized
	def wordBreak(self, text, words):
		words, len_max_words = frozenset(words), len(max(words, key=len))
		len_text = len(text)

		results = [False] * (len_text + 1)
		results[0] = True
		for i in range(len_text):
			if results[i]:
				for j in range(i + 1, min(i + len_max_words + 1, len_text + 1)):
					if text[i: j] in words: # `text[i: j] in words` can be replaced to Trie
						results[j] = True
		return results[-1]