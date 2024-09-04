from collections import deque

class Solution1:
	def decodeString(self, text):
		result = ''
		struct_count = deque()
		struct_chunk = deque()
		i = 0
		while i < len(text):
			if text[i].isnumeric():
				number = text[i]
				while text[i + 1].isnumeric():
					number += text[i + 1]
					i += 1
				struct_count.append(int(number))
			elif text[i] == '[':
				struct_chunk.append(result)
				result = ''
			elif text[i] == ']':
				count = struct_count.pop()
				chunk = struct_chunk.pop()
				for _ in range(count):
					chunk += result
				result = chunk
			else:
				result += text[i]
			i += 1
		return result

class Solution2:
	def decodeString(self, text):
		struct = deque()
		i = 0
		while i < len(text):
			if text[i] == '[':
				cStart = cEnd = i - 1
				if text[i - 2].isnumeric():
					cStart = i - 2
					if text[i - 3].isnumeric():
						cStart = i - 3
				struct.append((int(text[cStart: cEnd + 1]), i + 1))
			elif text[i] == ']':
				count, iStart = struct.pop()
				text_pre = text[:iStart - 1 - len(str(count))]
				text_cur = text[iStart: i]
				text_post = text[i + 1:]
				text = text_pre + (count * text_cur) + text_post
				i += (len(text_cur) * (count - 1)) - 2 - len(str(count)) # 2 for [ and ]
			i += 1
		return text