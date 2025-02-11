from collections import deque, defaultdict

class WordDictionary:
	def __init__(self):
		self.words = {}
		self.eol = chr(0)

	def addWord(self, word):
		words = self.words
		for i in range(len(word)):
			if not word[i] in words:
				words[word[i]] = {}
			words = words[word[i]]
		words[self.eol] = {}

	def search(self, word):
		struct = deque([(self.words, 0)])
		while struct:
			words, index = struct.popleft()
			flag_pass = True
			for i in range(index, len(word)):
				if word[i] == '.':
					for key in words:
						struct.append((words[key], i + 1))
					flag_pass = False
					break
				if not word[i] in words:
					flag_pass = False
					break
				words = words[word[i]]
			if flag_pass and self.eol in words:
				return True
		return False

class WordDictionary2:
	class _TrieNode:
		def __init__(self):
			self.neighbors, self.is_end = defaultdict(WordDictionary._TrieNode), False

	def __init__(self):
		self.root = self._TrieNode()

	def addWord(self, word):
		current = self.root
		for char in word:
			current = current.neighbors[char]
		current.is_end = True

	def search(self, word, current=None):
		if current is None:
			current = self.root
		for i in range(len(word)):
			if word[i] == '.':
				return any(self.search(word[i + 1:], current.neighbors[key]) for key in current.neighbors)
			else:
				if word[i] not in current.neighbors:
					return False
			current = current.neighbors[word[i]]
		return current.is_end