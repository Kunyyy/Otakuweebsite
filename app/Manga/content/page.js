'use client';

import React, { useEffect, useState } from 'react';
import style from "../style.module.css";
import Image from "next/image";
import Link from "next/link";
import Contact from "../../components/contact/Contact";
import databaseGetWhich from './dbget';

export default function Content({ searchParams }) {

    const { i, v, id } = searchParams

    const [manga, setManga] = useState([]);
    const [all, setAll] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {

        const getfunc = async() => {
            const getmanga = await databaseGetWhich(i, 'i', 'getmanga');
            const getall = await databaseGetWhich(v, id, 'getall');
            const datamanga = await databaseGetWhich(v, 'i', 'datamanga');
            setManga(getmanga);
            setAll(getall);
            setData(datamanga);
            setLoading(false);
        }
        getfunc();

    }, [i, id, v]);

    useEffect (() => {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const [dots, setDots] = useState('');
    const [chevronAnimation, setChevronAnimation] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => prevDots === '...' ? '' : prevDots + '.');
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handleLink = (url) => {
        window.location.href = url;
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setChevronAnimation(isOpen ? 'rotate-0' : 'rotate-180');
    };


    if (!loading) {
        return (
            <div className="pb-24">
                <div className="relative w-full h-full">
                    {all && (
                        <div key={all.id}>
                            <br /><br />
                            <div className="text-white text-center text-2xl sm:text-3xl">
                                <span>{manga.name}, <br />{all.chapter}</span>
                            </div><br />

                            <div className={style['underline']}></div><br />

                            <Contact />
                            <br />

                            <div className='flex flex-col items-center justify-center'>
                                <div className="relative inline-block">
                                    <div className="flex items-center justify-center bg-gray-800 p-2 rounded-lg cursor-pointer select-none" onClick={toggleDropdown}>
                                        <span className="text-white">Chapters List</span>
                                        <div className={`bx bx-chevron-down text-white ml-2 transform ${chevronAnimation}`} style={{ transition: 'transform 0.3s ease-in-out' }}></div>
                                    </div>
                                    {isOpen && (
                                        <ul className="absolute z-50 bg-gray-800 pr-7 pl-2 py-2 mt-2 rounded-lg">
                                            {data && data.map((datas) => (
                                                <li key={datas.id}>
                                                    <Link
                                                        href={`/Manga/content?i=${i}&v=${v}&id=${datas.ids}`}
                                                        onClick={() => handleLink(`/Manga/content?i=${i}&v=${v}&id=${datas.ids}`)}
                                                        className="text-white hover:underline focus:underline block py-1 px-2"
                                                    >
                                                        {datas.chapter}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <br />

                            <div className="flex justify-center md:mx-[108px] lg:mx-60">
                                <div className={style['images']} dangerouslySetInnerHTML={{__html: all.link}}></div>
                            </div>

                            <br />
                            <div className='flex flex-col items-center justify-center'>
                                <div className="relative inline-block">
                                    <div className="flex items-center justify-center bg-gray-800 p-2 rounded-lg cursor-pointer select-none" onClick={toggleDropdown}>
                                        <span className="text-white">Chapters List</span>
                                        <div className={`bx bx-chevron-down text-white ml-2 transform ${chevronAnimation}`} style={{ transition: 'transform 0.3s ease-in-out' }}></div>
                                    </div>
                                    {isOpen && (
                                        <ul className="absolute z-50 bg-gray-800 pr-7 pl-2 py-2 mt-2 rounded-lg">
                                            {data && data.map((datas) => (
                                                <li key={datas.id}>
                                                    <Link
                                                        href={`/Manga/content?i=${i}&v=${v}&id=${datas.ids}`}
                                                        onClick={() => handleLink(`/Manga/content?i=${i}&v=${v}&id=${datas.ids}`)}
                                                        className="text-white hover:underline focus:underline block py-1 px-2"
                                                    >
                                                        {datas.chapter}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    )} 
                </div>
            </div>
        )

    } else {

        return (
            <div className="absolute inset-0 flex justify-center items-center bg-black pointer-events-none">
                <span className="text-white text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Loading{dots}</span>
            </div>
        )
        
    }
    
}
