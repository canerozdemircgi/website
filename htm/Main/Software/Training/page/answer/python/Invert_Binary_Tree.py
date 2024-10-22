from collections import deque

class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right

class Solution1:
	def invertTree(self, root):
		if root is None:
			return None
		struct = deque([root])
		while struct:
			current = struct.popleft()
			if current.left is not None and current.right is not None:
				current.left, current.right = current.right, current.left
				struct.append(current.left)
				struct.append(current.right)
			elif current.left is not None:
				current.right = current.left
				current.left = None
				struct.append(current.right)
			elif current.right is not None:
				current.left = current.right
				current.right = None
				struct.append(current.left)
		return root