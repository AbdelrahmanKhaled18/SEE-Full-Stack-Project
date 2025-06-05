# Athlete Performance Dashboard

## Description

This project is a web application designed to help manage and visualize athlete performance data, including athlete details, associated videos, and performance metrics. The dashboard provides filtering capabilities to easily find relevant information.

## Features

Here are the key features of the application:

1.  **Athlete Management**
    *   Create, update, delete athletes (name, sport, age, unique ID)
    *   List all athletes with basic stats

2.  **Video Upload + Tagging**
    *   Upload a video file (MP4 or MOV)
    *   Tag athlete(s) to the video
    *   Store metadata (upload date, duration, linked athletes)
    *   Mock processing (no real ML) — simulate analysis status (e.g., "Processing", "Complete")

3.  **Performance Recording**
    *   Allow users to manually input performance metrics per video (e.g., "Sprint Time", "Jump Height")
    *   Display metrics in athlete profile with timestamps and video links

4.  **Dashboard View**
    *   Display list of all athletes
    *   Show recent videos per athlete + performance summaries
    *   Filter by sport, date range

## Technology Stack

**Frontend:**

-   React
-   Material UI (for UI components and styling)
-   Axios (for API calls)
-   React Router (for navigation)

**Backend:**

-   Node.js
-   Express (web application framework)
-   Sequelize (ORM for database interaction)
-   PostgreSQL (database)
-   Multer (for file uploads)
-   CORS (for handling Cross-Origin Resource Sharing)

## Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   Node.js (v14 or later recommended)
-   npm or yarn
-   Sequelize CLI (will be installed as a dev dependency)
-   PostgreSQL installed and running

### Backend Setup

1.  Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2.  Install backend dependencies:

    ```bash
    npm install
    ```

3.  Configure your PostgreSQL database connection in `backend/config/config.json`.

4.  Run database migrations to create the necessary tables:

    ```bash
    npx sequelize-cli db:migrate
    ```

5.  Start the backend server:

    ```bash
    npm start
    ```

The backend server should now be running at `http://localhost:5000`.

### Frontend Setup

1.  Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2.  Install frontend dependencies:

    ```bash
    npm install
    ```

3.  Start the frontend development server:

    ```bash
    npm start
    ```

The frontend application should now be accessible at `http://localhost:3000`.

## API Endpoints

Here's a brief overview of the main API endpoints:

**Athletes:**

-   `GET /athletes`: Get all athletes with their associated videos and performance metrics.
-   `POST /athletes`: Create a new athlete.

**Videos:**

-   `GET /videos`: Get all videos with their associated athletes.
-   `POST /videos/upload`: Upload a new video and associate it with athletes.
-   `GET /videos/filter?sport=<sport_name>&startDate=<YYYY-MM-DD>&endDate=<YYYY-MM-DD>`: Filter videos based on associated athlete's sport and video upload date range. (Note: The frontend currently filters athletes, but this endpoint exists if video-specific filtering is needed).

**Metrics:**

-   `GET /metrics`: Get all performance metrics.
-   `POST /metrics`: Add a new performance metric.

## Future Enhancements

-   Implementing user authentication and authorization.
-   Adding more advanced filtering and sorting options on the dashboard.
-   Integrating a video player to watch uploaded videos directly in the application.
-   Developing more sophisticated performance metric analysis and visualization tools.
-   Improving error handling and user feedback. 