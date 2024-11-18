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



from PIL import Image, ImageSequence

def black_to_transparent_gif(image_path, save_path, threshold=3):
    # Open the GIF image
    img = Image.open(image_path)
    
    # Create a list to hold the processed frames
    frames = []
    
    # Loop over each frame in the GIF
    for frame in ImageSequence.Iterator(img):
        # Convert frame to RGBA for transparency support
        frame = frame.convert("RGBA")
        
        # Get the frame's image data
        data = frame.getdata()
        
        # Create a new list to hold the updated image data for the frame
        new_data = []
        
        # Loop through the data and set near-black pixels to transparent
        for item in data:
            # Calculate the brightness of the pixel (R, G, B)
            brightness = (item[0] + item[1] + item[2]) / 3
            
            # Check if the pixel is near black based on the threshold
            if brightness < threshold:
                # Set the pixel to transparent
                new_data.append((0, 0, 0, 0))
            else:
                # Keep the pixel as is
                new_data.append(item)
        
        # Update the frame's image data
        frame.putdata(new_data)
        
        # Append the processed frame to the list
        frames.append(frame)
    
    # Save the processed frames as a new GIF
    frames[0].save(save_path, save_all=True, append_images=frames[1:], loop=img.info['loop'], duration=img.info['duration'], disposal=2)

# Example usage
black_to_transparent_gif('consistency.gif', 'consistency_transparent.gif', threshold=3)
