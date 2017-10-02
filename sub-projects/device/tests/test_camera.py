# NOTE: this file must be in the same directory as screenstream.py to run
from screenstream import ScreenStream
import cv2
from time import sleep

video_stream = ScreenStream().start()
sleep(2) # wait for the camera to wake up

while True:
    frame = video_stream.read() # read a frame from the stream
    cv2.imshow('img', frame)  # display the frame in a window
    if cv2.waitKey(1) & 0xFF == ord('q'):  # must follow imshow
        break  # stop if 'q' is pressed
    
cv2.destroyAllWindows()
video_stream.stop()
