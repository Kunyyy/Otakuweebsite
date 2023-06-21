'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getpreview = async(ids) => {

    
    try {
        const data = await prisma.manga.findUnique({
            where: {
                id: parseInt(ids)
            }
        })
        
        const names = data?.alias
        let datamanga = [];
        datamanga = await prisma.mangaContent.findMany({
            where: {
                title: names,
            } 
        });
    
        return {
            data: data,
            names: names,
            datamanga: datamanga
        }
    } finally {
        await prisma.$disconnect();
    }
}

export default getpreview;
