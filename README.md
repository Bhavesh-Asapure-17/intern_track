📘 Intern Track<br>
Intern Track is a web-based intern management system built using Next.js App Router, React, Tailwind CSS, and Next.js API Routes.<br>
It allows interns to mark attendance and submit daily activity logs, while administrators can monitor intern records through a centralized dashboard.<br>

🚀 Tech Stack<br>
Frontend: Next.js (App Router), React<br>
Styling: Tailwind CSS<br>
Backend: Next.js API Routes<br>
State Handling: In-memory storage (session-based)<br>

✅ Features Implemented<br>

👨🎓 Intern Module<br>
Mark daily attendance (restricted to once per day)<br>
Submit daily activity logs including:<br>
Tasks worked on<br>
Hours spent<br>
Optional blockers<br>
View personal activity history<br>

👨💼 Admin Module<br>
View list of all interns<br>
View attendance records<br>
Review all activity logs submitted by interns<br>

🧩 General Features<br>
Dashboard-based UI with role-specific pages<br>
REST-style API integration<br>
Clean and consistent UI using Tailwind CSS<br>
In-memory data handling for demo purposes<br>

📂 Folder Structure
```
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

```

🔗 API Details<br>
All backend functionality is implemented using Next.js API Routes.

📌 Attendance API
```md
GET /api/attendance
Fetches all attendance records

POST /api/attendance
Marks attendance for an intern
```
Restriction: Attendance can be marked only once per intern per day
```json
{
  "internId": "1",
  "date": "YYYY-MM-DD"
}
```
📌 Activity API
```md
GET /api/activity
Fetches all submitted activity logs

POST /api/activity
Submits daily activity log
```
Restriction: Only one activity log per intern per day
```json
{
  "internId": "1",
  "date": "YYYY-MM-DD",
  "tasks": "Worked on UI",
  "hours": 8,
  "blockers": "None"
}
```
📌 Intern API
```md
GET /api/interns
Fetches the list of interns
```
⚠️ Assumptions Made<br>
Authentication is simulated (no real login system)<br>
Intern identity is hardcoded for demonstration<br>
Only basic validation is implemented<br>
Mobile-first optimization is not mandatory<br>

🧠 Design & Architectural Decisions<br>
Used Next.js App Router for modular routing<br>
API logic separated from UI for clean architecture<br>
Tailwind CSS with global base styling to reduce repetition<br>
Reusable dashboard layout for both intern and admin roles<br>

🚀 Conclusion<br>
Intern Track demonstrates a clean, modular, and API-driven approach to building a role-based dashboard system using Next.js.<br>
The project fulfills all core requirements while maintaining clarity, scalability, and ease of future enhancement.<br>



