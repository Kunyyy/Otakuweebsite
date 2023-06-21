'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getAnime() {

    try {
        const completedanime = await prisma.anime.findMany({
            orderBy: {
                updatedAt: 'desc'
            },
            take: 12
        })

        const ongoingAnime = await prisma.anime.findMany({
            where: {
                status: "Ongoing"
            },
            orderBy: {
                updatedAt: 'desc'
            },
            take: 12
        });

        const anime = await prisma.anime.findMany({
            orderBy: {
                updatedAt: 'desc'
            },
            take: 6
        });

        return {
            completedanimes: completedanime,
            ongoingAnimes: ongoingAnime,
            animes: anime
        };
    } finally {
        await prisma.$disconnect();
    }
    
}