class Solution1: # applicable for different edit counts
	def isOneEditDistance(self, word1, word2):
		if word1 == word2:
			return False
		len_word1, len_word2 = len(word1), len(word2)
		len_diff = abs(len_word1 - len_word2)
		if len_diff > 1:
			return False

		edits = 0
		if len_diff == 1:
			i1 = i2 = 0
			while i1 < len_word1 and i2 < len_word2:
				if word1[i1] != word2[i2]:
					edits += 1
					if edits > 1:
						return False
					if len_word1 > len_word2:
						i1 += 1
					else:
						i2 += 1
				else:
					i1 += 1
					i2 += 1
		else:
			for char1, char2 in zip(word1, word2):
				if char1 != char2:
					edits += 1
					if edits > 1:
						return False
		return True

class Solution2:
	def isOneEditDistance(self, word1, word2):
		if word1 == word2:
			return False
		len_word1, len_word2 = len(word1), len(word2)
		if abs(len_word1 - len_word2) > 1:
			return False

		i1 = i2 = 0
		while i1 < len_word1 and i2 < len_word2:
			if word1[i1] != word2[i2]:
				if len_word1 > len_word2:
					return word1[i1 + 1:] == word2[i2:]
				elif len_word1 < len_word2:
					return word1[i1:] == word2[i2 + 1:]
				else:
					return word1[i1 + 1:] == word2[i2 + 1:]
			i1 += 1
			i2 += 1
		return True