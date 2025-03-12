from collections import deque

class ListNode:
	def __init__(self, val=0, next=None):
		self.val = val
		self.next = next

class Solution1: # Stack & Queue Based Together
	def reorderList(self, head):
		struct = deque()
		current = ListNode(None, head)
		while current := current.next:
			struct.append(current)
		len_struct = len(struct)

		node_back = ListNode() # node_back: dummy
		for _ in range(len_struct // 2):
			node_forw = struct.popleft()
			node_back.next = node_forw
			node_back = struct.pop()
			node_forw.next = node_back
		if len_struct % 2 == 0:
			node_back.next = None
		else:
			node_back.next = struct.popleft()
			node_back.next.next = None

		'''
		head = current = ListNode(None, head)
		for _ in range(len_struct // 2):
			node_forw, node_back = struct.popleft(), struct.pop()
			current.next = current = node_forw
			current.next = current = node_back
		if len_struct % 2 == 0:
			current.next = None
		else:
			current.next = struct.popleft()
			current.next.next = None
		head = head.next
		'''

class Solution2: # Stack Based _ Less Memory
	def reorderList(self, head):
		struct = []
		fast = slow = head
		while fast:
			slow = slow.next
			fast = fast.next.next if fast.next else None
		while slow:
			struct.append(slow)
			slow = slow.next

		current, node_back = head, ListNode() # node_back: dummy
		while struct:
			node_back.next = current
			node_forw, node_back, current = current, struct.pop(), current.next
			node_forw.next = node_back
		if current is not node_back.next:
			node_back.next = current
			node_back.next.next = None
		else:
			node_back.next = None

class Solution3: # Pointer Based _ Less Memory
	def reorderList(self, head):
		fast = slow = head
		while fast:
			slow = slow.next
			fast = fast.next.next if fast.next else None

		# reverse second half
		node_back = None
		while slow:
			slow_next = slow.next
			slow.next, node_back = node_back, slow
			slow = slow_next
		# alternative _ reverse second half
		'''
		while slow:
			slow.next, node_back, slow = node_back, slow, slow.next
		'''

		# merge lists
		node_forw = head
		while node_back:
			forw_next = node_forw.next
			node_forw.next = node_back
			back_next = node_back.next
			node_back.next = forw_next
			node_forw, node_back = forw_next, back_next
		# alternative _ merge lists
		'''
		while node_back:
			forw_next = node_forw.next
			node_forw.next = node_back
			node_forw, node_back = node_back, forw_next
		'''
		node_forw.next = None