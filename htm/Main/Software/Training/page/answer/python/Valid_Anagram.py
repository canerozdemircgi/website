from collections import Counter

class Solution1:
	def isAnagram(self, s, t):
		return Counter(s) == Counter(t)