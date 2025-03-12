class Solution1: # Two Pointers
	def maxArea(self, heights):
		result, left, right = 0, 0, len(heights) - 1
		while left < right:
			area = (right - left) * min(heights[right], heights[left])
			result = max(result, area)
			if heights[left] < heights[right]:
				left += 1
			else:
				right -= 1
			'''
			elif heights[left] == heights[right]:
				left += 1
				right -= 1
			'''
		return result

class Solution2: # Two Pointers _ Optimization [Inline]
	def maxArea(self, heights):
		result, left, right = 0, 0, len(heights) - 1
		while left < right:
			if heights[left] < heights[right]:
				area = (right - left) * heights[left]
				left += 1
			else:
				area = (right - left) * heights[right]
				right -= 1
			'''
			elif heights[left] == heights[right]:
				area = (right - left) * heights[right]
				left += 1
				right -= 1
			'''
			result = max(result, area)
		return result

class Solution3: # Two Pointers _ Optimization [Inline & Iterator]
	def maxArea(self, heights):
		result, left, right = 0, 0, len(heights) - 1
		while left < right:
			if heights[left] < heights[right]:
				height = heights[left]
				area = (right - left) * height
				left += 1
				while left < right and heights[left] <= height:
					left += 1
			else:
				height = heights[right]
				area = (right - left) * height
				right -= 1
				while left < right and heights[right] <= height:
					right -= 1
			'''
			elif heights[left] == heights[right]:
				height = heights[right]
				area = (right - left) * height
				left += 1
				right -= 1
				while left < right and heights[left] <= height and heights[right] <= height:
					left += 1
					right -= 1
			'''
			result = max(result, area)
		return result