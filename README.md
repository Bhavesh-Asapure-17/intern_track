📘 Intern Track

Intern Track is a web-based intern management system built using Next.js App Router, React, Tailwind CSS, and Next.js API Routes.

It allows interns to mark attendance and submit daily activity logs, while administrators can monitor intern records through a centralized dashboard.

🚀 Tech Stack
Frontend: Next.js (App Router), React
Styling: Tailwind CSS
Backend: Next.js API Routes
State Handling: In-memory storage (session-based)

✅ Features Implemented

👨🎓 Intern Module
Mark daily attendance (restricted to once per day)
Submit daily activity logs including:
Tasks worked on
Hours spent
Optional blockers
View personal activity history

👨💼 Admin Module
View list of all interns
View attendance records
Review all activity logs submitted by interns

🧩 General Features
Dashboard-based UI with role-specific pages
REST-style API integration
Clean and consistent UI using Tailwind CSS
In-memory data handling for demo purposes

📂 Folder Structure
interntrack/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── attendance/
│   │   │   │   └── route.js
│   │   │   ├── activity/
│   │   │   │   └── route.js
│   │   │   └── interns/
│   │   │       └── route.js
│   │   │
│   │   ├── intern/
│   │   │   ├── dashboard/
│   │   │   │   └── page.js
│   │   │   ├── activity/
│   │   │   │   └── page.js
│   │   │   └── history/
│   │   │       └── page.js
│   │   │
│   │   ├── admin/
│   │   │   ├── interns/
│   │   │   │   └── page.js
│   │   │   ├── attendance/
│   │   │   │   └── page.js
│   │   │   └── activities/
│   │   │       └── page.js
│   │   │
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── globals.css
│   │
│   └── components/
│       ├── layout/
│       │   ├── DashboardLayout.js
│       │   └── Sidebar.js
│       └── ui/
│           ├── Card.js
│           ├── Button.js
│           └── Badge.js
│
├── package.json
├── next.config.mjs
└── README.md

🔗 API Details
All backend functionality is implemented using Next.js API Routes.

📌 Attendance API

GET /api/attendance
Fetches all attendance records

POST /api/attendance
Marks attendance for an intern

Restriction: Attendance can be marked only once per intern per day

{
  "internId": "1",
  "date": "YYYY-MM-DD"
}

📌 Activity API

GET /api/activity
Fetches all submitted activity logs

POST /api/activity
Submits daily activity log

Restriction: Only one activity log per intern per day

{
  "internId": "1",
  "date": "YYYY-MM-DD",
  "tasks": "Worked on UI",
  "hours": 8,
  "blockers": "None"
}

📌 Intern API

GET /api/interns
Fetches the list of interns

⚠️ Assumptions Made
Authentication is simulated (no real login system)
Intern identity is hardcoded for demonstration
Data is stored in-memory and resets on server restart
Only basic validation is implemented
Mobile-first optimization is not mandatory
No database integration is used

🧠 Design & Architectural Decisions
Used Next.js App Router for modular routing
API logic separated from UI for clean architecture
Tailwind CSS with global base styling to reduce repetition
Reusable dashboard layout for both intern and admin roles

🚀 Conclusion

Intern Track demonstrates a clean, modular, and API-driven approach to building a role-based dashboard system using Next.js.
The project fulfills all core requirements while maintaining clarity, scalability, and ease of future enhancement.
