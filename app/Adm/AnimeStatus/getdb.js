'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getAllanime() {

    try {
        const ongoingAnime = await prisma.anime.findMany();

        return {
            ongoingAnimes: ongoingAnime,
        };
    } finally {
        await prisma.$disconnect();
    }
    
}