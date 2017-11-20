from compare import Rekgoniton
import base64

rek = Rekgoniton()

#this should return 'No match found'
with open("caleb.jpg", "rb") as imageFile: #opens the image and stores the binary code in b
  f = imageFile.read()
  b = bytearray(f)

rek.compare(b) #calls the compare function

#this should run successfully and return nothing as of now
with open("cameron.jpg", "rb") as imageFile:
  f = imageFile.read()
  b = bytearray(f)

Rekgoniton.compare(b)
