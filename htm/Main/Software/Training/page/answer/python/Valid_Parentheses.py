from collections import deque

class Solution1:
	def isValid(self, text):
		parentheses_dict = {
			'(': ')',
			'[': ']',
			'{': '}'
		}

		stack = deque()
		for char in text:
			if char in parentheses_dict:
				stack.append(parentheses_dict[char])
			else:
				if len(stack) == 0 or stack.pop() != char:
					return False
		return len(stack) == 0

class Solution2:
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