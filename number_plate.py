import streamlit as st
import cv2
import os

# Set up OpenCV variables
harcascade = "model/haarcascade_russian_plate_number.xml"
plate_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_russian_plate_number.xml')

# Function to detect and save number plate
def detect_and_save_plate(image, count):
    img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    plates = plate_cascade.detectMultiScale(img_gray, 1.1, 4)

    for (x, y, w, h) in plates:
        area = w * h
        if area > 500:  # Adjust the minimum area as needed
            cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
            cv2.putText(image, 'Number Plate', (x, y-5), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (255, 0, 255), 2)
            plate_img = image[y:y+h, x:x+w]
            # Save the plate image
            filename = f"plates/scaned_img_{count}.jpg"
            cv2.imwrite(filename, plate_img)
            return filename, image

    return None, image

def main(): # main function
    st.title("Number Plate Detection and Saving")
    st.text("Webcam is required for this application.")

    cap = cv2.VideoCapture(0)
    cap.set(3, 640)  # Set width
    cap.set(4, 480)  # Set height

    count = 0
    plate_detected = False  # Flag to track if plate has been detected

    while not plate_detected:
        ret, frame = cap.read()

        if ret:
            # Detect and save plate
            filename, processed_frame = detect_and_save_plate(frame.copy(), count)

            # Display the processed frame with detected plate
            st.image(processed_frame, channels='BGR', caption='Processed Image', use_column_width=True)

            # Check if plate was detected and saved
            if filename:
                st.success(f"Plate saved as: {filename}")
                plate_detected = True  # Set flag to stop capturing framesst

        else:
            st.error('Failed to capture image')

    # Release the camera and close OpenCV resources
    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__': 
    main()
