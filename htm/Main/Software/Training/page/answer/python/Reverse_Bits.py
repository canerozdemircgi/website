class Solution1:
	def reverseBits(self, number):
		result = 0
		for i in range(32):
			result = (result << 1) + (number & 1)
			number >>= 1
		return result