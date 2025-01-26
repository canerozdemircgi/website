from sys import maxsize as limit_int
from time import time_ns

class Solution:
	def __init__(self):
		self.__value_now = time_ns() # 448385660
		self.__value_mul, self.__value_add = 3306729444, 1609600011

	def getRandom(self, limit_min, limit_max):
		self.__value_now = (self.__value_now * self.__value_mul + self.__value_add) % limit_int
		return (self.__value_now + limit_min) % limit_max