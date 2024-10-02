from math import inf

class Solution1:
	def isOverlap(self, interval1, interval2):
		return interval1[1] > interval2[0]

	def eraseOverlapIntervals(self, intervals):
		intervals.sort(key=lambda x: x[0])
		result = i = 0
		while i < len(intervals) - 1:
			interval1, interval2 = intervals[i], intervals[i + 1]
			if self.isOverlap(interval1, interval2):
				result += 1
				if interval1[1] > interval2[1]:
					intervals.pop(i)
				else:
					intervals.pop(i + 1)
			else:
				i += 1
		return result

class Solution2: # faster
	def isOverlap(self, interval1, interval2):
		return interval1[1] > interval2[0]

	def eraseOverlapIntervals(self, intervals):
		intervals.sort(key=lambda x: x[1]) # x[0])
		result = i = 0
		while i < len(intervals) - 1:
			interval1, interval2 = intervals[i], intervals[i + 1]
			if self.isOverlap(interval1, interval2):
				result += 1
				# if interval1[1] > interval2[1]:
				#	intervals.pop(i)
				# else:
				intervals.pop(i + 1)
			else:
				i += 1
		return result

class Solution3: # without corrupting intervals
	def isOverlap(self, interval1, interval2):
		return interval1[1] > interval2[0]

	def eraseOverlapIntervals(self, intervals):
		intervals.sort(key=lambda x: x[1])
		result = 0
		iLeft, iRight = 0, 1
		while iRight < len(intervals):
			interval1, interval2 = intervals[iLeft], intervals[iRight]
			if self.isOverlap(interval1, interval2):
				result += 1
			else:
				iLeft = iRight
			iRight += 1
		return result

class Solution4:
	def eraseOverlapIntervals(self, intervals):
		result = 0
		end = -inf
		intervals.sort(key=lambda x: x[1])
		for start1, end1 in intervals:
			if start1 >= end:
				end = end1
			else:
				result += 1
		return result