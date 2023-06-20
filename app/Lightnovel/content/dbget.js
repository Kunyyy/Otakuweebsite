'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getlns = async(lnid, table, tableid) => {
    
    try {
        const getln = await prisma.lightnovel.findUnique({
            where: {
                id : parseInt(lnid)
            }
        })
    
        const getall = await prisma.lightnovelContent.findMany({ 
            where: {
               title: table,
               ids: parseInt(tableid) 
            }
        });
    
        let dataln = [];
        dataln = await prisma.lightnovelContent.findMany({
            where: {
                title: table
            }
        });
    
        return {
            getln: getln,
            getall: getall,
            dataln: dataln
        }
    } finally {
        await prisma.$disconnect();
    }
}

export default getlns;