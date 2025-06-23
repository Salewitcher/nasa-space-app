# NASA Space App

A web application that utilises NASA's Open APIs to showcase space-related data in an interactive and visually engaging way.

---

## Features

- Fetch and display NASA's Astronomy Picture of the Day (APOD)
- Fetch and display Mars Rover photos from NASA's Mars Rover Photos API
- Backend server using Node.js and Express to handle NASA API requests
- React frontend to display space data
- CORS enabled for seamless communication between frontend and backend
- Organized project structure separating frontend and backend

---

## Technologies Used

- **Frontend:** React, Axios
- **Backend:** Node.js, Express, Axios, CORS
- **APIs:** NASA Open APIs (APOD, Mars Rover Photos)

---

## Project Setup

### Backend Setup

1. Open your terminal and navigate to the backend folder: cd backend

2. Install all backend dependencies: npm install

3. Start the backend server: npm start

4. Go to your browser and visit: http://localhost:5000

You should see a message confirming the backend is running.

---

### Frontend Setup

1. In a new terminal window, navigate to the frontend folder: cd frontend

2. Install all frontend dependencies: npm install

3. Start the React development server: npm start

4. Go to your browser and visit: http://localhost:3000

You should now see the NASA Space App running.

---

## API Routes

### Backend API Endpoints

- `GET /`  
Returns a simple confirmation message that the backend server is running.

- `GET /apod`  
Fetches NASA's Astronomy Picture of the Day (APOD) and returns the data as JSON.

- `GET /mars-photos`  
*(Planned feature)* This will fetch photos from NASA's Mars Rover Photos API.

---

## Folder Structure

nasa-space-app/
│
├── backend/
│ ├── node_modules/
│ ├── server.js
│ └── package.json
│
└── frontend/
├── node_modules/
├── public/
├── src/
└── package.json


---

## Notes

- This project follows Agile methodology using GitHub Projects to track epics and user stories.
- Regular commits are made to document each development step.