from collections import deque

class Solution1:
	def isValid(self, text):
		struct = deque()
		for char in text:
			if char in ('(', '{', '['):
				struct.append(char)
			elif char == ')':
				if len(struct) == 0 or struct.pop() != '(':
					return False
			elif char == '}':
				if len(struct) == 0 or struct.pop() != '{':
					return False
			elif char == ']':
				if len(struct) == 0 or struct.pop() != '[':
					return False
		return len(struct) == 0

class Solution2:
	def isValid(self, text):
		char_counterparts =
		{
			')': '(',
			'}': '{',
			']': '['
		}
		char_parts = frozenset(char_counterparts.values())
		struct = deque()
		for char in text:
			if char in char_parts:
				struct.append(char)
			elif char in char_counterparts:
				if len(struct) == 0 or struct.pop() != char_counterparts[char]:
					return False
		return len(struct) == 0