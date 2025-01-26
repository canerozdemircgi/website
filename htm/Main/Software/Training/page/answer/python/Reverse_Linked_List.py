class ListNode:
	def __init__(self, val=0, next=None):
		self.val = val
		self.next = next

class Solution1: # Recursive
	def reverseList(self, current, previous=None):
		if not current:
			return previous

		next, current.next = current.next, previous
		return self.reverseList(next, current)

class Solution2: # Recursive _ Same Signature
	def reverseList(self, current):
		if not current or not current.next: # `not current` is to check `head = None`
			return current
		result = self.reverseList(current.next)
		current.next.next, current.next = current, None
		return result

class Solution3: # Iterative
	def reverseList(self, head):
		if not head:
			return

		struct, current = [], ListNode(None, head)
		while current := current.next:
			struct.append(current)

		result = current = struct.pop()
		while struct:
			current.next = current = struct.pop()
			''' 1st = 2nd = value '''
		current.next = None
		return result

class Solution4: # Iterative _ Optimized
	def reverseList(self, head):
		previous, current = None, head
		while current:
			next = current.next
			current.next = previous
			previous, current = current, next
		return previous

class Solution5: # Iterative _ Optimized _ One-Liner
	def reverseList(self, head):
		previous, current = None, head
		while current:
			current.next, previous, current = previous, current, current.next
			''' 4th, 5th, 6th = 1st, 2nd, 3rd '''
		return previous