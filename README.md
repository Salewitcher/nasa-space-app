# Nasa Space App
## A web application that utilises NASA's Open APIs

---

## Project Setup

### Backend Setup
1. Navigate to the backend folder:
2. Install dependencies:
3. Start the server:
4. Visit `http://localhost:5000` to confirm the server is running.

---

## User Stories

### Epic: Backend Setup
- **Story:** As a user, I want to have a running backend server that I can connect to from the frontend so I can fetch and display NASA data.
- **Acceptance Criteria:** Server is running at `http://localhost:5000` and responds on the root route.

- **Story:** As a developer, I want to fetch NASA's Astronomy Picture of the Day data from the backend so that the frontend can later display this space-related content.
- **Acceptance Criteria:** Visiting `http://localhost:5000/apod` successfully returns JSON data from NASA's APOD API.