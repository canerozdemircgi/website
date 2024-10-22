class Solution:
	def interpLinear(self, min_old, max_old, min_new, max_new, value):
		range_old, range_new = max_old - min_old, max_new - min_new
		return (value - min_old) * range_new / range_old + min_new