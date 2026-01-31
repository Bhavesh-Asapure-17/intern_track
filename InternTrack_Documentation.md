# Intern Track - Project Documentation

## 1. Project Overview

**Intern Track** is a comprehensive web-based management system designed to streamline the tracking of intern activities and attendance. In many organizations, tracking intern progress is a manual process involving spreadsheets or scattered messages. Intern Track solves this by providing a unified digital interface for daily logging and administrative oversight.

**Key Objectives:**
*   **For Interns:** Provide a simple, intuitive interface to mark attendance and log daily work activities.
*   **For Admins:** enable centralized monitoring of all interns' status, attendance history, and work logs.
*   **Simplicity:** Eliminate complex authentication or database setup requirements for evaluation purposes, focusing on the core functional logic and UI/UX.

---

## 2. System Architecture

The application is built using a modern **client-server architecture** within the Next.js framework.

### High-Level Architecture
*   **Frontend (Client):** React components (Next.js App Router) that render the UI and handle user interactions.
*   **Backend (API Layer):** Next.js API Routes (`src/app/api/*`) serve as the backend, handling data requests and mock business logic.
*   **Data Layer:** An in-memory data store (`src/lib/data.js`) acts as the database for the session.

### Data Flow
1.  **User Action:** An intern submits a form (e.g., Activity Log).
2.  **API Call:** The client sends a `POST` request to `/api/activity`.
3.  **Processing:** The API route receives the data, validates it, and updates the in-memory arrays.
4.  **Response:** The API returns a success message or error, which the client displays to the user.

---

## 3. Technology Stack

### Frontend
*   **Next.js (App Router):** Chosen for its robust routing, server-side rendering capabilities, and seamless API integration.
*   **React:** Used for building interactive, component-based user interfaces.
*   **Tailwind CSS:** A utility-first CSS framework used for rapid, consistent, and maintainable styling without writing custom CSS files.

### Backend
*   **Next.js API Routes:** Provides a serverless-like backend environment within the same project, simplifying deployment and development.

### Styling Strategy
*   **Global Styles (`globals.css`):** Utilizing Tailwind's `@layer base` to standardize HTML elements (`h1`, `input`, `table`), reducing class duplication in components.
*   **Zero-Config Components:** Components like `Card` and `DashboardLayout` are designed to be minimal and reusable, relying on the central theme.

---

## 4. Application Workflow

### Intern Workflow
1.  **Dashboard Access:** The intern accesses the "Intern Dashboard" (`/intern`).
2.  **Mark Attendance:**
    *   Navigate to "Mark Attendance".
    *   Click "Present" to log attendance for the day.
    *   Getting instant feedback on success.
3.  **Log Activity:**
    *   Navigate to "Activity Log".
    *   Enter tasks worked on, hours spent, and any blockers.
    *   Submit the form. (Validations ensure hours > 0 and tasks are not empty).

### Admin Workflow
1.  **Overview:** The admin accesses the "Admin Dashboard" (`/admin`) to see a summary of all interns.
2.  **Review Activities:**
    *   Navigate to "Activity Logs".
    *   View a table of all submitted activities, sorted by date strings or order of submission.
3.  **Check Attendance:**
    *   Navigate to "Attendance Records".
    *   View a master list of who was present on which date.

---

## 5. Features Description

### Attendance Management
Allows interns to mark themselves as "Present". The system prevents duplicate entries for the same intern on the same day.

### Activity Logging
A structured form for interns to document their daily work.
*   **Fields:** Date (Auto-filled), Tasks, Hours, Blockers.
*   **Validation:** Prevents submission of empty tasks or invalid hours.

### Admin Panels
*   **Intern List:** Displays name, email, and department.
*   **Activity History:** A tabular view of what every intern has been working on.
*   **Attendance History:** A historical record of presence.

### Role-Based UI (Simulated)
The application simulates two distinct layouts/menus based on the `role` prop passed to the `DashboardLayout`, showing only relevant links (e.g., Interns don't see "Intern List").

---

## 6. API Design & Endpoints

### 1. Interns
*   **GET /api/interns**
    *   **Purpose:** Fetch list of all registered interns.
    *   **Response:** JSON array of intern objects `{ id, name, email, department }`.

### 2. Attendance
*   **GET /api/attendance**
    *   **Purpose:** Fetch all attendance records.
    *   **Response:** JSON array of entries `{ id, internId, date, status }`.
*   **POST /api/attendance**
    *   **Purpose:** Mark an intern as present.
    *   **Request:** `{ internId, date, status }`.
    *   **Logic:** Checks if a record already exists for this intern/date to prevent duplicates.

### 3. Activity
*   **GET /api/activity**
    *   **Purpose:** Fetch all submitted activity logs.
    *   **Response:** JSON array of logs `{ id, internId, tasks, hours, date }`.
*   **POST /api/activity**
    *   **Purpose:** Submit a new daily log.
    *   **Request:** `{ internId, tasks, hours, blockers, date }`.
    *   **Logic:** Validates input fields before saving.

---

## 7. UI & Styling Strategy

The project adopts a **"Semantic & Minimalist"** styling strategy.

*   **Global Standardization:** Instead of `className="text-2xl font-bold"` on every header, `h1` is styled globally in `globals.css`.
*   **Semantic HTML:** Pages use standard `<label>`, `<input>`, `<table>` tags which automatically inherit premium styles from the base layer.
*   **Utility Abstraction:** A single `.ui-card` utility manages all containers, ensuring consistent borders, shadows, and padding across the app.
*   **Palette:** Uses `Slate` (neutrals) for structure and `Indigo` for actions/focus states, providing a clean, "Dashboard SaaS" aesthetic.

---

## 8. Data Handling

**In-Memory Storage:**
Data is stored in JavaScript arrays exported from `src/lib/data.js`. Use of `let` allows these arrays to be modified during the runtime of the server application.

*   **Reason:** This approach removes the complexity of setting up a SQL/NoSQL database for a prototype/demo application, allowing immediate "plug-and-play" evaluation.
*   **Behavior:** Data persists as long as the Next.js development server is running. Restarting the server resets data to the initial state.

---

## 9. Limitations

1.  **Persistence:** Since data is in-memory, all new entries are lost upon server restart.
2.  **Authentication:** There is no real login system (JWT/Session). Users typically "enter" as a specific role by visiting the URL directly.
3.  **Concurrency:** In-memory arrays are not thread-safe for high-scale production use, though perfectly adequate for this single-user demo.

---

## 10. Future Enhancements

1.  **Database Integration:** Connect to PostgreSQL or MongoDB to persist records permanently.
2.  **Auth.js (NextAuth):** Implement secure GitHub/Google login to identify actual users.
3.  **Search & Filtering:** Add client-side search to filter intern activities by date or name.
4.  **Analytics:** Add a chart view for admins to visualize "Total Hours Worked" per week.

---

## 11. Conclusion

**Intern Track** successfully demonstrates a modern, efficient approach to building internal tools with Next.js. By leveraging Server Side Rendering and API Routes, it bundles a complete full-stack application into a single deployable unit. The aggressive styling optimization ensures the code remains clean and maintainable, serving as an excellent reference for how to build professional administrative dashboards with minimal overhead.
