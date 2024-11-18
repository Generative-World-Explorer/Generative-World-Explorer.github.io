from PIL import Image

def resize_gif(input_path, output_path, new_size):
    # Open the original GIF file
    with Image.open(input_path) as img:
        frames = []
        try:
            while True:
                # Resize the current frame with the highest quality resampling
                frame = img.resize(new_size, Image.Resampling.LANCZOS)
                frames.append(frame.copy())
                img.seek(img.tell() + 1)
        except EOFError:
            pass  # End of sequence

        # Save the resized GIF with the best quality and original duration
        frames[0].save(output_path, save_all=True, append_images=frames[1:], loop=0, duration=img.info['duration'], optimize=True)

# Loop through 1.gif to 12.gif
for i in range(1, 13):
    input_gif = f'{i}.gif'
    output_gif = f'{i}_resized.gif'
    resize_gif(input_gif, output_gif, (200, 100))

print("All GIFs resized successfully!")
