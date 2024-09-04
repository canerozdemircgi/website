digits_map =
{
	2: ['a', 'b', 'c'],
	3: ['d', 'e', 'f'],
	4: ['g', 'h', 'i'],
	5: ['j', 'k', 'l'],
	6: ['m', 'n', 'o'],
	7: ['p', 'q', 'r', 's'],
	8: ['t', 'u', 'v'],
	9: ['w', 'x', 'y', 'z']
}

class Solution1:
	def letterCombinations(self, digits):
		if not digits:
			return []

		results = []
		self.letterCombinationsRecursive(digits, results)
		return results

	def letterCombinationsRecursive(self, digits, results, result='', level=0):
		if level == len(digits):
			results.append(result)
		else:
			for character in digits_map[int(digits[level])]:
				self.letterCombinationsRecursive(digits, results, result + character, level + 1)