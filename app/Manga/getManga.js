'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getManga() {
    
    try {
        const manga = await prisma.manga.findMany();
    
        return {
            mangas: manga
        };
    } finally {
        await prisma.$disconnect();
    }
}