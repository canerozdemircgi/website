from collections import defaultdict

class Solution1:
	def lengthOfLongestSubstring(self, text):
		result = 0
		count = defaultdict(int)
		left = 0
		for right in range(len(text)):
			count[text[right]] += 1
			while count[text[right]] == 2:
				count[text[left]] -= 1
				left += 1
			result = max(result, right - left + 1)
		return result

class Solution2:
	def lengthOfLongestSubstring(self, text):
		result = 0
		seq = ''
		for i in range(len(text)):
			seq += text[i]
			result_chunk = len(frozenset(seq))
			if result_chunk != len(seq):
				seq = seq[seq.find(text[i]) + 1:]
			result = max(result, result_chunk)
		return result

class Solution3:
	'''
	def updateIndexesByMin(self, indexes, min_value):
		key_deleteds = []
		for key in indexes:
			if indexes[key] < min_value:
				key_deleteds.append(key)
		for i in key_deleteds:
			del indexes[i]
	'''

	def lengthOfLongestSubstring(self, text):
		result = 0
		indexes = {}
		left = 0
		for right in range(len(text)):
			if text[right] in indexes:
				# left = indexes[text[right]] + 1
				# self.updateIndexesByMin(indexes, left)
				left = max(left, indexes[text[right]] + 1)
			indexes[text[right]] = right
			result = max(result, right - left + 1)
		return result