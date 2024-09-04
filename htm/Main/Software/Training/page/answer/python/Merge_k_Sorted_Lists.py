import heapq # Priority Queue
from collections import deque

class ListNode:
	def __init__(self, val=0, next=None):
		self.val = val
		self.next = next

class Solution1:
	def mergeTwoLists(self, list1, list2):
		head = current = ListNode()
		while list1 and list2:
			if list1.val < list2.val:
				current.next = list1
				list1 = list1.next
			else:
				current.next = list2
				list2 = list2.next
			current = current.next

		current.next = list1 or list2
		return head.next

	def mergeKLists(self, lists):
		if not lists:
			return None
		struct = deque(lists) # necessary to avoid one big element
		while len(struct) > 1:
			struct.append(self.mergeTwoLists(struct.popleft(), struct.popleft()))
		return struct.popleft()

class Solution2:
	def mergeKLists(self, lists):
		# If two elements have the same val, the next tuple items will be compared
		# i in the below code, which is guaranteed to be unique
		struct = [(current.val, i, current) for i, current in enumerate(lists) if current]
		heapq.heapify(struct)

		head = current = ListNode()
		while struct:
			val, i, node = heapq.heappop(struct)
			current.next = node
			current = current.next
			if node.next:
				heapq.heappush(struct, (node.next.val, i, node.next))
		return head.next