class Solution1:
	def encode(self, texts):
		eol = chr(0)
		return eol.join(texts)

	def decode(self, text):
		eol = chr(0)
		return text.split(eol)

class Solution2:
	def encode(self, texts):
		separator = ':'
		for text in texts:
			text.replace(separator, separator + separator)
		return separator.join(texts)

	def decode(self, text):
		if not text:
			return []

		result = ['']
		separator = ':'
		for i, char in enumerate(text):
			if char == separator:
				if text[i + 1] == separator:
					result[-1] += char
				else:
					result.append('')
			else:
				result[-1] += char
		return result