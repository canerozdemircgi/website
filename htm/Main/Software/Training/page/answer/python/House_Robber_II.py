import House_Robber

'''
All solutions could be implemented slightly different
in order to avoid moneys[:] copy memory overhead
'''

class Solution0:
	# Override
	def rob(self, moneys):
		if len(moneys) == 1:
			return moneys[0]

		_super = super()
		choice1, choice2 = _super.rob(moneys[1:]), _super.rob(moneys[:-1])
		return max(choice1, choice2)

	def __hash__(self):
		return hash(tuple(self._moneys))

	def __eq__(self, other):
		return self._moneys == other._moneys

class Solution1(Solution0, House_Robber.Solution1): # Top-Down Memoization _ 1
	pass

class Solution2(Solution0, House_Robber.Solution2): # Top-Down Memoization _ 2
	pass

class Solution3(Solution0, House_Robber.Solution3): # Bottom-Up DP
	pass

class Solution4(Solution0, House_Robber.Solution4): # Bottom-Up DP _ Less Memory
	pass

class Solution5(Solution0, House_Robber.Solution5): # Bottom-Up DP _ Less Memory
	pass

class Solution6(Solution0, House_Robber.Solution6): # Bottom-Up DP _ Less Memory
	pass