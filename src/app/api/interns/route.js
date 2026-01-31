import { prisma } from "@/lib/prisma";

/**
 * GET /api/interns
 * Fetch all interns
 */
export async function GET() {
  const interns = await prisma.intern.findMany({
    orderBy: { name: "asc" },
  });

  return Response.json(interns);
}
