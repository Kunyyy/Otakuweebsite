'use client';

import { useEffect, useState } from 'react';
import style from './adm.module.css';
import Nav from '@/app/components/adm-nav/nav';
import Inputs from './Inputs';
import Options from "./Options";
import previewUpload from '../../api/gscrap/preview';
import dbUpload from '../../api/gscrap/content';

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
    const [deskripsi2, setDeskripsi2] = useState('');
    const [deskripsi3, setDeskripsi3] = useState('');
    const [preview, setPreview] = useState('');
    const [status, setStatus] = useState('Ongoing');

    const [parameters, setParameters] = useState('');
    const [titlealias, setTitlealias] = useState('');

    const [deskripsifull, setDeskripsifull] = useState('');

    const onSubmit = async(e) => {
        e.preventDefault();

        if (deskripsi3.length > 0) {
            const desc = `${deskripsi}<br><br>${deskripsi2}<br><br>${deskripsi3}`;
            setDeskripsifull(desc);
        } else if (deskripsi2.length > 0) {
            const desc = `${deskripsi}<br><br>${deskripsi2}`;
            setDeskripsifull(desc);
        } else {
            const desc = deskripsi;
            setDeskripsifull(desc);
        }

        if (title && alias && jp && status && deskripsifull && preview) {            
            const transfers = await previewUpload(title, alias, jp, status, deskripsifull, preview);
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

        if (parameters && titlealias) {
            const transferss = await dbUpload(parameters, titlealias);
            if (transferss) {
                alert(`Success ID: ${transferss}`);
            } else {
                alert('Failed!');
            }
        } else {
            alert('Isi Parameter Terlebih dahulu!');
        }
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
                        <h3>Anime Preview</h3>
                    </div>
                    <div className={style['createpreview']}>
                        <form method="POST" encType="multipart/form-data">
                            <Inputs label="Nama" value={ title } onChange={ (e) => setTitle(e.target.value) } />
                            <Inputs label="Alias" value={ alias } onChange={ (e) => setAlias(e.target.value) } />
                            <Inputs label="JP" value={ jp } onChange={ (e) => setJp(e.target.value) } />
                            <Options labels="Status" values={ status } onChanges={(e) => setStatus(e.target.value)} />                            
                            <Inputs label="Deskripsi" value={ deskripsi } onChange={ (e) => setDeskripsi(e.target.value) } />
                            <Inputs label="Deskripsi2" value={ deskripsi2 } onChange={ (e) => setDeskripsi2(e.target.value) } />
                            <Inputs label="Deskripsi3" value={ deskripsi3 } onChange={ (e) => setDeskripsi3(e.target.value) } />
                            <Inputs label="Preview Parameters" value={ preview } onChange={ (e) => setPreview(e.target.value) } />
                            <br />
                            <button type="submit" onClick={ onSubmit }>Tambah</button>
                        </form>
                    </div>
                </div>
                
                <div className={style['rectangle']} id="form2">
                    <div className={style['text']}>
                        <h3>Anime Upload</h3>
                    </div>
                    <div className={style['upload']}>
                        <form method="POST" encType="multipart/form-data">
                            <Inputs label="Title" value={ titlealias } onChange={ (e) => setTitlealias(e.target.value) } />
                            <Inputs label="Parameter" value={ parameters } onChange={ (e) => setParameters(e.target.value) } />
                            <button type="submit" onClick={ onSubmitFile }>Upload</button>
                        </form>
                    </div>
                </div>
                
            </section>
        </div>
    )

}

export default Admin;