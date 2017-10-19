import cv2
import dlib

class Detector(object):
    
    def __init__(self):
        self.cascade = cv2.CascadeClassifier('../utils/haarcascades/haarcascade_frontalface_default.xml')


    def detect(self, img):
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        detected = self.cascade.detectMultiScale(gray, 1.3, 5)
        for (x, y, w, h) in detected:
            cv2.rectangle(img, (x,y),(x+w, y+h), (0,255,255),2)
        return img

    