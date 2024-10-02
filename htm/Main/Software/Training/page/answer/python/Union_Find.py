class Solution:
	def find(self, parent, i):
		if parent[i] != i:
			parent[i] = self.find(parent, parent[i])
		return parent[i]

	def union(self, parent, a, b, callbackEq=None, callbackNotEq=None):
		ia, ib = self.find(parent, a), self.find(parent, b)
		if ia == ib:
			if callbackEq:
				callbackEq(ia, ib)
		else:
			parent[ib] = ia
			if callbackNotEq:
				callbackNotEq(ia, ib)