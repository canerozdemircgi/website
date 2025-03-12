from collections import deque

class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right

class Solution1:
	def kthSmallestRec(self, root, k, counter):
		if root.left:
			val, counter = self.kthSmallestRec(root.left, k, counter)
			if counter == k:
				return val, counter
		counter += 1
		if counter == k:
			return root.val, counter
		if root.right:
			val, counter = self.kthSmallestRec(root.right, k, counter)
			if counter == k:
				return val, counter
		return root.val, counter

	def kthSmallest(self, root, k):
		return self.kthSmallestRec(root, k, 0)[0]

class Solution2:
	def kthSmallest(self, root, k):
		counter = 0
		struct = deque()
		while struct or root: # iterative left node right
			while root:
				struct.append(root)
				root = root.left
			root = struct.pop()
			counter += 1
			if counter == k:
				return root.val
			root = root.right