from collections import deque

class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right

class Solution1:
	def isSametree(self, root, root_sub):
		struct = deque([(root, root_sub)])
		while struct:
			node, node_sub = struct.pop()
			if node.val != node_sub.val:
				return False
			for child1, child2 in zip((node.left, node.right), (node_sub.left, node_sub.right)):
				if child1 is not None and child2 is not None:
					struct.append((child1, child2))
				else:
					if child1 is None and child2 is not None:
						return False
					if child2 is None and child1 is not None:
						return False
		return True

	def isSubtree(self, root, root_sub):
		struct = deque([(root, root_sub)])
		while struct:
			node, node_sub = struct.pop()
			if node.val == node_sub.val:
				if self.isSametree(node, node_sub):
					return True
			for child in (node.left, node.right):
				if child is not None:
					struct.append((child, node_sub))
		return False