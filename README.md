# Tic-Tac-Toe

## Overview

This project is a browser-based **Tic-Tac-Toe** game implemented using **HTML**, **CSS**, and **JavaScript**, with an optional **Flask** backend. The game offers two modes: **1P (Player vs. Computer)** and **2P (Player vs. Player)**. Each mode maintains its own separate score history, providing a fair distinction between solo play against AI and competitive play between two human players.

---

## Features

### 1. Two Distinct Modes
- **1P (Player vs. Computer)**: Face off against a simple AI opponent.
- **2P (Player vs. Player)**: Two players take turns on the same device.

### 2. Clean, Dark-Themed UI
- High-contrast board and large, bold X and O marks.
- Simple, minimalist design focused on gameplay clarity.

### 3. Score Tracking
- Separate score history for each mode:
  - **1P Mode**: Player (X), Tie, Computer (O)
  - **2P Mode**: Player 1 (X), Tie, Player 2 (O)
- Scores persist locally via `localStorage`.

### 4. Optional Backend
- A Flask server (if running `app.py`) can handle result saving or be extended for additional logic.
- If you prefer, you can run the game by simply opening `index.html` without the backend.

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
   cd tic-tac-toe
(Optional) Install dependencies: If using the Flask backend:
pip install -r requirements.txt
Run the Flask server (optional):
python app.py

---

## File Structure

```
├── backend/
│   └── app.py               # Flask application (optional)
├── frontend/
│   ├── index.html           # Main HTML file
│   ├── style.css            # Styles for the game
│   └── script.js            # Game logic and interactions
└── requirements.txt          # Dependencies for Flask (if needed)
```

---

## How to Play

1. **Choose your mode**:
   - 1P: Click the 1P icon to play against the computer.
   - 2P: Click the 2P icon to play against another player locally.

2. **Gameplay**:
   - Player X always goes first.
   - Click on an empty cell to place your mark (X or O).
   - In 1P mode, wait for the computer to make its move before you go again.
3. **Winning & Scoring**:
   - Get three in a row (horizontal, vertical, or diagonal) to win.
   - If all cells are filled with no winner, it’s a tie.
   - Scores for each mode are updated separately and persist through sessions.
4. **Reset**:
   - Click the reset button to clear the board.
   - Scores remain unless you clear localStorage.

---

## Technologies Used
- **Frontend**:
    - HTML, CSS, JavaScript
- **Backend**:
    - Python (3.x)
    - Flask
    - Flask-Cors (if needed)
- **Storage**:
    - localStorage for persistent score tracking

---

## Possible Improvements
1. **AI Upgrades**: Make the computer more challenging with smarter decision-making.
2. **Online Multiplayer**: Connect players from different devices.
3. **Mobile Responsiveness**: Enhance layout for smaller screens.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.


---

## Acknowledgments
Inspired by classic Tic-Tac-Toe and improved for ease of use, this project serves as a practical demonstration of web development techniques, game logic implementation, and local data persistence.
