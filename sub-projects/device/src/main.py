from screenstream import WebCamStream
from faces import Tracker
from faces import Recognizer
import cv2
import time


def draw_rectangle(img, x, y, w, h):
    cv2.rectangle(img,  # image to draw on
                      (x,y),  # start position
                      (x+w, y+h),  # end position
                      (255, 0, 0),  # color
                      2)  # thickness
    
def draw_text(img, text, x, y):
    cv2.putText(img, text, (x, y), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
    

def send_name(name, accuracy):
    timestamp = time.gmtime()
    payload = {"name": name, "accuracy": accuracy,
               "timestamp": timestamp, "cameraid":1
               }
    print("Sending payload: {}".format(payload))
    

def main():
    # create a tracker that uses the classifier
    tracker = Tracker()
    recognizer = Recognizer("./knownfaces/")
    # get a threaded video stream and start it
    # wake up time for standard webcam is >= 8 seconds
    video = WebCamStream()
    video.start()

    # count frames
    frame_count = 0
    # count detected faces
    faces_count = 0

    # while the 'q' key has not been pressed
    while cv2.waitKey(1) != ord('q'):
        frame = video.read()
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # get the coordinates of the tracked faces in the frame
        faces = tracker.get_coordinates()
        for (x, y, w, h) in faces:
            draw_rectangle(frame, x, y, w, h)
            prediction, accuracy = recognizer.predict(gray_frame[y:y+w, x:x+h])
            if prediction:
                draw_text(frame, prediction, x, y)
                send_name(prediction, accuracy)
        # detect new faces every 15th frame
        if frame_count == 15:
            new_count = tracker.detect_and_track(gray_frame)
            frame_count = 0
        else:
            # update object trackers
            tracker.update(gray_frame)
            
        frame_count += 1
        # display frame
        # this is only for testing and verification
        cv2.imshow('Image', frame)

        
    # Clean up
    video.stop()
    cv2.destroyAllWindows()
    
if __name__ == "__main__":
    main()
