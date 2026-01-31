import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/attendance
 * Fetch all attendance records
 */
export async function GET() {
  const records = await prisma.attendance.findMany({
    orderBy: { date: "desc" },
  });

  return Response.json(records);
}

/**
 * POST /api/attendance
 * Mark attendance for an intern on a given date
 */
export async function POST(req) {
  const { internId, date } = await req.json();

  try {
    await prisma.attendance.create({
      data: {
        internId,
        date,
        status: "Present",
      },
    });

    return Response.json({ message: "Attendance marked successfully" });
  } catch (error) {
    return Response.json(
      { message: "Attendance already marked for today" },
      { status: 400 }
    );
  }
}
