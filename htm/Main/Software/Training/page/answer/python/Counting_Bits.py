class Solution1:
	def countBits(self, number):
		# bin(5) = '0b101'
		return [bin(value).count('1') for value in range(number + 1)]

class Solution2: # Bottom-Up DP
	def countBits(self, number):
		result = [0]
		for i in range(1, number + 1):
			# result.append(result[i // 2] + i % 2)
			result.append(result[i >> 1] + i % 2)
		return result