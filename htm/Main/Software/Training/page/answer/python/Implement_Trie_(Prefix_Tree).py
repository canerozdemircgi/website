class Trie:
	def __init__(self):
		self.trie = {}
		self.eol = chr(0)

	def insert(self, word):
		if word == '':
			return
		trie = self.trie
		i = 0
		while i < len(word):
			if not word[i] in trie:
				trie[word[i]] = {}
			trie = trie[word[i]]
			i += 1
		trie[self.eol] = True

	def search(self, word):
		if word == '':
			return False
		trie = self.trie
		i = 0
		while i < len(word):
			if word[i] in trie:
				trie = trie[word[i]]
			else:
				return False
			i += 1
		return self.eol in trie

	def startsWith(self, word):
		if word == '':
			return False
		trie = self.trie
		i = 0
		while i < len(word):
			if word[i] in trie:
				trie = trie[word[i]]
			else:
				return False
			i += 1
		return True