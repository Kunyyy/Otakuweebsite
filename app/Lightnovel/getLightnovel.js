'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getLightnovel() {
    
    try {
        const lightnovel = await prisma.lightnovel.findMany();
    
        return {
            lightnovels: lightnovel
        };
    } finally {
        await prisma.$disconnect();
    }
    
}