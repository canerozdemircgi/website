from collections import defaultdict

class Solution1:
	def characterReplacement(self, text, amount):
		result = 0
		count = defaultdict(int)
		left = 0
		for right in range(len(text)):
			count[text[right]] += 1
			maxcur = max(count.values())
			if (right - left + 1 - maxcur) > amount:
				count[text[left]] -= 1
				left += 1
			result = max(result, right - left + 1)
		return result