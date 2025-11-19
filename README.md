# Zygo - Enterprise Mobile Gaming Application

A professional-grade React Native mobile gaming application featuring four engaging puzzle games with a comprehensive leaderboard system.

![React Native](https://img.shields.io/badge/React%20Native-0.82.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.0.0-purple)

## 🎮 Featured Games

### 1. Tango (Sun & Moon Puzzle)
Fill the grid with suns ☀️ and moons 🌙 following these rules:
- No more than 2 of the same symbol adjacent
- Equal numbers of suns and moons in each row/column
- Tap cells to cycle through symbols

### 2. Queens Puzzle  
Place queens 👑 on a colored grid:
- Exactly one queen per row, column, and color region
- Queens cannot touch each other (including diagonally)
- Tap once for X, twice for queen

### 3. Mini Sudoku (6x6)
Classic Sudoku with a twist:
- 6x6 grid with 2x3 blocks
- Fill with numbers 1-6
- Standard Sudoku rules apply

### 4. Tango Connect
Connect the dots in order:
- Draw paths from 1→2→3→4...
- Fill every cell in the grid
- Paths cannot cross themselves

## ✨ Features

- 🎯 **Four Complete Puzzle Games** - Each with unique gameplay mechanics
- ⏱️ **Real-time Timer** - Track your solving time
- 🔢 **Move Counter** - Monitor your efficiency
- ↩️ **Undo/Redo** - Correct mistakes without penalty
- 💡 **Hint System** - Get help when stuck
- 🏆 **Leaderboard** - Compare scores with others
- 💾 **Auto-save** - Never lose your progress
- 🎚️ **Difficulty Levels** - Easy, Medium, and Hard modes
- 📳 **Haptic Feedback** - Tactile response for interactions

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20
- npm or yarn
- React Native development environment

### Installation

```bash
# Clone the repository
git clone https://github.com/Mohan-3410/zygo.git
cd zygo

# Install dependencies
npm install

# Install iOS dependencies (Mac only)
cd ios && pod install && cd ..
```

### Running the Application

```bash
# iOS
npm run ios

# Android
npm run android

# Start Metro Bundler
npm start
```

## 🧪 Development

```bash
# Linting
npm run lint

# Type Checking
npx tsc --noEmit
```

## 📦 Tech Stack

- **React Native** 0.82.1 - Mobile framework
- **TypeScript** 5.8.3 - Type safety
- **Redux Toolkit** 2.0.0 - State management
- **React Navigation** 7.0.0 - Routing and navigation
- **AsyncStorage** 2.1.0 - Local data persistence
- **React Native Gesture Handler** - Touch gestures
- **React Native Reanimated** - Smooth animations

## 🎨 Design Philosophy

- **Clean Architecture** - Separation of concerns
- **Component Reusability** - DRY principles
- **Type Safety** - 100% TypeScript
- **Performance** - Optimized rendering
- **User Experience** - Intuitive interactions

## 📱 Platform Support

- ✅ iOS 13.0+
- ✅ Android 6.0+ (API 23+)

---

**Note**: This is a complete, production-ready implementation featuring clean code, comprehensive state management, and professional game mechanics.
