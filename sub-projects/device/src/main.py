from screenstream import WebCamStream
from faces import Tracker
from faces import Recognizer
import cv2
import time


def draw_rectangle(img, x, y, w, h):
    """
    Draw a rectangle from (x,y) with width and height
    :param img: the base image
    :param x: start of rectangle
    :param y: start of rectangle 
    :param w: width of rectangle
    :param h: height of rectangle
    """
    cv2.rectangle(img,  # image to draw on
                  (x, y),  # start position
                  (x + w, y + h),  # end position
                  (255, 0, 0),  # color
                  2)  # thickness


def draw_text(img, text, x, y):
    """
    Draw text on an image.
    :param img: the base image
    :param text: the text to draw
    :param x: the x coordinate to place the text at
    :param y: the y coordinate to place the text at
    """
    cv2.putText(img, text, (x, y), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)


def send_name(name, accuracy):
    """
    Send a name and accuracy score along with camera information
    to the backend server.
    :param name: name of recognized person
    :param accuracy: accuracy score 
    """
    timestamp = time.gmtime()
    payload = {"name": name, "accuracy": accuracy,
               "timestamp": timestamp, "cameraid": 1
               }
    # TODO: replace with request.POST
    print("Sending payload: {}".format(payload))


def main():
    # create a tracker that uses the classifier
    tracker = Tracker()
    recognizer = Recognizer("./knownfaces/")

    # get a threaded video stream and start it
    # wake up time for standard webcam is >= 8 seconds
    video = WebCamStream()
    video.start()

    frame_count = 0  # count frames
    detected_count = 0  # count detected faces

    # while the 'q' key has not been pressed
    while cv2.waitKey(1) != ord('q'):

        frame = video.read()  # get current frame
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # convert to gray
        faces = tracker.get_coordinates()  # coordinates of detected faces

        for (x, y, w, h) in faces:
            draw_rectangle(frame, x, y, w, h)  # highlight with rectangle
            # if more faces were detected since last time
            if new_count > detected_count:
                # update face count and attempt to recognize all faces
                # NOTE: could have it predict on only the latest detected faces
                detected_count = new_count
                prediction, accuracy = recognizer.predict(
                    gray_frame[y:y + w, x:x + h])
                print(prediction, accuracy)
                if prediction is not None:
                    # send the predicted name to the server
                    send_name(prediction, accuracy)

        # detect new faces every 15 frames
        if frame_count == 15:
            frame_count = 0
            new_count = tracker.detect_and_track(gray_frame)
            # no faces detected, reset face count
            if not new_count:
                detected_count = 0
        else:
            # update object trackers
            tracker.update(gray_frame)

        # display frame
        # this is only for testing and verification
        cv2.imshow('Image', frame)
        frame_count += 1

    # Clean up
    video.stop()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
