import { activities } from "@/lib/data";

export async function POST(req) {
  const data = await req.json();

  const exists = activities.find(
    a => a.internId === data.internId && a.date === data.date
  );

  if (exists) {
    return Response.json(
      { message: "Activity already submitted" },
      { status: 400 }
    );
  }

  activities.push(data);
  return Response.json({ message: "Activity submitted" });
}

export async function GET() {
  return Response.json(activities);
}
