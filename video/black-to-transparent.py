# from PIL import Image

# def black_to_transparent(image_path, save_path, threshold=3):
#     # Open the image
#     img = Image.open(image_path).convert("RGBA")
    
#     # Get the image data
#     data = img.getdata()

#     # Create a new list to hold the updated image data
#     new_data = []

#     # Loop through the data and set near-black pixels to transparent
#     for item in data:
#         # Calculate the brightness of the pixel (R, G, B)
#         brightness = (item[0] + item[1] + item[2]) / 3
        
#         # Check if the pixel is near black based on the threshold
#         if brightness < threshold:
#             # Set the pixel to transparent
#             new_data.append((0, 0, 0, 0))
#         else:
#             # Keep the pixel as is
#             new_data.append(item)

#     # Update the image data
#     img.putdata(new_data)
    
#     # Save the new image
#     img.save(save_path, "PNG")


# # Example usage
# black_to_transparent('navigation-video.png', 'navigation.png')



# from PIL import Image, ImageSequence

# def black_to_transparent_gif(image_path, save_path, threshold=3):
#     # Open the GIF image
#     img = Image.open(image_path)
    
#     # Create a list to hold the processed frames
#     frames = []
    
#     # Loop over each frame in the GIF
#     for frame in ImageSequence.Iterator(img):
#         # Convert frame to RGBA for transparency support
#         frame = frame.convert("RGBA")
        
#         # Get the frame's image data
#         data = frame.getdata()
        
#         # Create a new list to hold the updated image data for the frame
#         new_data = []
        
#         # Loop through the data and set near-black pixels to transparent
#         for item in data:
#             # Calculate the brightness of the pixel (R, G, B)
#             brightness = (item[0] + item[1] + item[2]) / 3
            
#             # Check if the pixel is near black based on the threshold
#             if brightness < threshold:
#                 # Set the pixel to transparent
#                 new_data.append((0, 0, 0, 0))
#             else:
#                 # Keep the pixel as is
#                 new_data.append(item)
        
#         # Update the frame's image data
#         frame.putdata(new_data)
        
#         # Append the processed frame to the list
#         frames.append(frame)
    
#     # Save the processed frames as a new GIF
#     frames[0].save(save_path, save_all=True, append_images=frames[1:], loop=img.info['loop'], duration=img.info['duration'], disposal=2)

# Example usage
# black_to_transparent_gif('consistency.gif', 'consistency_transparent.gif', threshold=3)




import cv2
from PIL import Image
import numpy as np

def process_frame(frame, threshold=3):
    # Convert the frame (NumPy array) to a PIL image
    pil_image = Image.fromarray(frame).convert("RGBA")
    
    # Get the frame data
    data = pil_image.getdata()
    
    # Create a new list to hold the updated image data
    new_data = []
    
    # Loop through the data and set near-black pixels to transparent
    for item in data:
        # Calculate the brightness of the pixel (R, G, B)
        brightness = (item[0] + item[1] + item[2]) / 3
        
        # Check if the pixel is near black based on the threshold
        if brightness < threshold:
            # Set the pixel to transparent
            new_data.append((0, 0, 0, 0))  # RGBA: fully transparent
        else:
            # Keep the pixel as is
            new_data.append(item)
    
    # Update the image data
    pil_image.putdata(new_data)
    
    # Convert the PIL image back to a NumPy array (discard alpha channel)
    return np.array(pil_image)[:, :, :3]  # Only RGB for saving back to MP4

def black_to_transparent_video(input_video_path, output_video_path, threshold=3):
    # Open the input video
    cap = cv2.VideoCapture(input_video_path)
    
    # Get video properties
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    # Define the codec and create a VideoWriter object to save the output video
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # 'mp4v' codec
    out = cv2.VideoWriter(output_video_path, fourcc, fps, (width, height))

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        # Process the current frame to make near-black pixels transparent
        processed_frame = process_frame(frame, threshold)
        
        # Ensure that the processed frame has the correct dimensions
        processed_frame = cv2.resize(processed_frame, (width, height))
        
        # Write the processed frame to the output video
        out.write(processed_frame)
    
    # Release video objects
    cap.release()
    out.release()
    

    
# Example usage
black_to_transparent_video('EQA1.mp4', 'EAQ1_transparent.mp4', threshold=3)
