from collections import deque

class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right

class Solution1:
	def maxDepth(self, root):
		if root is None:
			return 0
		result = 0
		struct = deque([(root, 1)])
		while struct:
			current, depth = struct.pop()
			result = max(result, depth)
			if current.left is not None:
				struct.append((current.left, depth + 1))
			if current.right is not None:
				struct.append((current.right, depth + 1))
		return result