class TreeNode:
	def __init__(self, val=0, left=None, right=None):
		self.val = val
		self.left = left
		self.right = right

class Solution1:
	def __init__(self):
		self.index_pre = 0
		self.order_pre = None
		self.order_in = None

	def buildTreeRec(self, index_in0, index_in1):
		if index_in0 >= index_in1:
			return None
		element_pre = self.order_pre[self.index_pre]
		self.index_pre += 1
		node_pre = TreeNode(element_pre)
		for i in range(index_in0, index_in1):
			if element_pre == self.order_in[i]:
				node_pre.left = self.buildTreeRec(index_in0, i)
				node_pre.right = self.buildTreeRec(i + 1, index_in1)
		return node_pre

	def buildTree(self, order_pre, order_in):
		self.index_pre = 0
		self.order_pre = order_pre
		self.order_in = order_in
		return self.buildTreeRec(0, len(order_in))