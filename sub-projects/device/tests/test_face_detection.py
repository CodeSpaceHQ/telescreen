# NOTE: this file must be in the same directory as screenstream.py to run
from screenstream import WebCamStream
from faces impoort FacesDetection
import cv2
from time import sleep

face_cascade = cv2.CascadeClassifier("../data/haarcascades/haarcascade_frontalface_default.xml")
detector = FacesDetection(face_cascade)
video_stream = WebCamStream()
video_stream.start()

frame = 0
count = 0
while True:
    frame = video_stream.read() # read a frame from the stream
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # convert frame to grascale

    detector.update(frame)
    if frame == 15:
        frame = 0
        if detector.detect(gray) > count:
            # recognize faces
            pass

    faces_coords = detector.get_coordinates()

    for (x, y, w, h) in face_coords:  # for each face detected
        cv2.rectangle(frame, (x,y), (x+w, y+h), (255, 0, 0), 2)  # draw a rectangle around it
        
    cv2.imshow('img', frame)  # display the frame in a window
    if cv2.waitKey(1) == ord('q'):  # must follow imshow, wait for keypress
        break  # stop if 'q' is pressed
    frame += 1

video_stream.stop()
cv2.destroyAllWindows()
