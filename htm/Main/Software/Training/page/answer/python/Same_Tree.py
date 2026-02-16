from collections import deque

class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right

class Solution1:
	def isSameTree(self, tree1, tree2):
		if tree1 is None:
			return tree2 is None
		if tree2 is None:
			return tree1 is None
		struct = deque([(tree1, tree2)])
		while struct:
			current1, current2 = struct.popleft()
			if current1.val != current2.val:
				return False
			if current1.left is not None and current2.left is not None:
				struct.append((current1.left, current2.left))
			elif current1.left is None and current2.left is None:
				pass
			else:
				return False
			if current1.right is not None and current2.right is not None:
				struct.append((current1.right, current2.right))
			elif current1.right is None and current2.right is None:
				pass
			else:
				return False
		return True