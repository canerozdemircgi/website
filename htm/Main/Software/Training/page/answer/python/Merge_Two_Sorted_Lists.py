class ListNode:
	def __init__(self, val=0, next=None):
		self.val = val
		self.next = next

class Solution1: # Merge Sort _ Iterative
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

class Solution2: # Merge Sort _ Recursive
	def mergeTwoLists(self, list1, list2):
		if not list1 or not list2:
			return list1 or list2

		if list1.val < list2.val:
			list1.next = self.mergeTwoLists(list1.next, list2)
			return list1
		else:
			list2.next = self.mergeTwoLists(list1, list2.next)
			return list2

class Solution3: # Merge Sort _ Iterative
	def mergeTwoLists(self, lists): # applicable for multiple lists
		head = current = ListNode()

		lists = list(filter(None, lists))
		while len(lists) > 1:
			i = lists.index(min(lists, key=lambda x: x.val))
			current.next = lists[i]
			current, lists[i] = current.next, lists[i].next
			if not lists[i]:
				del lists[i]
		if len(lists) > 0:
			current.next = lists[0]

		return head.next