import heapq # Priority Queue

class Interval:
	def __init__(self, start, end):
		self.start = start
		self.end = end

class Solution1:
	def minMeetingRooms(self, intervals):
		if not intervals:
			return 0

		intervals.sort(key=lambda x: x.start)
		struct = []
		heapq.heappush(struct, intervals[0].end)
		for i in range(1, len(intervals)):
			if intervals[i].start < struct[0]:
				heapq.heappush(struct, intervals[i].end)
			else:
				heapq.heapreplace(struct, intervals[i].end) # poppush
		return len(struct)