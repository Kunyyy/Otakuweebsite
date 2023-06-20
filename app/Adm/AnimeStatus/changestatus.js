'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function changeStatus(id, status) {

    try {
        const changeStatus = await prisma.anime.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        });

        if (changeStatus) {
            return true;
        } else {
            return false;
        }
    } finally {
        await prisma.$disconnect();
    }
    
}