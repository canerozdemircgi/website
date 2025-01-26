from collections import defaultdict

class Solution:
	class _TrieNode:
		def __init__(self):
			self.neighbors, self.is_end = defaultdict(Solution._TrieNode), False

	def __init__(self):
		self.__root = self._TrieNode()

	def add_word(self, word):
		current = self.__root
		for char in word:
			current = current.neighbors[char]
		current.is_end = True

	def search_word(self, word):
		current = self.__root
		for char in word:
			if char not in current.neighbors:
				return False
			current = current.neighbors[char]
		return current.is_end