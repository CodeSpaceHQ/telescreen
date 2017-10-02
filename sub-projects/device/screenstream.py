class ScreenStream(object):
    
    def __init__(self, src=0, usePiCamera=False, FPS=32, resolution=(400,400)):
        """
        Initialize a video stream from a PiCamera or a USB Webcam (default)
        Args:
          src: the source for the webcam (default camera is 0)
          usePiCamera: boolean of whether to use PiCamera
          FPS: framerate of the PiCamera
          resolution: resolution of the PiCamera
        """
        self.usePiCamera= usePiCamera  # dfault to use USB webcam
        self.FPS = FPS  # frames per second
        self.resolution = resolution
        
        if usePiCamera:  # set up picamera using helper class
            from picameravideostream import PiCameraVideoStream
            self.stream = PiCameraVideoStream(resolution=resolution,
                                              framerate=FPS)
        else:  # set up webcam using helper class
            from webcamvideostream import WebcamVideoStream
            self.stream = WebcamVideoStream(src=src)
            
    def start(self):
        """
        Start the corresponding stream
        """
        return self.stream.start()
    
    def update(self):
        """
        Update the frame for the corresponding stream
        """
        return self.stream.update()
    
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
        
    