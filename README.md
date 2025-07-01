# NASA Space App

A web application that utilises NASA's Open APIs to showcase space-related data in an interactive and visually engaging way.

---

## Features

- Fetch and display NASA's Astronomy Picture of the Day (APOD)  
- Fetch and display Mars Rover photos from NASA's Mars Rover Photos API  
- Fetch and display Earth images from NASA's EPIC API  
- Fetch and display Near Earth Objects (NEO) data from NASA's NeoWs API  
- Backend server using Node.js and Express to handle NASA API requests  
- React frontend to display space data  
- CORS enabled for seamless communication between frontend and backend  
- Organized project structure separating frontend and backend  

---

## Technologies Used

- **Frontend:** React, Axios  
- **Backend:** Node.js, Express, Axios, CORS  
- **APIs:** NASA Open APIs (APOD, Mars Rover Photos, EPIC, NeoWs)  

---

## Project Setup

### Backend Setup

1. Open your terminal and navigate to the backend folder: `cd backend`  

2. Install all backend dependencies: `npm install`  

3. Start the backend server: `npm start`  

4. Go to your browser and visit: `http://localhost:5000`  

You should see a message confirming the backend is running.

---

### Frontend Setup

1. In a new terminal window, navigate to the frontend folder: `cd frontend`  

2. Install all frontend dependencies: `npm install`  

3. Start the React development server: `npm start`  

4. Go to your browser and visit: `http://localhost:3000`  

You should now see the NASA Space App running.

---

## API Routes

### Backend API Endpoints

- `GET /`  
Returns a simple confirmation message that the backend server is running.

- `GET /apod`  
Fetches NASA's Astronomy Picture of the Day (APOD) and returns the data as JSON.

- `GET /mars-photos`  
Fetches photos from NASA's Mars Rover Photos API with support for filters and pagination.

- `GET /epic`  
Fetches Earth images from NASA's Earth Polychromatic Imaging Camera (EPIC) API with pagination.

- `GET /neo`  
Fetches Near Earth Object (NEO) data for the current date from NASA's NeoWs API with pagination.

---

## Deployment

The application is deployed using the following services:

- **Backend:** Deployed on [Heroku](https://www.heroku.com/)  
  URL: `https://nasa-ap-backend-89d5cf16104b.herokuapp.com/`

- **Frontend:** Deployed on [Vercel](https://vercel.com/)  
  URL: *(https://nasa-frontend-kappa.vercel.app/)*

Make sure the frontend environment variable `REACT_APP_API_BASE_URL` is set to your backend URL (without trailing slash or `/api` suffix) to avoid URL duplication issues.

---

## Usage

- Use the frontend interface to explore various NASA data such as daily space pictures, Mars rover photos, Earth images, and Near Earth Objects.
- Filters and pagination controls are available on applicable endpoints for better user experience.
- If you run the project locally, make sure your `.env` files contain your NASA API key and backend URL properly configured.

---

## Folder Structure



nasa-space-app/
│
├── backend/
│ ├── __tests__
│ ├── node_modules/
│ ├── routes
│ ├── .env
│ ├── .gitignore
│ ├── Procfile
│ ├── server.js
│ └── package.json
│
└── frontend/
|  ├── node_modules/
|  ├── public/
|  ├── src/
|  │ ├── .env.production
|  │ ├── .gitignore
|  └── package.json
└──README.md

---

## Tests

- Backend tests are implemented using **Jest**, **Supertest**, and **Nock** to verify API endpoints and error handling.
- Frontend tests can be added with **Jest** and **React Testing Library** (not included in this version but planned as future work).
- Run backend tests with:  
  ```bash
  npm test

---

---

## Bug Fixes

- Fixed CORS issues by restricting allowed origins and properly configuring CORS middleware on the backend.

- Resolved API route path duplication to prevent 404 errors on frontend fetch requests.

- Addressed environment variable misconfiguration to ensure NASA API key and backend URLs are correctly loaded.

- Added error handling to gracefully manage failed API calls and provide user feedback.

---

## Notes

- This project follows Agile methodology using GitHub Projects to track epics and user stories.  
- Regular commits are made to document each development step.
