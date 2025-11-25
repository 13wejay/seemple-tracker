# 📊 Project Tracker

A modern, fully-featured project management application with Kanban board, Timeline (Gantt chart), and Calendar views. Built with vanilla HTML, CSS, and JavaScript - no frameworks required!

![Project Tracker](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Three Powerful Views
- **Kanban Board**: Drag-and-drop task cards with customizable columns
- **Timeline View**: Gantt-style timeline with daily/weekly/monthly modes
- **Calendar View**: Monthly calendar with task visualization

### 🎨 Rich Functionality
- ✅ Create, edit, and delete tasks with full details
- 🎨 Custom projects with color coding
- 🏷️ Priority levels (Low, Medium, High)
- 📅 Date range tracking with visual progress bars
- 👤 Assignee management
- 🏷️ Tag support
- 💾 LocalStorage persistence - your data stays safe!

### 🚀 Modern UI/UX
- 📱 Fully responsive design
- 🎭 Custom dialog system (no browser alerts!)
- 🔔 Toast notifications for user feedback
- 🖱️ Drag-and-drop for tasks and columns
- ✏️ Inline editing for column names
- 📌 Sticky headers for better navigation
- 🎨 Modern gradient and shadow effects

## 🖥️ Demo

**Live Demo**: [View Project Tracker](https://your-username.github.io/task-tracker)

## 📦 Installation

### Option 1: Clone the Repository
```bash
git clone https://github.com/your-username/task-tracker.git
cd task-tracker
```

### Option 2: Download ZIP
Download the repository as a ZIP file and extract it.

### Option 3: Use as Template
Click the "Use this template" button on GitHub to create your own repository.

## 🚀 Usage

### Local Development
Simply open `index-new.html` in your web browser:
```bash
# Using default browser
open index-new.html  # macOS
start index-new.html # Windows
xdg-open index-new.html # Linux
```

### With Live Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server extension
# Right-click on index-new.html and select "Open with Live Server"
```

Then navigate to `http://localhost:8000`

## 📁 Project Structure

```
task-tracker/
├── css/
│   └── styles.css          # All styling
├── js/
│   └── app.js             # Application logic
├── index-new.html         # Main HTML file
├── index.html            # Original single-file version (legacy)
├── README.md             # This file
└── .gitignore           # Git ignore rules
```

## 🎮 How to Use

### Creating Tasks
1. Click **"+ New Task"** button in the header
2. Fill in the task details (title, project, dates, etc.)
3. Click **"Save Task"** to create

### Managing Views
- Switch between **Kanban**, **Timeline**, and **Calendar** using the tabs
- Timeline view supports **Daily**, **Weekly**, and **Monthly** modes
- Calendar view has month picker and navigation buttons

### Kanban Features
- **Drag tasks** between columns to change status
- **Drag columns** to reorder them
- **Edit column names** by clicking on them
- **Delete columns** using the × button (tasks will be removed)
- **Add new columns** using the slim + button on the right

### Timeline Features
- Visual progress bars show task completion
- Filter by project using the dropdown
- "Today" marker shows current date
- Click on any bar to edit the task

### Calendar Features
- Click any day to see all tasks for that date
- Today's date is highlighted in blue
- Task pills show project colors

## 🎨 Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
  --primary: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  /* ... more variables */
}
```

### Sample Data
The app comes with sample data. To start fresh:
1. Open browser Developer Tools (F12)
2. Go to Application → Local Storage
3. Delete `projectTrackerData`
4. Refresh the page

## 🛠️ Technology Stack

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **Vanilla JavaScript (ES6+)**: No frameworks or libraries
- **LocalStorage API**: Data persistence
- **Drag and Drop API**: Interactive task and column management

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 🚀 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source: `main` branch
4. Your site will be live at `https://your-username.github.io/task-tracker`

### Netlify
1. Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your site is live instantly!

### Vercel
```bash
npm i -g vercel
vercel
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Website: [your-website.com](https://your-website.com)

## 🙏 Acknowledgments

- Icons: Emoji (built-in)
- Font: System font stack
- Inspiration: Modern project management tools

## 📸 Screenshots

### Kanban View
Organize tasks with drag-and-drop columns

### Timeline View
Visualize project schedules with Gantt-style timeline

### Calendar View
Track deadlines with monthly calendar view

---

**Made with ❤️ using vanilla JavaScript**

⭐ If you like this project, please consider giving it a star on GitHub!
