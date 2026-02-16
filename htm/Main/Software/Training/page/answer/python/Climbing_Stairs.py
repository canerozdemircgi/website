from functools import cache
from math import sqrt

class Solution1: # Top-Down Memoization
	@cache
	def climbStairs(self, steps):
		if steps < 0:
			return 0
		elif steps == 0:
			return 1
		return self.climbStairs(steps - 1) + self.climbStairs(steps - 2)

class Solution2: # Bottom-Up DP
	def climbStairs(self, steps):
		results = [1] * (steps + 1)
		for i in range(2, steps + 1):
			results[i] = results[i - 1] + results[i - 2]
		return results[-1]

class Solution3: # Bottom-Up DP _ Less Memory
	def climbStairs(self, steps):
		results = [1, 1, 1]
		for i in range(2, steps + 1):
			results[i % 3] = results[(i - 1) % 3] + results[(i - 2) % 3]
		return results[steps % 3]

class Solution4: # Bottom-Up DP _ Less Memory
	def climbStairs(self, steps):
		result = result_prev1 = result_prev2 = 1
		for _ in range(2, steps + 1):
			result = result_prev1 + result_prev2
			result_prev1, result_prev2 = result, result_prev1
		return result

class Solution5: # Bottom-Up DP _ Less Memory
	def climbStairs(self, steps):
		result = result_prev1 = 1
		for _ in range(2, steps + 1):
			result, result_prev1 = result + result_prev1, result
		return result

class Solution6: # Math - Fibonacci
	def climbStairs(self, steps):
		steps += 1 # increasing steps to match sequence
		sqrt5 = sqrt(5)
		return round(((1 + sqrt5) / 2) ** steps / sqrt5) # Binet’s Simplified Formula