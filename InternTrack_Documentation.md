# Intern Track - Project Documentation

## 1. Project Overview

**Intern Track** is a comprehensive web-based management system designed to streamline the tracking of intern activities and attendance. Intern Track provides a unified digital interface for daily logging and administrative oversight, replacing manual spreadsheets and scattered messages.

**Key Objectives:**
*   **For Interns:** Provide a simple, intuitive interface to mark attendance and log daily work activities.
*   **For Admins:** Enable centralized monitoring of all interns' status, attendance history, and work logs.
*   **Scalability:** Built with a production-ready database layer, allowing for reliable data persistence and history tracking.

---

## 2. System Architecture

The application is built using a modern **client-server architecture** within the Next.js framework, leveraging Server-Side Rendering (SSR) and API routes.

### High-Level Architecture
*   **Frontend (Client):** React components (Next.js App Router) that render the UI and handle user interactions.
*   **Backend (API Layer):** Next.js API Routes (`src/app/api/*`) serve as the RESTful backend, handling data processing and database interactions.
*   **Data Layer:** **PostgreSQL** database accessed via **Prisma ORM**, providing robust data persistence, schema validation, and type safety.

### Data Flow
1.  **User Action:** An intern submits a form (e.g., Activity Log).
2.  **API Call:** The client sends a `POST` request to `/api/activity`.
3.  **Processing:** The API route receives the data and uses the Prisma Client to interact with the database.
4.  **Persistence:** Data is securely stored in the PostgreSQL database.
5.  **Response:** The API returns a success message or error to the client.

---

## 3. Technology Stack

### Frontend
*   **Next.js (App Router):** Utilizes the latest Next.js features like Server Components and API Routes.
*   **React:** Used for building interactive, component-based user interfaces.
*   **Tailwind CSS:** A utility-first CSS framework for rapid, consistent, and maintainable styling.
*   **Lucide React:** Icon library for consistent UI iconography.

### Backend & Database
*   **Next.js API Routes:** Serverless-comptaible backend functions.
*   **Prisma ORM:** Modern Object-Relational Mapping tool for Type-safe database access.
*   **PostgreSQL:** Relational database management system for structured data storage.

---

## 4. Application Workflow

### Intern Workflow
1.  **Dashboard Access:** The intern accesses the "Intern Dashboard" (`/intern`).
2.  **Mark Attendance:**
    *   Navigate to "Mark Attendance".
    *   Click "Present" to log attendance.
    *   The system checks for duplicate entries for the current day.
3.  **Log Activity:**
    *   Navigate to "Activity Log".
    *   Enter tasks worked on, hours spent, and any blockers.
    *   Submit the form.

### Admin Workflow
1.  **Overview:** The admin accesses the "Admin Dashboard" (`/admin`) to see a summary of all interns.
2.  **Review Activities:**
    *   Navigate to "Activity Logs".
    *   View a table of all submitted activities, sorted by date.
3.  **Check Attendance:**
    *   Navigate to "Attendance Records".
    *   View a master list of daily attendance.

---

## 5. Features Description

### Attendance Management
Allows interns to mark themselves as "Present". The backend enforces a uniqueness constraint on the `[internId, date]` pair to prevent duplicate attendance logs.

### Activity Logging
A structured form for interns to document their daily work.
*   **Fields:** Date (Auto-filled), Tasks, Hours, Blockers.
*   **Storage:** Saved to the `Activity` table in the database.

### Admin Panels
*   **Intern List:** Displays name and email of all registered interns.
*   **Activity History:** A tabular view of daily work logs from all interns.
*   **Attendance History:** A historical record of presence for all interns.

### Seeding Mechanism
A dedicated API endpoint (`/api/seed`) exists to populate the database with initial intern data for testing/demo purposes.

---

## 6. API Design & Endpoints

### 1. Interns
*   **GET /api/interns**
    *   **Purpose:** Fetch list of all registered interns from the database.
    *   **Response:** JSON array of intern objects.

### 2. Attendance
*   **GET /api/attendance**
    *   **Purpose:** Fetch all attendance records.
*   **POST /api/attendance**
    *   **Purpose:** Mark an intern as present.
    *   **Request:** `{ internId, date, status }`.
    *   **Logic:** Uses `prisma.attendance.create` with constraints to ensure one record per intern per day.

### 3. Activity
*   **GET /api/activity**
    *   **Purpose:** Fetch all activity logs, ordered by date descending.
*   **POST /api/activity**
    *   **Purpose:** Submit a new daily log.
    *   **Request:** `{ internId, tasks, hours, blockers, date }`.

### 4. Admin / System
*   **GET /api/seed**
    *   **Purpose:** Seeds the `Intern` table with initial data (e.g., "Intern 1").
    *   **Use Case:** Run this once after setting up the database to ensure there is a user to test with.

---

## 7. Data Handling & Schema

The project uses a **PostgreSQL** database defined by the following Prisma schema:

### Models
*   **Intern:** `id`, `name`, `email`
*   **Attendance:** `id`, `internId`, `date`, `status`
*   **Activity:** `id`, `internId`, `date`, `tasks`, `hours`, `blockers`

### Relationships
*   `Intern` has a one-to-many relationship with both `Attendance` and `Activity` records.

---

## 8. Project Setup & Installation

Since the project uses a database, additional setup steps are required compared to a static site.

### Prerequisites
*   Node.js & npm
*   PostgreSQL Service (Local or Cloud like Neon/Supabase)

### Setup Steps
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Configure Environment:**
    *   Create a `.env` file in the root directory.
    *   Add your database connection string:
        ```
        DATABASE_URL="postgresql://user:password@localhost:5432/interntrack_db?schema=public"
        ```
3.  **Initialize Database:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```
    *(Note: `prisma db push` syncs the schema with the database without creating migrations, ideal for prototyping).*
4.  **Seed Data:**
    *   Start the server: `npm run dev`
    *   Visit `http://localhost:3000/api/seed` in your browser to create the initial intern.
5.  **Run Application:**
    ```bash
    npm run dev
    ```

---

## 9. Limitations & Future Roadmap

**Current Limitations:**
*   **Authentication:** The system currently simulates user identity via simple role selection or direct URL access. There is no password-based login or session management.
*   **Date Handling:** Dates are currently stored as Strings for simplicity, which may limit advanced time-zone based queries.

**Future Enhancements:**
1.  **NextAuth Integration:** Implement secure login (GitHub/Google) to replace the current simulation.
2.  **Date/Time Objects:** Migrate date fields to native `DateTime` types in Prisma for better analytics.
3.  **Data Visualization:** Add charts to the Admin Dashboard to visualize hours worked over time.
4.  **Profile Management:** Allow interns to update their own profile details.
