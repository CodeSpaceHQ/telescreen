# NOTE: this file must be in the same directory as aws.py and cameron.jpg to around
from aws import S3

s3_session = S3();
s3_session.upload('cameron.jpg') # takes the image and stores it into the checkfaces bucket
s3_session.view() # returns all object from checkfaces bucket
s3_session.delete('cameron.jpg') # delete the image from checkfaces bucket
s3_session.view() # returns all objects from checkfaces bucket

#If test works correctly it will return a error at the end saying:
#Traceback (most recent call last):
# File "test_aws_s3.py", line 8, in <module>
#    s3_session.view() # returns all objects from checkfaces bucket
#  File "C:\Users\Cameron\Documents\GitHub\Telescreen\sub-projects\device\src\aws.py", line 29, in view
#    for key in self.client.list_objects(Bucket='checkfaces')['Contents']:
#KeyError: 'Contents'
