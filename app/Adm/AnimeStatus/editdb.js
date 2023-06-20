'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getDB(id) {

    try {
        const databases = await prisma.anime.findFirst({
            where: {
                id: id
            }
        });

        return {
            databases: databases,
        };
    } finally {
        await prisma.$disconnect();
    }
    
}