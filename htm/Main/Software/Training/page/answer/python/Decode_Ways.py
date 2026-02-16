from functools import cache

# `1 <= xxx <= 9` can be changed to `xxx != 0`

'''
Top-Down Memoizations could be implemented slightly different as below
def numDecodings(self, text, i = 0):
in order to avoid text[:] copy memory overhead
'''

'''
Bottom-Up DPs could be terminated early by
if results[i] == 0:
	return 0
'''

class Solution1: # Top-Down Memoization _ 1
	@cache
	def numDecodings(self, text):
		if not text:
			return 1
		if text[0] == '0':
			return 0

		len_text = len(text)
		if len_text >= 2:
			if 1 <= int(text[:2]) <= 26:
				return self.numDecodings(text[1:]) + self.numDecodings(text[2:])
			else:
				return self.numDecodings(text[1:])
		if len_text == 1:
			return 1

class Solution2: # Top-Down Memoization _ 2
	@cache
	def numDecodings(self, text):
		len_text = len(text)
		if len_text == 0:
			return 1
		if len_text == 1:
			return 1 if 1 <= int(text) <= 9 else 0

		result = 0
		if 1 <= int(text[0]) <= 9:
			result += self.numDecodings(text[1:])
			if 10 <= int(text[:2]) <= 26:
				result += self.numDecodings(text[2:])
		return result

class Solution3: # Bottom-Up DP
	def numDecodings(self, text):
		if text[0] == '0':
			return 0

		len_text = len(text)
		results = [0] * (len_text + 1)
		results[0] = results[1] = 1

		for i in range(2, len_text + 1):
			if 1 <= int(text[i - 1]) <= 9:
				results[i] += results[i - 1]
			if 10 <= int(text[i - 2:i]) <= 26:
				results[i] += results[i - 2]
		return results[-1]

class Solution4: # Bottom-Up DP _ Less Memory
	def numDecodings(self, text):
		if text[0] == '0':
			return 0

		len_text = len(text)
		results = [1, 1]

		for i in range(2, len_text + 1):
			result = 0
			if 1 <= int(text[i - 1]) <= 9:
				result += results[(i - 1) % 2]
			if 10 <= int(text[i - 2:i]) <= 26:
				result += results[(i - 2) % 2]
			results[i % 2] = result
		return results[len_text % 2]

class Solution5: # Bottom-Up DP _ Less Memory
	def numDecodings(self, text):
		if text[0] == '0':
			return 0

		result = result_prev1 = result_prev2 = 1

		for i in range(2, len(text) + 1):
			result = 0
			if 1 <= int(text[i - 1]) <= 9:
				result += result_prev1
			if 10 <= int(text[i - 2:i]) <= 26:
				result += result_prev2
			result_prev1, result_prev2 = result, result_prev1
		return result

class Solution6: # Bottom-Up DP _ Less Memory
	def numDecodings(self, text):
		if text[0] == '0':
			return 0

		result = result_prev1 = 1

		for i in range(2, len(text) + 1):
			result, result_prev1 = [0, result][1 <= int(text[i - 1]) <= 9] + [0, result_prev1][10 <= int(text[i - 2:i]) <= 26], result
		return result