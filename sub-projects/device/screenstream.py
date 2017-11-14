from cv2 import VideoCapture
from picamera.array import PiRGBArray
from picamera import PiCamera
from threading import Thread, Event
from time import sleep


class WebCamVideoStream(object):
    """
    A class that handles threaded video streaming through a USB webcam.
    based on imutils library for python: https://github.com/jrosebr1/imutils

    """

    def __init__(self, src=0):
        """
        Initialize an object that controls a video
        stream from a USB Webcam on a separate thread.
        Args:
          src: the source for the USB webcam, 0 is the default camera
        """
        self.src = src
        self.stream = VideoCapture(src)  # initialize video source
        self.grabbed, self.frame = self.stream.read()  # grab initial frame
        self.stopped = False
        self.has_frame = Event()

    def start(self):
        """
        Start the video stream on a separate daemon thread.
        """
        thread = Thread(target=self.update, args=(self.frame, self.has_frame))
        thread.daemon = True  # set thread to daemon
        thread.start()  # start thread

    def update(self, frame, has_frame):
        """
        Continuously update the stream with the most recent frame
        until stopped.
        """
        while not self.stopped:
            self.grabbed, frame = self.stream.read()
            if self.grabbed:
                has_frame.set()  # notify
            else:
                sleep(0)  # yield thread to scheduler

    def read(self):
        """
        Read the current frame in the video stream.
        Returns:
          The most recent frame captured
        """
        self.has_frame.wait()
        frame = self.frame
        self.has_frame.clear()
        return frame

    def stop(self):
        """
        Stop the video stream.
        """
        self.stopped = True
