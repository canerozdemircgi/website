from collections import Counter, defaultdict
from math import inf

class Solution1:
	def compare_dicts(self, base_dict, text_dict):
		for key in base_dict:
			if key in text_dict:
				if base_dict[key] > text_dict[key]:
					return False
			else:
				return False
		return True

	def minWindow(self, text, base):
		base_dict = Counter(base)
		text_dict = defaultdict(int)

		result = ''
		# len_result = inf can be used to eliminate else block on min method below
		left = 0
		for right in range(len(text)):
			text_dict[text[right]] += 1
			while self.compare_dicts(base_dict, text_dict):
				result_chunk = text[left: right + 1]
				result = min(result, result_chunk, key=lambda x: len(x) if x != '' else inf)
				text_dict[text[left]] -= 1
				left += 1
		return result

class Solution2: # Optimizing compare dicts
	def minWindow(self, text, base):
		base_dict = Counter(base)
		text_dict = defaultdict(int)
		required, formed = len(base_dict), 0

		result = ''
		# len_result = inf can be used to eliminate else block on min method below
		left = 0
		for right in range(len(text)):
			text_dict[text[right]] += 1
			if text[right] not in base_dict:
				continue
			if base_dict[text[right]] == text_dict[text[right]]:
				formed += 1
			while formed == required:
				result_chunk = text[left: right + 1]
				result = min(result, result_chunk, key=lambda x: len(x) if x != '' else inf)
				text_dict[text[left]] -= 1
				if text[left] in base_dict and base_dict[text[left]] > text_dict[text[left]]:
					formed -= 1
				left += 1
		return result

# We can also optimize more by looping a tuple of filtered text (by base) and its indices instead of whole text and recreating the text by this indices