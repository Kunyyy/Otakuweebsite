'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function updateDB(id, title, alias, jp, deskripsi) {

    try {
        const databases = await prisma.anime.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: title, 
                alias: alias, 
                jpname: jp,
                description: deskripsi
            }
        });

        if (databases) {
            return true;
        } else {
            return false;
        }
    } finally {
        await prisma.$disconnect();
    }
    
}