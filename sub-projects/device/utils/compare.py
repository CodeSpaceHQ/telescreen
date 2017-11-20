import boto3
import json
from PIL import Image

class Rekgoniton(object):
	"""
	A class that creates a client object for access to AWS Rekgoniton.
	"""
	def __init__(self):
		self.client = boto3.client("rekognition")

	def compare(self, img):
		"""
		Compares a face from the S3 bucket to a passed in image represented in
		bytes/
		:param img: target image for comparing
		"""
		response = self.client.compare_faces(
			SourceImage={
				'S3Object':{
					'Bucket': 'knownfaces',
					'Name': 'picture.jpg'
				}
			},
			TargetImage={
				'Bytes': img
			},
			SimilarityThreshold=80,
		)

		if response['FaceMatches'] == []:
			print('No match found')
