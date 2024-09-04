from collections import deque
from functools import cache
from math import inf, isinf

# (target + 1) can be used instead of inf [assuming coins are int]

class Solution1: # Top-Down Memoization
	def __init__(self):
		self.__coins = None

	@cache
	def __coinChangeRec(self, target):
		if target < 0:
			return inf
		if target == 0:
			return 1

		return min(self.__coinChangeRec(target - coin) + 1 for coin in self.__coins)

	def coinChange(self, coins, target):
		# early termination is not obligatory since cache covers it
		self.__coins = coins
		result = self.__coinChangeRec(target) - 1
		return (result, -1)[isinf(result)] # -1 if isinf(result) else result

class Solution2: # Bottom-Up DP _ Backward
	def coinChange(self, coins, target):
		coins.sort() # early termination preparing
		results = [inf] * (target + 1)
		results[0] = 0
		for index in range(min(coins), target + 1): # loop order does not matter
			for coin in coins:
				if index < coin: # early termination
					break
				results[index] = min(results[index], results[index - coin] + 1)
		return (results[-1], -1)[isinf(results[-1])] # -1 if isinf(results[-1]) else results[-1]

class Solution3: # Bottom-Up DP _ Backward _ Optimized
	def coinChange(self, coins, target):
		coins.sort() # early termination preparing
		results = [inf] * (target + 1)
		results[0] = 0
		for coin in coins: # loop order does not matter
			for index in range(coin, target + 1):
				results[index] = min(results[index], results[index - coin] + 1)
		return (results[target], -1)[isinf(results[target])] # -1 if isinf(results[target]) else results[target]

class Solution4: # Bottom-Up DP _ Forward
	def coinChange(self, coins, target):
		coins.sort() # early termination preparing
		results = [inf] * (target + 1)
		results[0] = 0
		for index in range(target + 1 - min(coins)): # loop order does not matter
			if isinf(results[index]):
				continue
			for coin in coins:
				index_frw = index + coin
				if index_frw > target: # early termination
					break
				results[index_frw] = min(results[index_frw], results[index] + 1)
		return (results[-1], -1)[isinf(results[-1])] # -1 if isinf(results[-1]) else results[-1]

class Solution5: # Bottom-Up DP _ Forward _ Optimized
	def coinChange(self, coins, target):
		coins.sort() # early termination preparing
		results = [inf] * (target + 1)
		results[0] = 0
		for coin in coins: # loop order does not matter
			for index in range(target + 1 - coin):
				if isinf(results[index]):
					continue
				index_frw = index + coin
				results[index_frw] = min(results[index_frw], results[index] + 1)
		return (results[-1], -1)[isinf(results[-1])] # -1 if isinf(results[-1]) else results[-1]

class Solution6: # BFS (Fastest)
	def coinChange(self, coins, target):
		if target == 0:
			return 0

		coins.sort() # early termination preparing
		struct = deque([(0, 1)])
		visiteds = {0}
		while struct:
			index, value = struct.popleft()
			for coin in coins:
				index_frw = index + coin
				if index_frw not in visiteds:
					if index_frw == target:
						return value
					if index_frw > target: # early termination
						break

					visiteds.add(index_frw)
					struct.append((index_frw, value + 1))
		return -1