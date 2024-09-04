class ListNode:
	def __init__(self, val=0, next=None):
		self.val = val
		self.next = next

class Solution1: # Memory Identifier
	def hasCycle(self, head):
		visiteds = set()
		current = ListNode(None, head)
		while current := current.next:
			id_current = id(current) # can be also used object itself without id()
			if id_current in visiteds:
				return True
			visiteds.add(id_current)
		return False

class Solution2: # Fast and Slow Pointer _ With try except
	def hasCycle(self, head):
		try:
			slow, fast = head, head.next
			while slow is not fast:
				slow, fast = slow.next, fast.next.next
			return True
		except:
			return False

class Solution3: # Fast and Slow Pointer _ Without try except
	def hasCycle(self, head):
		if not head:
			return False

		slow, fast = head, head.next
		while slow is not fast:
			if not fast or not fast.next or not fast.next.next:
				return False
			slow, fast = slow.next, fast.next.next
		return True

class Solution4: # Fast and Slow Pointer _ Without try except
	def hasCycle(self, head):
		slow = fast = head
		while fast and fast.next:
			slow, fast = slow.next, fast.next.next
			if slow is fast:
				return True
		return False