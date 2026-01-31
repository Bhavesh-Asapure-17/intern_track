import { attendance } from "@/lib/data";

export async function POST(req) {
  const { internId, date } = await req.json();

  const exists = attendance.find(
    a => a.internId === internId && a.date === date
  );

  if (exists) {
    return Response.json(
      { message: "Attendance already marked" },
      { status: 400 }
    );
  }

  attendance.push({ internId, date, status: "Present" });
  return Response.json({ message: "Attendance marked" });
}

export async function GET() {
  return Response.json(attendance);
}
