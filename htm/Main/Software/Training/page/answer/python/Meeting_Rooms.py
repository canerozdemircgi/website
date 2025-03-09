class Interval:
	def __init__(self, start, end):
		self.start = start
		self.end = end

class Solution1:
	def isOverlapping(self, interval1, interval2):
		return interval1.end > interval2.start

	def canAttendMeetings(self, intervals):
		intervals.sort(key=lambda x: x.start)
		for i in range(len(intervals) - 1):
			if self.isOverlapping(intervals[i], intervals[i + 1]):
				return False
		return True