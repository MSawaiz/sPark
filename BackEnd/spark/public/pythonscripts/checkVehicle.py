import cv2
import sys
import base64
import json
import ssl
import os
import http.client as httplib

try:
        # webcam = cv2.VideoCapture(0)       
        # check, frame = webcam.read()            
        # webcam.release()

        frame = cv2.imread('public\\pythonscripts\\saved_img.jpg')
        # image = cv2.line(frame, (int(frame.shape[1]*0.5),0), (int(frame.shape[1]*0.5),frame.shape[0]), (0, 255, 0), 2)
        # cv2.imwrite('public\\pythonscripts\\saved_img.jpg', image)

        headers = {"Content-type": "application/json",
                    "X-Access-Token": "zXYf0FY31h1bEb3Iy7ZeSMHaKM08PJs6qHWM"}
        conn = httplib.HTTPSConnection("dev.sighthoundapi.com",
                                        context=ssl.SSLContext(ssl.PROTOCOL_TLSv1))

        image_data = base64.b64encode(open(os.getcwd()+"\\public\\pythonscripts\\saved_img.jpg", "rb").read()).decode()

        params = json.dumps({"image": image_data})

        conn.request("POST", "/v1/recognition?objectType=licenseplate", params, headers)
        response = conn.getresponse()
        result = response.read()
        obj = json.loads(result)

        print(obj['objects'][0]['licenseplateAnnotation']['attributes']['system']['string']['name'])
        
        if(obj['objects'][0]['licenseplateAnnotation']['bounding']['vertices'][0]['x']<frame.shape[1]*0.5 and obj['objects'][0]['licenseplateAnnotation']['bounding']['vertices'][0]['x']<frame.shape[1]*0.5):
            print(sys.argv[1])
            print(sys.argv[2])
        elif(obj['objects'][0]['licenseplateAnnotation']['bounding']['vertices'][0]['x']>frame.shape[1]*0.5 and obj['objects'][0]['licenseplateAnnotation']['bounding']['vertices'][0]['x']>frame.shape[1]*0.5):
            print(sys.argv[1])
            print(sys.argv[3])
        else:
            print("Parking invalid")

# except(KeyboardInterrupt):
#         print("Turning off camera.")
#         webcam.release()
#         print("Camera off.")
#         print("Program ended.")
        
except:
    print("Processing failed")