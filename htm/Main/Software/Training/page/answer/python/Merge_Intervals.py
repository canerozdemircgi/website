from collections import deque

class Solution1:
	def insert_two(self, interval1, interval2):
		if interval1[1] < interval2[0]:
			return [interval1, interval2]
		if interval1[0] > interval2[1]:
			return [interval2, interval1]
		values = interval1 + interval2
		values.sort()
		return [values[0], values[-1]], None

	def merge(self, intervals):
		intervals.sort(key=lambda x: x[0])
		struct = deque([intervals[0]])
		for i in range(1, len(intervals)):
			interval1, interval2 = self.insert_two(struct.pop(), intervals[i])
			struct.append(interval1)
			if interval2:
				struct.append(interval2)
		return struct