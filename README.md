# Spot the Difference Game

A configurable "Spot the Difference" game built with HTML, CSS, and JavaScript.

## Features

- Two images displayed side-by-side
- Click to identify differences
- Real-time scoring
- Timer
- Responsive design for mobile devices
- JSON-based configuration
- Visual feedback when differences are found

## How to Run

1. Clone this repository
2. Place your images in the `images` directory
3. Update the `config.json` file with your image paths and difference coordinates
4. Open `index.html` in a web browser

## Configuration

The game is configured through the `config.json` file:

```json
{
    "gameTitle": "Spot the Difference - Animals",
    "images": {
        "image1": "images/image1.jpg",
        "image2": "images/image2.jpg"
    },
    "differences": [
        { "x": 100, "y": 200, "width": 50, "height": 50 },
        { "x": 300, "y": 150, "width": 40, "height": 40 },
        { "x": 500, "y": 300, "width": 30, "height": 30 }
    ]
}
```

### Configuration Fields

- `gameTitle`: The title of the game
- `images`: Paths to the two images to compare
- `differences`: Array of difference areas, each containing:
  - `x`: X coordinate of the difference
  - `y`: Y coordinate of the difference
  - `width`: Width of the difference area
  - `height`: Height of the difference area

## How It Works

1. The game loads the configuration from `config.json`
2. Images are displayed side-by-side
3. When a player clicks on a difference:
   - A green circle is drawn around the found difference
   - The score is updated
   - If all differences are found, a completion message is shown
4. The timer tracks how long it takes to find all differences

## Mobile Support

The game is fully responsive and works on mobile devices. On smaller screens, the images will stack vertically for better visibility.

## Deployment

This game can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages. #   S p o t T h e D f f e r e n c e  
 