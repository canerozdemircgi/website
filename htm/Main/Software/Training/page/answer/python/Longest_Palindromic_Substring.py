class Solution1:
	def isPalindrome(self, text):
		return text == text[::-1]

	def longestPalindrome(self, text):
		len_text = len(text)
		if len_text == 1:
			return text

		len_chunk = len_text
		while len_chunk >= 1:
			left, right = 0, len_chunk
			while right <= len_text:
				chunk = text[left: right]
				if self.isPalindrome(chunk):
					return chunk
				left += 1
				right += 1
			len_chunk -= 1

class Solution2:
	def getExpandingPalindrome(self, text, left, right):
		while left >= 0 and right < len(text) and text[left] == text[right]:
			left -= 1
			right += 1
		return text[left + 1:right]

	def longestPalindrome(self, text):
		result = ''
		for i in range(len(text)):
			result_chunk = self.getExpandingPalindrome(text, i, i)
			result = max(result, result_chunk, key=lambda x: len(x))

			result_chunk = self.getExpandingPalindrome(text, i, i + 1)
			result = max(result, result_chunk, key=lambda x: len(x))
		return result