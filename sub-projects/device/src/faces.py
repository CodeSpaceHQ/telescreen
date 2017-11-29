import dlib
import numpy
import os
from cv2 import CascadeClassifier
from cv2 import imread
from cv2.face import LBPHFaceRecognizer_create
from cv2 import cvtColor, COLOR_BGR2GRAY


class Tracker(object):
    """
    A class that takes an input stream of image frames and attempts to detect
    and track any faces within those frames.
    """

    def __init__(self):
            # create classifier to determine what a face is
        self.face_cascade = CascadeClassifier(
        "../data/haarcascades/haarcascade_frontalface_default.xml"
        )
        self.trackers = []  # object tracker for each face
        self.tracking_count = 0
        
    @staticmethod
    def detect_one(img):
        face_cascade = CascadeClassifier("../data/haarcascades/haarcascade_frontalface_default.xml")
        detected = face_cascade.detectMultiScale(img, 1.2, 5)
        (x, y, w, h) = detected[0]
        return img[y:y+w, x:x+h] 

    def detect_and_track(self, frame):
        """
        Detect a face within a frame and pass off to 
        tracking.
        :param frame: current frame to detect faces in
        :return: the count of faces detected in the frame
        """
        detected_faces = self.face_cascade.detectMultiScale(frame, 1.3, 5)
        for (x, y, w, h) in detected_faces:
            # attempt to track the face if it is
            # not already being tracked
            self.track(x, y, w, h, frame)
        return self.tracking_count

    def track(self, x, y, w, h, frame):
        """
        Attempt to track a face detected in a frame
        :param x: the x coordinate of the detected face
        :param y: the y coordinate of the detected face
        :param w: the width of the detected face
        :param h: the height of the detected face
        :param frame: the frame the face was detected in
        """
        x_c = x + (w // 2)  # x-coord of center point
        y_c = y + (h // 2)  # y-coord of center  point

        # see if the detected face coordinates are
        # close to one of the faces we are already
        # tracking
        matched = False
        i = 0
        while not matched and i < len(self.trackers):
            curr_tracker = self.trackers[i]
            position = curr_tracker.get_position()
            # coordinates for tracked face `t`
            # must cast to int() for dlib
            x_t = int(position.left())
            y_t = int(position.top())
            w_t = int(position.width())
            h_t = int(position.height())
            x_t_c = x_t + (w_t / 2)  # x-coord of center point
            y_t_c = y_t + (h_t / 2)  # y-coord of center point

            # boolean values to check if the detected face is
            # inside of any of the faces we are already tracking,
            # and vis versa.
            x_c_inside_tracked = x_t <= x_c <= x_t + w_t
            y_c_inside_tracked = y_t <= y_c <= y_t + h_t
            x_t_c_inside_detected = x <= x_t_c <= x + w
            y_t_c_inside_detected = y <= y_t_c <= y + h

            # check if this face matches any faces we have been tracking
            matched = all([x_c_inside_tracked, y_c_inside_tracked,
                           x_t_c_inside_detected, y_t_c_inside_detected])
            i += 1

        if not matched:
            # not matched face, start tracking the detected face
            new_tracker = dlib.correlation_tracker()
            new_tracker.start_track(frame,
                                    dlib.rectangle(
                                        int(x),
                                        int(y),
                                        int(x + w),
                                        int(y + h)
                                    ))
            self.trackers.append(new_tracker)
            self.tracking_count += 1

    def update(self, frame):
        """
        Update the list of trackers with a new frame
        :param frame: the current frame to update the trackers with
        """
        # remove any bad quality trackers
        self.trackers = [t for t in self.trackers if t.update(frame) >= 7]
        self.tracking_count = len(self.trackers)

    def get_coordinates(self):
        """
        Get the x, y, w, h coordinates for a rectangle around
        each currently tracked face
        :return: a list of tuples (x, y, w, h) for a face
        """
        positions = []
        for t in self.trackers:
            p = t.get_position()
            positions.append((int(p.left()),
                              int(p.top()),
                              int(p.width()),
                              int(p.height())
                              ))
        return positions


class Recognizer(object):
    
    def __init__(self, known_faces_path):
        self.known_faces_path = known_faces_path
        self.recognizer = LBPHFaceRecognizer_create()
        self.subjects = [""]
        self.train()
    
    
    def train(self):
        faces, labels = self.prep_training_data()
        # train the recognizer
        self.recognizer.train(faces, numpy.array(labels))
        
    def prep_training_data(self):
        labels = []
        faces = []
        directories = os.listdir(self.known_faces_path)
        for directory in reversed(directories):
            if directory.startswith('s'):
                # directory, (i.e. s34) get label
                opencv_label = int(directory[1:])
                dir_path = self.known_faces_path + '/' + directory
                image_paths = os.listdir(dir_path)
                for image_file in image_paths:
                    if image_file[0].isdigit():
                        image_path = dir_path + '/' + image_file
                        image = imread(image_path)
                        image = cvtColor(image, COLOR_BGR2GRAY)
                        face = Tracker.detect_one(image)
                        labels.append(opencv_label)
                        faces.append(face)
                    else:
                        self.subjects.append(image_file)
        print(self.subjects)
        return faces, labels
                            
    def predict(self, face):
        # returns label, accuracy
        return self.recognizer.predict(face)
        
