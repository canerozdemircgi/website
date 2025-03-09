import heapq # Priority Queue

from bisect import bisect_left
from collections import deque
from functools import total_ordering

from math import inf

# bisect_left can be replaced to binary search
'''
left, right = 0, len(piles) - 1
while left <= right:
	middle = left + (right - left) // 2 # overflow middle
	if current > piles[middle][0]:
		left = middle + 1
	elif current < piles[middle][0]:
		right = middle - 1
	else:
		left = middle
		break
i = left
'''

class Solution:
	@total_ordering
	class _Pile(deque):
		def __eq__(self, other):
			return self[0] == other[0]

		def __lt__(self, other):
			return self[0] < other[0]

	def patienceSort(self, data):
		piles = self._createPiles(data)
		data[:] = heapq.merge(*piles)

	def _createPiles(self, data):
		piles = []
		for current in data:
			pile = self._Pile([current])
			i = bisect_left(piles, pile)
			if i == len(piles):
				piles.append(pile)
			else:
				piles[i].appendleft(current)
		return piles

	def _getPilesLen(self, data): # alternative _ faster for L.I.S. _ modifies original data
		for ic, current in enumerate(data):
			i = bisect_left(data, current, hi=ic)
			if i != ic:
				data[i], data[ic] = data[ic], inf
		return bisect_left(data, inf)

class SolutionPath:
	class _PilePath: # Only top elements are stored to optimize path
		def __init__(self, value, prev=None):
			self.value, self.prev = value, prev

		def __lt__(self, other):
			return self.value < other.value

	def _createPaths(self, data):
		piles = self._createPiles(data)

		paths = deque()
		current = self._PilePath(None, piles.pop())
		while current := current.prev:
			paths.appendleft(current.value)
		return paths

	def _createPiles(self, data):
		piles = []
		for current in data:
			pile = self._PilePath(current)
			i = bisect_left(piles, pile)
			if i != 0:
				pile.prev = piles[i - 1]
			# piles[i:i + 1] = [pile]
			if i == len(piles):
				piles.append(pile)
			else:
				piles[i] = pile
		return piles