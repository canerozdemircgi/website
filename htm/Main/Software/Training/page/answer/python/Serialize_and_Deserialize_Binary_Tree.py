from collections import deque

class TreeNode:
	def __init__(self, x):
		self.val = x
		self.left = None
		self.right = None

class Codec:
	def __init__(self):
		self.id = -1

	def get_id(self):
		self.id += 1
		return self.id

	def serialize(self, root):
		if not root:
			return '#'
		result = ''
		struct = deque([(root, self.get_id())])
		while struct:
			node, identifier = struct.popleft()
			id_left = self.get_id() if node.left is not None else '!'
			id_right = self.get_id() if node.right is not None else '!'
			result += '#' + str(identifier) + '_' + str(node.val) + '_' + str(id_left) + '_' + str(id_right)
			if node.left is not None:
				struct.append((node.left, id_left))
			if node.right is not None:
				struct.append((node.right, id_right))
		return result

	def deserialize(self, data):
		if data == '#':
			return None
		nodeDict = {}
		nodes = data[1:].split('#')
		id_root = nodes[0].split('_')[0]
		nodeDict[id_root] = TreeNode(None)
		for node in nodes:
			members = node.split('_')
			identifier, val, left, right = members[0], members[1], members[2], members[3]
			nodeDict[left] = None if left == '!' else TreeNode(None)
			nodeDict[right] = None if right == '!' else TreeNode(None)
			nodeDict[identifier].val = val
			nodeDict[identifier].left = nodeDict[left]
			nodeDict[identifier].right = nodeDict[right]
		return nodeDict[id_root]