'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getpreview = async(ids) => {
    
    try {
        const data = await prisma.lightnovel.findUnique({
            where: {
                id: parseInt(ids)
            }
        })
        
        const names = data?.alias
        let dataln = [];
        dataln = await prisma.lightnovelContent.findMany({
            where: {
                title: names,
            } 
        });
    
        return {
            data: data,
            names: names,
            dataln: dataln
        }
    } finally {
        await prisma.$disconnect();
    }
}

export default getpreview;
