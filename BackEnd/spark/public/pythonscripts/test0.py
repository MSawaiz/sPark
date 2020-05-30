import cv2

import base64
import json
import ssl
import os

from pprint import pprint

webcam = cv2.VideoCapture(0)

try:
    import httplib  # Python 2
except:
    import http.client as httplib  # Python 3

headers = {"Content-type": "application/json",
           "X-Access-Token": "zXYf0FY31h1bEb3Iy7ZeSMHaKM08PJs6qHWM"}
conn = httplib.HTTPSConnection("dev.sighthoundapi.com", 
       context=ssl.SSLContext(ssl.PROTOCOL_TLSv1))

try:
        check, frame = webcam.read()
        # cv2.imshow("Caspturing", frame)
            
        cv2.imwrite(filename='saved_img.jpg', img=frame)
        webcam.release()
        # img_new = cv2.imread('saved_img.jpg')
        # img_new = cv2.imshow("Captured Image", img_new)
        # cv2.destroyAllWindows()
        
        image = cv2.line(frame, (int(frame.shape[1]*0.5),0), (int(frame.shape[1]*0.5),frame.shape[0]), (0, 255, 0), 2)
        cv2.imwrite(filename='saved_img.jpg', img=image)

        # To use a local file uncomment the following line and update the path
        image_data = base64.b64encode(open(os.getcwd()+"\saved_img.jpg", "rb").read()).decode()

        params = json.dumps({"image": image_data})

        conn.request("POST", "/v1/recognition?objectType=licenseplate", params, headers)
        response = conn.getresponse()
        result = response.read()

        obj = json.loads(result)

        pprint(obj)

        # print("PLATE NO: "+ obj['objects'][0]['licenseplateAnnotation']['attributes']['system']['string']['name'])
        # print(obj['objects'][0]['licenseplateAnnotation']['bounding']['vertices'][0]['x'])
        # print(obj['objects'][0]['licenseplateAnnotation']['bounding']['vertices'][1]['x'])
        # if(obj['objects'][0]['licenseplateAnnotation']['bounding']['vertices'][0]['x']<frame.shape[1]*0.5 and obj['objects'][0]['licenseplateAnnotation']['bounding']['vertices'][0]['x']<frame.shape[1]*0.5):
        #     print("left")
        # elif(obj['objects'][0]['licenseplateAnnotation']['bounding']['vertices'][0]['x']>frame.shape[1]*0.5 and obj['objects'][0]['licenseplateAnnotation']['bounding']['vertices'][0]['x']>frame.shape[1]*0.5):
        #     print("right")
        # else:
        #     print("invalid")
    
        
        #frame = cv2.imread("MND691.jpg")
        #image = cv2.line(frame, (int(frame.shape[1]*0.5),0), (int(frame.shape[1]*0.5),frame.shape[0]), (0, 255, 0), 2)
        #cv2.imwrite(filename='saved_img.jpg', img=image)

except(KeyboardInterrupt):
        print("Turning off camera.")
        webcam.release()
        print("Camera off.")
        print("Program ended.")
        cv2.destroyAllWindows()