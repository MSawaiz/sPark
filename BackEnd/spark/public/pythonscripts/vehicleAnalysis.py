import base64
import json
import ssl
from pprint import pprint
import os

import cv2

webcam = cv2.VideoCapture(0)

try:
    import httplib  # Python 2
except:
    import http.client as httplib  # Python 3

headers = {"Content-type": "application/json",
            "X-Access-Token": "zXYf0FY31h1bEb3Iy7ZeSMHaKM08PJs6qHWM"}
conn = httplib.HTTPSConnection("dev.sighthoundapi.com", 
        context=ssl.SSLContext(ssl.PROTOCOL_TLSv1))

# To use a hosted image uncomment the following line and update the URL
#image_data = "https://c8.alamy.com/comp/T5A7WJ/smiling-man-in-glasses-show-small-size-by-fingers-T5A7WJ.jpg"

# To use a local file uncomment the following line and update the path
image_data = base64.b64encode(open(os.getcwd()+"\\public\\pythonscripts\\saved_img.jpg", "rb").read()).decode()

params = json.dumps({"image": image_data})

#conn.request("POST", "/v1/recognition?objectType=vehicle,licenseplate", params, headers)


conn.request("POST", "/v1/recognition?objectType=licenseplate", params, headers)
response = conn.getresponse()
result = response.read()

obj = json.loads(result)

pprint(obj)

print("PLATE NO: "+ obj['objects'][0]['licenseplateAnnotation']['attributes']['system']['string']['name'])