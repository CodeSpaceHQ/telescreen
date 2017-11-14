# NOTE: this file must be in the same directory as screenstream.py to run
from screenstream import WebCamStream
from faces import FacesTracker
import cv2
from time import sleep

face_cascade = cv2.CascadeClassifier("../data/haarcascades/haarcascade_frontalface_default.xml")
detector = FacesTracker(face_cascade)
video_stream = WebCamStream()
video_stream.start()

frame_count = 0
face_count = 0
while True:
    frame = video_stream.read() # read a frame from the stream
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # convert frame to grascale

    detector.update(frame)  # update object tracking
    if frame_count == 15:  # detect on every 15th frame
        frame_count = 0
        if detector.detect(gray) > face_count:
            # recognize faces
            pass

    face_coords = detector.get_coordinates()  # get coordinates of tracked faces

    # draw rectangle around faces
    for (x, y, w, h) in face_coords:
        cv2.rectangle(frame, (x,y), (x+w, y+h), (255, 0, 0), 2) 
        
    cv2.imshow('img', frame)  # display the frame in a window
    if cv2.waitKey(1) == ord('q'):  # must follow imshow, wait for keypress
        break  # stop if 'q' is pressed
    frame_count += 1

video_stream.stop()
cv2.destroyAllWindows()
