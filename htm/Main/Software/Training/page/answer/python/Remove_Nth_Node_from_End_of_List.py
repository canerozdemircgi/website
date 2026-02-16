class ListNode:
	def __init__(self, val=0, next=None):
		self.val = val
		self.next = next

# specified node can be deleted immediately as well instead of leaving it to garbage collector

class Solution1: # Stack Based
	def removeNthFromEnd(self, head, n):
		head = current = ListNode(None, head)
		struct = [current]
		while current := current.next:
			struct.append(current)

		for _ in range(n + 1):
			current = struct.pop()
		current.next = current.next.next
		return head.next

class Solution2: # Two Pass - One Pointer
	def removeNthFromEnd(self, head, n):
		head = current = ListNode(None, head)
		len_node = 0
		while current := current.next:
			len_node += 1

		current = head
		for _ in range(len_node - n):
			current = current.next
		current.next = current.next.next
		return head.next

class Solution3: # One Pass - Two Pointers
	def removeNthFromEnd(self, head, n):
		head = slow = fast = ListNode(None, head)
		for _ in range(n):
			fast = fast.next

		while fast.next:
			slow, fast = slow.next, fast.next
		slow.next = slow.next.next
		return head.next

class Solution4: # Recursive Approach
	def removeNthFromEndRec(self, head, n):
		if not head:
			return 0
		i = self.removeNthFromEndRec(head.next, n) + 1
		if i == n + 1:
			head.next = head.next.next
		return i

	def removeNthFromEnd(self, head, n):
		head = ListNode(None, head)
		self.removeNthFromEndRec(head, n)
		return head.next