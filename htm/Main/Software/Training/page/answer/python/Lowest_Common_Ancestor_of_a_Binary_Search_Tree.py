from collections import deque

class TreeNode:
	def __init__(self, x):
		self.val = x
		self.left = None
		self.right = None

class Solution1:
	def lowestCommonAncestor(self, current, p, q):
		current_val = current.val
		p_val = p.val
		q_val = q.val
		if p_val < current_val and q_val < current_val:
			return self.lowestCommonAncestor(current.left, p, q)
		elif p_val > current_val and q_val > current_val:
			return self.lowestCommonAncestor(current.right, p, q)
		else:
			return current

class Solution2:
	def lowestCommonAncestor(self, root, p, q):
		p_val = p.val
		q_val = q.val
		struct = deque([root])
		while struct:
			current = struct.popleft()
			current_val = current.val
			if p_val < current_val and q_val < current_val:
				struct.append(current.left)
			elif p_val > current_val and q_val > current_val:
				struct.append(current.right)
			else:
				return current

class Solution3: # path finding, unnecessary overhead
	def __init__(self):
		self.pMatch = False
		self.qMatch = False
		self.pWays = []
		self.qWays = []

	def lowestCommonAncestorRec(self, root, p, q):
		struct = deque([(root, [])])
		while struct:
			current, path = struct.popleft()
			if not self.pMatch:
				if current.val == p.val:
					self.pMatch = True
					self.pWays = path + [current.val]
					if self.qMatch:
						return
			if not self.qMatch:
				if current.val == q.val:
					self.qMatch = True
					self.qWays = path + [current.val]
					if self.pMatch:
						return
			if current.left:
				struct.append((current.left, path + [current.val]))
			if current.right:
				struct.append((current.right, path + [current.val]))

	def lowestCommonAncestor(self, root, p, q):
		self.lowestCommonAncestorRec(root, p, q)
		way = None
		for pWay, qWay in zip(self.pWays, self.qWays):
			if pWay == qWay:
				way = pWay
		return TreeNode(way)