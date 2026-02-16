class Solution1:
	def fullJustify(self, words, width_max):
		if not words:
			return ""

		lines = [[words[0]]]
		for i in range(1, len(words)):
			word = words[i]
			if len("".join(lines[-1])) + 1 + len(word) <= width_max:
				lines[-1].extend([" ", word])
			else:
				lines.append([word])

		for i in range(len(lines) - 1):
			line_len = len(lines[i])

			if line_len == 1:
				lines[i][0] = lines[i][0].ljust(width_max, " ")
				continue

			line_len_diff = width_max - len("".join(lines[i]))
			line_space_index = 1
			while line_len_diff > 0:
				lines[i][line_space_index] += " "
				line_space_index += 2
				if line_space_index >= line_len:
					line_space_index = 1
				line_len_diff -= 1
		lines[-1][-1] = lines[-1][-1].ljust(width_max + len(lines[-1][-1]) - len("".join(lines[-1])), " ")

		return ["".join(line) for line in lines]

class Solution2:
	def fullJustify(self, words, width_max):
		results = [words[0]]

		for i in range(1, len(words)):
			if len(results[-1]) + 1 + len(words[i]) <= width_max: # +1 for space
				results[-1] += ' ' + words[i]
			else:
				results.append(words[i])

		for i in range(len(results)):
			len_result = len(results[i])
			if len_result != width_max:
				if ' ' in results[i] and i != len(results) - 1:
					result_chunks = results[i].split(' ')
					len_result_chunk = sum(len(result_chunk) for result_chunk in result_chunks)
					len_diff = width_max - len_result_chunk
					j = 0
					while len_diff > 0:
						result_chunks[j] += ' '
						j = (j + 1) % (len(result_chunks) - 1)
						len_diff -= 1
					results[i] = ''.join(result_chunks)
				else: # last line and lines which doesnt have spaces
					results[i] += ' ' * (width_max - len_result)

		return results