'use server';

import { PrismaClient } from '@prisma/client';
const { google } = require('googleapis');

const CLIENT_ID = '30045879412-bv6l7i32ns3up5es8ckercbo6116ceik.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04r9RUwwgGa3pCgYIARAAGAQSNwF-L9Ir_YzLvB574bppHj5EszhUVlGzckHBs-z8NSu1kDSApCS7VTORBZOHR4pvb_IbfLCWeo0';

const oauth2Client = new google.auth.OAuth2 (
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

const prisma = new PrismaClient();

const check_folder_exist = async(folderName) => {

    const parameters = {
        q: "mimeType='application/vnd.google-apps.folder' and trashed=false and name='" + folderName + "'",
    };

    const response = await drive.files.list(parameters);
    const files = response.data.files;
    
    const folderList = [];

    for (const file of files) {
        if (file.mimeType === 'application/vnd.google-apps.folder' && file.name === folderName) {
            folderList.push({ id: file.id });
        }
    }

    return folderList;
}

const create_folder = async(folderName, parentFolderId = null) => {

    const checkFolderExist = await check_folder_exist(folderName);

    if (!checkFolderExist.length) {
        const folderMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: parentFolderId ? [parentFolderId] : [],
        };

        const response = await drive.files.create({
            resource: folderMetadata,
            fields: 'id',
        });

        const folderId = response.data.id;
        return folderId;
    }

    return checkFolderExist[0].id;
}

const uploads = async(data) => {
    
    const title = data.get('title');
    const alias = data.get('alias');
    const jp = data.get('jp');
    const deskripsi = data.get('deskripsi');
    
    const image = data.get('image');
    
    const folderName = 'fotoln';
    const checkFolderName = await create_folder(folderName);
    const response = await drive.files.list({
        q: `trashed = false and '${checkFolderName}' in parents and name = '${image}'`,
        fields: 'files(id)',
    });
    
    const files = response.data.files;
    const imageslinks = `https://docs.google.com/uc?export=view&id=${files[0].id}`;

    if (imageslinks && deskripsi && jp && title) {
        let dbpush = await prisma.lightnovel.create({
            data: {
                name: title,
                alias: alias,
                description: deskripsi,
                preview: imageslinks,
                jpname: jp,
            },
        });

        if (!dbpush) {
            return false;
        } else {
            return files[0].id;
        }
    } else {
        return false;
    }

}

const contentUploads = async(content) => {
    
    const image = content.get('filename');
    const split = image.split('-');
    const trimmedVolume = split[1].trimStart();
    const trimmedName = split[0].trimEnd();

    const createFolder = await create_folder(image);
    let pageToken = null;
    let allLinks = [];
    if (createFolder) {

    let foundDuplicate = false;

        do {
            const results = await drive.files.list({
                q: `trashed = false and '${createFolder}' in parents`,
                pageToken: pageToken,
                fields: 'nextPageToken, files(id, name)',
                orderBy: 'name',
            });

            const files = results.data.files;
            const links = files.map(file => `<Image src="https://docs.google.com/uc?export=view&id=${file.id}" alt="images" width={3264} height={1836} className={style['imakes']}></Image><br />`);
            allLinks.push(...links);

            pageToken = results.data.nextPageToken;
        } while (pageToken);

        if (trimmedVolume && !foundDuplicate) {
            
            const checkdb = await prisma.lightnovelContent.findMany({
                where: {
                    title: trimmedName,
                }
            })

            const existingRecord = await prisma.lightnovelContent.findFirst({
                where: {
                    title: trimmedName,
                    volume: trimmedVolume,
                },
            });

            if (!existingRecord) {
                let lengths = 1;
                if (checkdb) {
                    lengths = checkdb.length;                
                    lengths++;
                }

                let strSplit = allLinks.join(' ');
                let dbpush = await prisma.lightnovelContent.create({
                    data: {
                        title: trimmedName,
                        ids: parseInt(`${lengths}`),
                        link: `${strSplit}`,
                        volume: trimmedVolume,     
                    },
                })

                if (dbpush) {
                    return trimmedVolume;
                } else {
                    return false;
                }
            } else {
                foundDuplicate = true;
                return false;
            }
        }

    } else {
        return false;
    }

}


const whichData = async(datas, whichfunc) => {

    if (whichfunc == 'previews') {
        const funcUploads = await uploads(datas);
        if (funcUploads) {
            return funcUploads;
        } else {
            return false;
        }
    } else if (whichfunc == 'content') {
        const funcContentUploads = await contentUploads(datas);
        if (funcContentUploads) {
            return funcContentUploads;
        } else {
            return false;
        }
    }

}

export default whichData;