import json

class Solution:
	def debugJson(self, data):
		print(json.dumps(data, default=lambda x: x.__dict__, indent=1))