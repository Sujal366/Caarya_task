# 📚 Caarya Task - Bookmark Manager App

A simple React + Vite application to manage and organize bookmarks efficiently, developed as part of a task from Caarya.

---

## 🚀 Development Approach

- **Component-Driven Development**: UI broken down into reusable, isolated components for flexibility and reusability.
- **State Management**: React's built-in state via `useState` and `useEffect` hooks, allowing local and dynamic updates.
- **Modular Codebase**: Logic is separated cleanly from UI for easier future maintenance and scaling.
- **Responsive UI**: Effort made to ensure mobile-friendliness with Flexbox and grid usage.

---

## 🔧 Features

- ✅ Add, view, edit and delete bookmarks
- ✅ Group links under custom-defined sections or categories
- ✅ Fuzzy search across saved links using tags, titles, or notes
- ✅ Switch between different view modes(Active, Read-later, Archived)
- ✅ Support export of links and notes (e.g., JSON or CSV)
- ✅ View saved content in a clear, intuitive, and responsive layout
- ✅ Uses local storage to save bookmark data on user browser throughout sessions
- ✅ Docker support for easy containerized deployment

---

## 📁 Folder / Component Structure
```
Caarya_task/
├── public/ # Static assets
│
├── src/
│ ├── assets/ # Images, icons, etc.
│ ├── components/ # Reusable components
│ │ ├── Bookmark.jsx/ # Displays each bookmark
│ │ ├── ExportButton.jsx/ # Export Button
│ │ ├── Popup.jsx/ # Popup window for adding bookmarks
│ │
│ ├── App.jsx # Main app component
│ ├── main.jsx # Entry point
│ └── index.css # Global styles
│
├── Dockerfile # Docker configuration for production
├── .gitignore
├── README.md
├── package.json
└── vite.config.js
```
---
## 🖼 Screenshots
<img width="1440" height="753" alt="image" src="https://github.com/user-attachments/assets/c9a7c51d-5673-424d-ad6b-ae99bb15e7ed" />
<img width="1440" height="753" alt="image" src="https://github.com/user-attachments/assets/df3caf09-fdcb-4364-b85e-e338003e6115" />

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Sujal366/Caarya_task
cd Caarya_task
```

### 2️⃣ Install Dependencies

```sh
cd ../bookmark-app
npm install
```

### 3️⃣ Start the Application

```sh
cd bookmark-app
npm run dev
```

### 4️⃣ Open in Browser
Go to `http://localhost:5173` to see the application in action.

---

## 💡 With More Time, I Would:

- 💾 **Backend Integration**: Add an Express.js server with MongoDB to persist bookmarks.
- 🌐 **User Authentication**: Add login functionality to make it a personal cloud-based bookmark manager.
- 🎨 **Improved Design**: Polish UI/UX with a design system like Tailwind or Material UI.
- 📥 **Import Feature**: Allow users to restore their bookmark list.

---

## 🐳 Run with Docker

```
docker build -t bookmark-app .
docker run -p 5173:5173 bookmark-app
```
