from collections import deque
from math import inf

class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right

class Solution1:
	def isValidBST(self, root):
		struct = deque([(root, -inf, inf)])
		while struct:
			current, min_limit, max_limit = struct.pop()
			if min_limit >= current.val or current.val >= max_limit:
				return False
			if current.left is not None:
				struct.append((current.left, min_limit, current.val))
			if current.right is not None:
				struct.append((current.right, current.val, max_limit))
		return True

class Solution2:
	def isValidBSTRec(self, root, prev):
		if root.left:
			flag, prev = self.isValidBSTRec(root.left, prev)
			if not flag:
				return False, None
		if root.val <= prev:
			return False, None
		prev = root.val
		if root.right:
			flag, prev = self.isValidBSTRec(root.right, prev)
			if not flag:
				return False, None
		return True, prev

	def isValidBST(self, root):
		return self.isValidBSTRec(root, -inf)[0]

class Solution3:
	def isValidBST(self, root):
		prev = -inf
		struct = deque()
		while struct or root: # iterative left node right
			while root:
				struct.append(root)
				root = root.left
			root = struct.pop()
			if root.val <= prev:
				return False
			prev = root.val
			root = root.right
		return True