from collections import deque

class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right

class Solution1:
	def levelOrder(self, root):
		if not root:
			return []
		result = []
		struct = deque([(root, 0)])
		while struct:
			current, level = struct.popleft()
			if level + 1 <= len(result):
				result[level].append(current.val)
			else:
				result.append([current.val])
			for child in (current.left, current.right):
				if child is not None:
					struct.append((child, level + 1))
		return result