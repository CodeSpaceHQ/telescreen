"""
A module to handle quick access to Amazon Web Services such as S3.
"""
import boto3
import json

class S3(object):
	"""
	A class that handles Amazon Web Services sessions for access to S3
	operations.
	"""
	def __init__(self):
		"""
		Intitialize an object as a session access to Amazon Web Serivces.
		Args: None
		"""
		self.client = boto3.client('s3')

	def upload(self, img):
		"""
		Upload a image to S3 checkfaces bucket.
		"""
		self.client.upload_file(img, 'checkfaces', img)

	def view(self):
		"""
		View all the files in S3 checkfaces bucket.
		"""
		for key in self.client.list_objects(Bucket='checkfaces')['Contents']:
			print(key['Key'])

	def delete(self, img):
		"""
		Delete a image from S3 checkfaces bucket.
		"""
		self.client.delete_object(Bucket='checkfaces', Key=img)
