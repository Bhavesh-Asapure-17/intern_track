import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding interns...");

    await prisma.intern.createMany({
        data: [
            { id: "1", name: "Bhavesh Asapure", email: "bhavesh@interntrack.com" },

        ],
    });

    console.log("Seed complete");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
