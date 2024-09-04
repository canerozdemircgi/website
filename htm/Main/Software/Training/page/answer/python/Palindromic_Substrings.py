class Solution1:
	def isPalindrome(self, text):
		return text == text[::-1]

	def countSubstrings(self, text):
		len_text = len(text)

		result = 0
		len_chunk = len_text
		while len_chunk >= 2:
			left, right = 0, len_chunk
			while right <= len_text:
				chunk = text[left: right]
				if self.isPalindrome(chunk):
					result += 1
				left += 1
				right += 1
			len_chunk -= 1
		return result + len_text

class Solution2:
	def isPalindrome(self, text):
		return text == text[::-1]

	def countSubstrings(self, text):
		len_text = len(text)
		result = 0
		for i in range(len_text):
			for j in range(2, len_text - i + 1):
				if self.isPalindrome(text[i: i + j]):
					result += 1
		return result + len_text

class Solution3:
	def getExpandingPalindrome(self, text, left, right):
		len_text = len(text)
		result = 0
		while left >= 0 and right < len_text and text[left] == text[right]:
			result += 1
			left -= 1
			right += 1
		return result

	def countSubstrings(self, text):
		len_text = len(text)
		result = 0
		'''
		for i in range(len_text):
			result += self.getExpandingPalindrome(text, i, i)
			result += self.getExpandingPalindrome(text, i, i + 1)
		return result
		'''
		for i in range(len_text):
			result += self.getExpandingPalindrome(text, i, i + 1)
			result += self.getExpandingPalindrome(text, i, i + 2)
		return result + len_text