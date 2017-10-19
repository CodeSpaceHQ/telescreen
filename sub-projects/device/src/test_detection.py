# NOTE: this file must be in the same directory as screenstream.py to run
from screenstream import ScreenStream
import cv2
from time import sleep
from face_detect import Detector


video_stream = ScreenStream()
video_stream.start()
detector = Detector()

while True:
    frame = video_stream.read() # read a frame from the stream
    frame = detector.detect(frame)
        
    cv2.imshow('img', frame)  # display the frame in a window
    if cv2.waitKey(1) == ord('q'):  # must follow imshow
        break  # stop if 'q' is pressed

video_stream.stop()
cv2.destroyAllWindows()