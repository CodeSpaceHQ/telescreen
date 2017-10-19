from cv2 import VideoCapture
from picamera.array import PiRGBArray
from picamera import PiCamera
from threading import Thread, Event
from time import sleep


class PiCameraVideoStream(object):
    """
    A class that handles threaded video streaming through a PiCamera.
    slightly based on imutils library for python: https://github.com/jrosebr1/imutils
    """

    def __init__(self, resolution, framerate):
        """
        Initialize an object that controls a video
        stream from a PiCamera on a separate thread.
        Args:
          resolution: the desired resoluiton of each frame in the stream
          framerate: the desired framerate of the video stream
        """
        self.camera = PiCamera()  # get picamera object
        self.camera.resolution = resolution
        self.camera.framerate = framerate
        self.raw_capture = PiRGBArray(self.camera,
                                     size=resolution)  # get RGB array from the camera
        # continuously capture and store as an array in stream
        self.stream = self.camera.capture_continuous(self.raw_capture,
                                                     format="bgr",
                                                     use_video_port=True)

        self.frame = None  # current frame
        self.stopped = False
        self.has_frame = Event()

    def start(self):
        """
        Start the video stream on a separate daemon thread.
        """
        thread = Thread(target=self.update, args=())  # create new thread
        thread.daemon = True  # set thread to daemon
        thread.start()  # start thread

    def update(self):
        """
        Continuously update the stream with each frame
        until stopped.
        """
        for frame in self.stream:
            self.frame = frame.array
            self.raw_capture.truncate(0)
            if frame:
                self.has_frame.set()  # set flag
            if self.stopped:
                self.stream.close()
                self.raw_capture.close()
                self.camera.close()
                return

    def read(self):
        """
        Read the current frame in the video stream.
        Returns:
          The most recent frame captured
        """
        self.has_frame.wait()  # wait for frame from thread
        frame = self.frame
        self.has_frame.clear()  # clear flag
        return frame

    def stop(self):
        """
        Stop the video stream.
        """
        self.stopped = True


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
        Start the video stream on a separate daemon thread once the
        capturing device is opened.
        """
        while not self.stream.isOpened():  # wait for I/O to come online
            sleep(8)  # 8 seconds = 1 successful re-open attempt
            self.stream.open(self.src)  # attempt to open again
            
        thread = Thread(target=self.update, args=())
        thread.daemon = True  # set thread to daemon
        thread.start()  # start thread

    def update(self):
        """
        Continuously update the stream with the most recent frame
        until stopped.
        """
        while not self.stopped:
            self.grabbed, self.frame = self.stream.read()
            if self.grabbed:
                self.has_frame.set()  # notify

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
        self.stream.release()  # close capturing device


class ScreenStream(object):
    def __init__(self, src=0, use_pi_camera=False, framerate=32, resolution=(400, 400)):
        """
        Initialize a video stream from a PiCamera or a USB Webcam (default)
        based on imutils library for python: https://github.com/jrosebr1/imutils

        Args:
          src: the source for the webcam (default camera is 0)
          usePiCamera: boolean of whether to use PiCamera
          FPS: framerate of the PiCamera
          resolution: resolution of the PiCamera
        """
        self.use_pi_camera = use_pi_camera  # dfault to use USB webcam
        self.framerate = framerate  # frames per second
        self.resolution = resolution

        if use_pi_camera:  # set up picamera using helper class
            self.stream = PiCameraVideoStream(resolution=resolution,
                                              framerate=framerate)
        else:  # set up webcam using helper class
            self.stream = WebCamVideoStream(src=src)

    def start(self):
        """
        Start the corresponding stream
        """
        return self.stream.start()

    def read(self):
        """
        Read a frame in the corresponding stream
        """
        return self.stream.read()

    def stop(self):
        """
        Stop the corresponding stream
        """
        return self.stream.stop()
