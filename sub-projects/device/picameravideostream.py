from picamera.array import PiRGBArray
from picamera import PiCamera
from threading import Thread

class PiCameraVideoStream(object):
    """
    A class that handles threaded video streaming through a PiCamera.
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
        self.rawCapture = PiRGBArray(self.camera, size=resolution)  # get RGB array from the camera
        # continuously capture and store as an array in stream
        self.stream = self.camera.capture_continuous(self.rawCapture,  
                                                     format="bgr",
                                                     use_video_port=True)
        
        self.frame = None  # current frame
        self.stopped = False 
    
    def start(self):
        """
        Start the video stream on a separate daemon thread.
        """
        thread = Thread(target=self.update, args=())
        thread.daemon = True
        thread.start()
        return self
    
    def update(self):
        """
        Continuously update the stream with each frame
        until stopped.
        """
        for frame in self.stream:
            self.frame = frame.array
            self.rawCapture.truncate(0)
            
            if self.stopped:
                self.stream.close()
                self.rawCapture.close()
                self.camera.close()
                return
        
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