import boto3
import json

#this class is for telescreen_device activity
class AWS(object):
	
	#initalize the session for AWS
	def __init__(self):
		self.session = boto3.Session(profile_name='default')
	
	#uploading img to S3
	def uploadS3(self, img):
		s3 = self.session.resource('s3')
		s3.meta.client.upload_file(img, 'checkfaces', img)
		
	
	#delete img from S3
	def deleteS3(self, img):
		s3 = self.session.client('s3')
		s3.delete_object(Bucket='checkfaces', Key=img)
	
	#get a list of all the known faces from the server database
	def queryKnownFaces(self):
		#will need to setup DB Table
		pass
		
	#detect if any faces are found within image
	def detectFace(self, img):  
		bucket = 'checkfaces'
		client = self.session.client('rekognition')
		response = client.detect_faces(Image=
			{'S3Object':
				{'Bucket':bucket,'Name':img}
			},Attributes=['ALL'])

		for faceDetail in response['FaceDetails']:
			print('The detected face is between ' + str(faceDetail['AgeRange']['Low'])+ ' and ' + str(faceDetail['AgeRange']['High']) + ' years old')
			print('Here are the other attributes:')
			print(json.dumps(faceDetail, indent=4, sort_keys=True))	
	
	#compare faces with one image to another
	def compareFaces(self, img):
		#need to have pictures in the knownfaces bucket
		
		