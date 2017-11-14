import dlib


class FacesTracker(object):
    """
    A class that takes an input stream of image frames and attempts to detect
    and track any faces within those frames.
    """

    def __init__(self, classifier):
        self.face_cascade = classifier
        self.trackers = []  # object tracker for each face
        self.tracking_count = 0

    def detect(self, frame):
        """
        Detect a face within a frame and pass off to 
        tracking.
        :param frame: 
        :return: the count of faces detected in the frame
        """
        detected_faces = self.face_cascade.detectMultiScale(frame, 1.3, 5)
        for (x, y, w, h) in detected_faces:
            # attempt to track the face if it is
            # not already being tracked
            self.track(x, y, w, h, frame)
        return len(detected_faces)

    def track(self, x, y, w, h, frame):

        x_c = x + (w / 2)  # x-coord of center point
        y_c = y + (h / 2)  # y-coord of center  point

        matched = False
        i = 0
        # see if the detected face coordinates are
        # close to one of the faces we are already
        # tracking
        while not matched and i < len(self.trackers):
            curr_tracker = self.trackers[i]
            position = curr_tracker.get_position()
            # coordinates for tracked face `t`
            x_t = int(position.left())
            y_t = int(position.top())
            w_t = int(position.width())
            h_t = int(position.height())
            x_t_c = x_t + (w_t / 2)  # x-coord of center point
            y_t_c = y_t + (h_t / 2)  # y-coord of center point

            x_c_inside_tracked = x_t <= x_c <= x_t + w_t
            y_c_inside_tracked = y_t <= y_c <= y_t + h_t
            x_t_c_inside_detected = x <= x_t_c <= x + w
            y_t_c_inside_detected = y <= y_t_c <= y + h

            # if the detected face's center point is not inside of
            # the t
            matched = all([x_c_inside_tracked, y_c_inside_tracked,
                        x_t_c_inside_detected, y_t_c_inside_detected])
            i += 1

        if not matched:
            # not matched face, start tracking
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
        self.trackers = [t for t in self.trackers if t.update(frame) >= 7]

    def get_coordinates(self):
        positions = []
        for t in self.trackers:
            p = t.get_position()
            
            positions.append((int(p.left()),
                              int(p.top()),
                              int(p.width()),
                              int(p.height())
                              ))
                             
        return positions

