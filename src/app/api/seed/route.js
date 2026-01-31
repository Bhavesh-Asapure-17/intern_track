export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function GET() {
    await prisma.intern.createMany({
        data: [
            { id: "1", name: "Bhavesh Asapure", email: "bhavesh@interntrack.com" }
        ],
        skipDuplicates: true,
    });

    return Response.json({ message: "Seeded interns" });
}
