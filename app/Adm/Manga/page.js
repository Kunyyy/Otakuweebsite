'use client';

import { useEffect, useState } from 'react';
import style from './adm.module.css';
import Nav from '@/app/components/adm-nav/nav';
import InputGmbr from './InputGmbr';
import Inputs from './Inputs';
import whichData from '../../api/gdrive/manga';

function Admin() {

    useEffect (() => {
        const cookies = document.cookie;

        if (cookies) {
            const cookiess = document.cookie.split(';');
            const username = cookiess[0].split('=');
            const password = cookiess[1].split('=');
    
            if (username[1] !== 'admin' && password[1] !== '1234' ) {
                window.location.href = "/Admin";
            }
        } else {
            window.location.href = "/Admin";
        }
    })

    useEffect(() => {

        const preview = document.getElementById('form1');
        const content = document.getElementById('form2');
        const button = document.getElementById('toggle-btn');

        preview.style.display = 'block';
        content.style.display = 'none';
        button.textContent = 'Upload Content'

        button.addEventListener('click', function(){

            if (preview.style.display !== 'none'){
                preview.style.display = 'none';
                content.style.display = 'block';
                button.textContent = 'Upload Content'
            } else {
                preview.style.display = 'block';
                content.style.display = 'none';
                button.textContent = 'Upload Preview'
            }

        });
        
    }, [])

    const [title, setTitle] = useState('');
    const [alias, setAlias] = useState('');
    const [jp, setJp] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [image, setImage] = useState('');

    const data = new FormData();

    const onSubmit = async(e) => {
        e.preventDefault();

        if (title && alias && jp && deskripsi && image) {
            let func = 'previews';
            let nameofimage = image.name;
            let imagename = nameofimage.split(".");

            data.append('title', title);
            data.append('alias', alias);
            data.append('jp', jp);
            data.append('deskripsi', deskripsi);
            data.append('image', imagename[0]);

            const transfers = await whichData(data, func);
            if (transfers) {
                alert(`Success => ID: ${transfers}`);
            } else {
                alert('Database Failed to Created!');
            }
        } else {
            alert('Form Tidak Boleh Kosong!');
        }

    };

    const onSubmitFile = async(e) => {
        e.preventDefault();

        if (image) {
            let func = 'content';
            let nameofimage = image.name;
            let imagename = nameofimage.split('.');

            data.append('filename', imagename[0]);

            const fileTransfers = await whichData(data, func);
            if (fileTransfers) {
                alert(`Success => Volume: ${fileTransfers}`);
            } else {
                alert('Database Failed to Created!');
            }
        } else {
            alert('File Harus Ada!');
        }
    }

    const onImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        
        <div>
            <section className={style['section']}>

                <div className="flex flex-col gap-4">
                    <Nav />
                    <div className={style['btn']}>
                        <button id="toggle-btn"></button>
                    </div>
                </div>
                
                <div className={style['create']} id="form1">
                    <div className={style['text']}>
                        <h3>Manga Preview</h3>
                    </div>
                    <div className={style['createpreview']}>
                        <form method="POST" encType="multipart/form-data">
                            <Inputs label="Nama" value={ title } onChange={ (e) => setTitle(e.target.value) } />
                            <Inputs label="Alias" value={ alias } onChange={ (e) => setAlias(e.target.value) } />
                            <Inputs label="JP" value={ jp } onChange={ (e) => setJp(e.target.value) } />
                            <Inputs label="Deskripsi" value={ deskripsi } onChange={ (e) => setDeskripsi(e.target.value) } />
                            <InputGmbr labels="Preview" onChange={ (e) => onImageUpload(e) } />
                            <br />
                            <button type="submit" onClick={ onSubmit }>Tambah</button>
                        </form>
                    </div>
                </div>
                
                <div className={style['rectangle']} id="form2">
                    <div className={style['text']}>
                        <h3>Manga Upload</h3>
                    </div>
                    <div className={style['upload']}>
                        <form method="POST" encType="multipart/form-data">
                            <InputGmbr onChange={ (e) => onImageUpload(e) } />
                            <button type="submit" onClick={ onSubmitFile }>Upload</button>
                        </form>
                    </div>
                </div>
                
            </section>
        </div>
    )

}

export default Admin;