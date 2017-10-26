# NOTE: this file must be in the same directory as screenstream.py to run
from screenstream import ScreenStream
import cv2
from time import sleep

video_stream = ScreenStream(use_pi_camera=True)
video_stream.start()

face_cascade = cv2.CascadeClassifier("../data/haarcascades/haarcascade_frontalface_default.xml")

while True:
    frame = video_stream.read() # read a frame from the stream
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # convert frame to grascale
    face_coords = face_cascade.detectMultiScale(gray, 1.3, 5)  # detect faces
    for (x, y, w, h) in face_coords:  # for each face detected
        cv2.rectangle(frame, (x,y), (x+w, y+h), (255, 0, 0), 2)  # draw a rectangle around it
        
    cv2.imshow('img', frame)  # display the frame in a window
    if cv2.waitKey(1) == ord('q'):  # must follow imshow, wait for keypress
        break  # stop if 'q' is pressed

video_stream.stop()
cv2.destroyAllWindows()
