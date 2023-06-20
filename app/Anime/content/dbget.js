'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getani = async(lnid) => {
    const getsani = await prisma.anime.findUnique({
        where: {
            id : parseInt(lnid)
        }
    })

    return getsani;
}

const getall = async(table, tableid) => {
    let getsall = [];
    getsall = await prisma.animeContent.findMany({ 
        where: {
            title: table,
            ids: parseInt(tableid) 
        }
    });

    return getsall;  
}

const dataani = async(tables) => {
    let datasani = [];
    datasani = await prisma.animeContent.findMany({
        where: {
            title: tables
        }
    });

    return datasani;
}

const databaseGetWhich = async(parametersget, paramsget ,where) => {

    try {
        if (where == 'getani') {
            const getsani = await getani(parametersget);
            if (getsani) {
                return getsani;
            } else {
                return false;
            }
        } else if (where == 'getall') {
            const getsall = await getall(parametersget, paramsget);
            if (getsall) {
                return getsall[0];
            } else {
                return false;
            }
        } else if (where == 'dataani') {
            const datasani = await dataani(parametersget);
            if (datasani) {
                return datasani;
            } else {
                return false;
            }
        }
    } finally {
        await prisma.$disconnect();
    }

}

export default databaseGetWhich;