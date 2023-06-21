'use client';

import { useEffect, useState } from "react";
import style from './adm.module.css';
import Inputs from '../Anime/Inputs';
import updatedDB from './updatedb';

export default function Editform({ isVisible, onClose, databases }) {
    
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [alias, setAlias] = useState("");
    const [jp, setJp] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    
    useEffect(() => {
        if (databases) {
          setId(databases.id || "");
          setTitle(databases.name || "");
          setAlias(databases.alias || "");
          setJp(databases.jpname || "");
          setDeskripsi(databases.description || "");
        }
    }, [databases]);

    const onSubmit = async(e) => {
        e.preventDefault();

        const updateddb = await updatedDB(id, title, alias, jp, deskripsi); 
        if (updateddb) {
            alert("Database Updated Successfully!");
            location.reload();
        } else {
            alert("Database Update Failed!");            
        }
    };
    
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-col justify-center items-center">
                <div className={style['modul']}>
                    <button type="submit" className="text-black text-xl place-self-end" onClick={() => onClose()}>X</button>
                    <form method="POST" encType="multipart/form-data">
                        <Inputs label="Nama" value={ title } onChange={ (e) => setTitle(e.target.value)} />
                        <Inputs label="Alias" value={ alias } onChange={ (e) => setAlias(e.target.value) } />
                        <Inputs label="JP" value={ jp } onChange={ (e) => setJp(e.target.value) } />
                        <Inputs label="Deskripsi" value={ deskripsi } onChange={ (e) => setDeskripsi(e.target.value) } />
                        <br />
                        <button className={style['savebtn']} type="submit" onClick={ onSubmit }>Save Changes</button>
                    </form>
                </div>
        </div>
    )
}