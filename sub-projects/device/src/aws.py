import boto3
import json

class AWS(object):
    """
    A class that creates a session for AWS access and a list for S3 images
    """
    def __init__(self):
        self.session = boto3.Session(profile_name='default')
        self.image_list = []
        self.getObjects()

    def getObjects(self):
        """
        Get a list of all objects from knownfaces S3 bucket and
        append them to the image_list
        """
        s3 = self.session.client('s3')
        response = s3.list_objects_v2(
            Bucket='knownfaces'
        )

        for contents in response['Contents']:
            self.image_list.append(contents['Key'])
        print(self.image_list)

    def compare(self, img):
        """
        Compares a face from the S3 bucket to a passed in image
        represented in bytes.
        :param img: target image for comparing
        """
        if not self.image_list:
            raise Execption('Image_List should not be empty.')

        names = []
        rek = self.session.client('rekognition')

        for source in self.image_list:
            response = rek.compare_faces(
                SourceImage = {
                    'S3Object':{
                        'Bucket': 'knownfaces',
                        'Name': source
                    }
                },
                TargetImage = {
                    'Bytes': img
                },
                SimilarityThreshold=80,
            )
            if response['FaceMatches']:
                name = source.strip('.jpg')
                names.append(name)

        if names: return True, names

        else: return False, names
