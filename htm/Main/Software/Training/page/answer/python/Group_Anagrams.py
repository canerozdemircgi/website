from collections import defaultdict, Counter

class Solution1:
	def groupAnagrams(self, texts):
		result = defaultdict(list)
		for text in texts:
			# key = ''.join(sorted(text))
			key = frozenset(Counter(text).items())
			result[key].append(text)
		return result.values()