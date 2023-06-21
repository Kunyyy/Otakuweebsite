'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getpreview = async(ids) => {

    try {
        const data = await prisma.anime.findUnique({
            where: {
                id: parseInt(ids)
            }
        })
    
        const names = data?.alias;
        let dataani = [];
        dataani = await prisma.animeContent.findMany({
            where: {
                title: names
            }
        });
    
        return {
            data: data,
            names: names,
            dataani: dataani
        }
    } finally {
        await prisma.$disconnect();
    }
    
}

export default getpreview;
