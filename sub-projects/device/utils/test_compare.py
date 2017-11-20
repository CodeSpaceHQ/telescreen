from compare import Rekgoniton
import base64

rek = Rekgoniton()

#opens the image and stores the binary code in b
with open("caleb.jpg", "rb") as imageFile:
  f = imageFile.read()
  b = bytearray(f)

rek.compare(b) #calls the compare function

'''
with open("cameron.jpg", "rb") as imageFile:
  f = imageFile.read()
  b = bytearray(f)

Rekgoniton.compare(b)
'''
