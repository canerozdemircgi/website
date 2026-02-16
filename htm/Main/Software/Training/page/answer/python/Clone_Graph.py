from collections import deque

class Node:
	def __init__(self, val=0, neighbors=None):
		self.val = val
		self.neighbors = neighbors if neighbors is not None else []

class Solution1:
	def cloneGraph(self, node):
		if node is None:
			return None

		result = Node(node.val)

		struct = deque([(node, result)])
		visiteds = {node.val: result}
		while struct:
			current, current_copy = struct.popleft()
			for child in current.neighbors:
				if child.val in visiteds:
					child_copy = visiteds[child.val]
				else:
					child_copy = Node(child.val)
					visiteds[child.val] = child_copy
					struct.append((child, child_copy))
				current_copy.neighbors.append(child_copy)

		return result

class Solution2:
	def cloneGraph(self, node):
		if node is None:
			return None

		result = Node()

		struct = deque([(node, result)])
		visiteds = {}
		while struct:
			current, parent = struct.pop()
			if current.val in visiteds:
				current_copy = visiteds[current.val]
			else:
				current_copy = Node(current.val)
				visiteds[current.val] = current_copy
				for child in current.neighbors:
					struct.append((child, current_copy))
			parent.neighbors.append(current_copy)

		return result.neighbors[0]