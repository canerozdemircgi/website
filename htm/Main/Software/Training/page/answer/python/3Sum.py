from itertools import islice

class Solution1: # Binary Search
	def __nSum(self, numbers, target, axis, currents, results):
		len_numbers = len(numbers)
		if len_numbers < axis or target < sum(numbers[:axis]) or target > sum(numbers[-axis:]):
			return

		if axis == 2:
			left, right = 0, len_numbers - 1
			while left < right:
				value = numbers[left] + numbers[right]
				if value < target:
					left += 1
				elif value > target:
					right -= 1
				else:
					results.append(currents + [numbers[left], numbers[right]])
					left += 1
					while numbers[left] == numbers[left - 1] and left < right:
						left += 1
					right -= 1
		else:
			for i in range(len_numbers - axis + 1):
				if i == 0 or numbers[i] != numbers[i - 1]:
					self.__nSum(numbers[i + 1:], target - numbers[i], axis - 1, currents + [numbers[i]], results)

	def threeSum(self, numbers):
		numbers.sort()
		results = []
		self.__nSum(numbers, 0, 3, [], results)
		return results

class Solution2: # Binary Search _ Less Memory
	def __nSum(self, numbers, left, target, axis, currents, results):
		len_numbers = len(numbers)
		if len_numbers - left < axis or target < sum(islice(numbers, left, left + axis)) or target > sum(islice(numbers, len_numbers - axis, len_numbers)):
			return

		if axis == 2:
			right = len_numbers - 1
			while left < right:
				value = numbers[left] + numbers[right]
				if value < target:
					left += 1
				elif value > target:
					right -= 1
				else:
					results.append(currents + [numbers[left], numbers[right]])
					left += 1
					while numbers[left] == numbers[left - 1] and left < right:
						left += 1
					right -= 1
		else:
			for i in range(left, len_numbers - axis + 1):
				if i == left or numbers[i] != numbers[i - 1]:
					self.__nSum(numbers, i + 1, target - numbers[i], axis - 1, currents + [numbers[i]], results)

	def threeSum(self, numbers):
		numbers.sort()
		results = []
		self.__nSum(numbers, 0, 0, 3, [], results)
		return results