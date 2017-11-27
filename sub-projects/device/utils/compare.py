import boto3
import json
from PIL import Image

class Rekgoniton(object):
	"""
	A class that creates a client object for access to AWS Rekgoniton.
	"""
	def __init__(self):
		self.client = boto3.client("rekognition")
		self.image_list = ['cameron.jpg','rachel.jpg'];

	def compare(self, img):
		"""
		Compares a face from the S3 bucket to a passed in image represented in
		bytes.
		:param img: target image for comparing
		"""
		i = 0
		while i < len(self.image_list):
			response = self.client.compare_faces(
				SourceImage={
					'S3Object':{
						'Bucket': 'knownfaces',
						'Name': self.image_list[i]
						}
				},
				TargetImage={
					'Bytes': img
				},
				SimilarityThreshold=80,
			)

			if response['FaceMatches'] != []:
				name = self.image_list[i]
				name = name.strip('.jpg')
				print('Face match found with '+name)

			elif response['FaceMatches'] == []:
				name = self.image_list[i]
				name = name.strip('.jpg')
				print('No face match with '+ name)

			i += 1
