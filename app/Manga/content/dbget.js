'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getmanga = async(lnid) => {
    const getsmanga = await prisma.manga.findUnique({
        where: {
            id : parseInt(lnid)
        }
    })

    return getsmanga;
}

const getall = async(table, tableid) => {
    let getsall = [];
    getsall = await prisma.mangaContent.findMany({ 
        where: {
            title: table,
            ids: parseInt(tableid) 
        }
    });

    return getsall;  
}

const datamanga = async(tables) => {
    let datasmanga = [];
    datasmanga = await prisma.mangaContent.findMany({
        where: {
            title: tables
        }
    });

    return datasmanga;
}

const databaseGetWhich = async(parametersget, paramsget ,where) => {

    try {
        if (where == 'getmanga') {
            const getsmanga = await getmanga(parametersget);
            if (getsmanga) {
                return getsmanga;
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
        } else if (where == 'datamanga') {
            const datasmanga = await datamanga(parametersget);
            if (datasmanga) {
                return datasmanga;
            } else {
                return false;
            }
        }
    } finally {
        await prisma.$disconnect();
    }

}

export default databaseGetWhich;