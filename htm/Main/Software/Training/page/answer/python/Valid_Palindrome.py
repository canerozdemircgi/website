import re

class Solution1:
	def isPalindrome(self, text):
		text = re.sub('[^0-9a-zA-Z]', '', text).lower()
		return text == ''.join(reversed(text))

class Solution2:
	def isPalindrome(self, text):
		text = re.sub('[^0-9a-zA-Z]', '', text).lower()
		return text == text[::-1]