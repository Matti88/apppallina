# Ball Game PWA

A simple Progressive Web App featuring a draggable red ball that can be moved around the screen. The app works both on desktop and mobile devices.

## Features

- Draggable red ball with touch and mouse support
- Contained movement within screen boundaries
- Works offline (PWA)
- Responsive design

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ball-game-pwa.git
```

2. Start the local server:
```bash
python server.py
```

3. Open your browser and navigate to:
- Local: http://localhost:8000
- Network: http://[your-ip]:8000

## Development

The project includes Python scripts to generate assets:
- `generate_icons.py`: Creates app icons in various sizes
- `generate_screenshots.py`: Creates screenshots for the PWA manifest

Run these scripts to regenerate the assets:
```bash
python generate_icons.py
python generate_screenshots.py
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
