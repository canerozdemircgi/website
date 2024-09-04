from math import inf

class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right

class Solution1:
	def __init__(self):
		self.top = -inf

	def maxPathSumRec(self, node):
		current = node.val
		current_left = 0 if node.left is None else self.maxPathSumRec(node.left)
		current_right = 0 if node.right is None else self.maxPathSumRec(node.right)
		max_1d2d = max(current, current + current_left, current + current_right)
		self.top = max(self.top, max_1d2d, current + current_left + current_right)
		return max_1d2d

	def maxPathSum(self, root):
		self.maxPathSumRec(root)
		return self.top