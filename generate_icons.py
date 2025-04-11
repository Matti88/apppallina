from PIL import Image, ImageDraw

def create_icon(size):
    # Create a new image with white background
    image = Image.new('RGB', (size, size), 'white')
    draw = ImageDraw.Draw(image)
    
    # Calculate dimensions for the red circle
    center = size // 2
    radius = size * 0.3  # Circle takes up 60% of the width
    
    # Draw the red circle (Japanese flag design)
    draw.ellipse([
        center - radius,
        center - radius,
        center + radius,
        center + radius
    ], fill='#BC002D')  # Japanese flag red color
    
    return image

# Generate icons in required sizes
sizes = [16, 32, 192, 512]  # Added 16 and 32 for favicon

for size in sizes:
    icon = create_icon(size)
    if size in [16, 32]:
        icon.save(f'favicon-{size}.ico')  # Save as .ico for favicon
    else:
        icon.save(f'icon-{size}.png')  # Save as .png for PWA icons