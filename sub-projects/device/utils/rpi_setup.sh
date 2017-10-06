# It is recommended that you make the file swap size 1024 before run
# www.bitpi.co/2015/02/11/how-to-change-raspberry-pis-swapfile-size-on-rasbain/
# It is recommended that you expand file system before run
# https://www.raspberrypi.org/documentation/configuration/raspi-config.md



# update
sudo apt-get update -y
# upgrade
sudo apt-get upgrade -y


# make codebase repo in pi/
cd ~
mkdir Codebase

# make temp file in codebase
cd Codebase
mkdir temp
cd temp
cd ~


########################################
#
# Begin installation of `cmake`
# https://cmake.org
#
########################################
echo "Installing cmake..."
sudo apt-get install cmake -y

########################################
#
# Begin installation of `opencv`
# http://www.pyimagesearch.com/2016/04/18/install-guide-raspberry-pi-3-raspbian-jessie-opencv-3/
#
########################################
echo "Installing dev tools (1/6)"
sudo apt-get install build-essesntial cmake pkg-config -y

echo "Installing dev tools (2/6)"
sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev -y

echo "Installing dev tools (3/6)"
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev -y
sudo apt-get install libxvidcore-dev libx264-dev -y

echo "Installing dev tools (4/6)"
sudo apt-get install libgtk2.0-dev -y

echo "Installing dev tools (5/6)"
sudo apt-get install libatlas-base-dev gfortran -y

echo "Installing dev tools (6/6)"
sudo apt-get install python2.7-dev python3-dev -y

echo "downloading opencv.."
cd ~/Codebase/temp/
wget -O opencv.zip https://github.com/Itseez/opencv/archive/3.3.0.zip
unzip opencv.zip

wget -O opencv_contrib.zip https://github.com/Itseez/opencv_contrib/archive/3.3.0.zip
unzip opencv_contrib.zip

echo "making opencv..."
cd ~/Codebase/temp/opencv-3.3.0/
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE \
 -D CMAKE_INSTALL_PREFIX=~/../../usr/local \
 -D INSTALL_PYTHON_EXAMPLES=ON \
 -D OPENCV_EXTRA_MODULES_PATH=~/Codebase/temp/opencv_contrib-3.3.0/modules \
 -D BUILD_EXAMPLES=ON ..

make

echo "installing opencv..."
sudo make install

sudo ldconfig

echo "removing build files"
rm -rf opencv-3.3.0 opencv_contrib-3.3.0


########################################
#
# Begin installation of `dlib`
# https://github.com/davisking/dlib.git
#
########################################
echo "Installing dlib and dlib requirements..."
cd ~

# install libboost (required for dlib)
sudo apt-get install libboost-all-dev -y

# codebase/temp
cd Codebase/temp/

# clone repo
git clone https://github.com/davisking/dlib.git

# build the main dlib library
cd dlib
mkdir build; cd build; cmake .. -DDLIB_USE_CUDA=0 -DUSE_AVX_INSTRUCTIONS=1; cmake --build .

# build and install python extensions
cd ..
sudo python3 setup.py install --yes USE_AVX_INSTRUCTIONS --no DLIB_USE_CUDA


########################################
#
# Begin installation of `face_recognition`
# https://github.com/ageitgey/face_recognition.git
#
########################################
cd ~
sudo apt-get install python3-scipy -y
pip3 install face_recognition
