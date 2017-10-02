from cv2 import VideoCapture
from threading import Thread

class WebcamVideoStream(object):
    """
    A class that handles threaded video streaming through a USB webcam.
    """
    def __init__(self, src=0):
        """
        Initialize an object that controls a video
        stream from a USB Webcam on a separate thread.
        Args:
          src: the source for the USB webcam, 0 is the default camera
        """
        self.stream = VideoCapture(src)  # initialize video source
        self.grabbed, self.frame = self.stream.read() # grab initial frame
        self.stopped = False
        
    def start(self):
        """
        Start the video stream on a separate daemon thread.
        """
        thread = Thread(target=self.update, args=())  # create new thread
        thread.daemon = True  # set thread to daemon
        thread.start()  # start thread
        return self
    
    def update(self):
        """
        Continuously update the stream with the most recent frame
        until stopped.
        """
        while not self.stopped:
            self.grabbed, self.frame = self.stream.read()
        
    def read(self):
        """
        Read the current frame in the video stream.
        Returns:
          The most recent frame captured
        """
        return self.frame
    
    def stop(self):
        """
        Stop the video stream.
        """
        self.stopped = True
        