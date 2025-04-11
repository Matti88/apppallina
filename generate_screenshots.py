from PIL import Image, ImageDraw

def create_screenshot(width, height, is_desktop=True):
    # Create a new image with white background
    image = Image.new('RGB', (width, height), 'white')
    draw = ImageDraw.Draw(image)
    
    # Calculate ball size and position
    ball_size = 80  # Same as in CSS
    ball_x = ball_size  # A bit from the left
    ball_y = ball_size  # A bit from the top
    
    # Draw the red ball
    draw.ellipse([
        ball_x - ball_size/2,
        ball_y - ball_size/2,
        ball_x + ball_size/2,
        ball_y + ball_size/2
    ], fill='#FF0000')  # Red color as in CSS
    
    return image

# Generate desktop screenshot (landscape)
desktop = create_screenshot(1920, 1080, True)
desktop.save('screenshot-desktop.png')

# Generate mobile screenshot (portrait)
mobile = create_screenshot(1080, 1920, False)
mobile.save('screenshot-mobile.png')