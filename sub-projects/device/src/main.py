from screenstream import WebCamStream
from faces import FacesTracker
import cv2


# get a threaded video stream and start it
# wake up time for standard webcam is >= 8 seconds
video = WebCamStream()
video.start()

# create classifier to determine what a face is
classifier = cv2.CascadeClassifier(
    "../data/haarcascades/haarcascade_frontalface_default.xml"
    )
# create a tracker that uses the classifier
tracker = FacesTracker(classifier)

# count frames
frame_count = 0
# count detected faces
faces_count = 0

# while the 'q' key has not been pressed
while cv2.waitKey(1) != ord('q'):
    frame = video.read()
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # detect new faces every 15th frame
    if frame_count == 15:
        new_count = tracker.detect(gray_frame)
        if new_count > faces_count:
            # new face found, recognize
            # replace with call to recognition method
            pass
        faces_count = new_count
        frame_count = 0
    else:
        # update object trackers
        tracker.update(gray_frame)

    # get the coordinates of the tracked faces in the frame
    coordinates = tracker.get_coordinates()

    # draw a rectangle around each face found.
    # this is only for testing and verification
    for (x, y, w, h) in coordinates:
        cv2.rectangle(frame,  # image to draw on
                      (x,y),  # start position
                      (x+w, y+h),  # end position
                      (255, 0, 0),  # color
                      2)  # thickness
    frame_count += 1
    # display frame
    # this is only for testing and verification
    cv2.imshow('Image', frame)

    
# Clean up
video.stop()
cv2.destroyAllWindows()