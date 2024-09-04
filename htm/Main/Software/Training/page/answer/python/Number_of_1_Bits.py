class Solution1:
	def hammingWeight(self, number):
		return bin(number).count('1')

class Solution2:
	def hammingWeight(self, number):
		result = 0
		while number:
			number &= number - 1
			result += 1
		return result