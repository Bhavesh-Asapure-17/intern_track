import { prisma } from "@/lib/prisma";

/**
 * GET /api/activity
 * Fetch all activity logs
 */
export async function GET() {
  const activities = await prisma.activity.findMany({
    orderBy: { date: "desc" },
  });

  return Response.json(activities);
}

/**
 * POST /api/activity
 * Submit daily activity log
 */
export async function POST(req) {
  const { internId, date, tasks, hours, blockers } = await req.json();

  try {
    await prisma.activity.create({
      data: {
        internId,
        date,
        tasks,
        hours: Number(hours),
        blockers: blockers || null,
      },
    });

    return Response.json({ message: "Activity logged successfully" });
  } catch (error) {
    return Response.json(
      { message: "Activity already submitted for today" },
      { status: 400 }
    );
  }
}
