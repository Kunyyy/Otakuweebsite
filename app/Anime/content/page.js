'use client';

import React, { useEffect, useState } from 'react';
import style from "../style.module.css";
import Image from "next/image";
import Link from "next/link";
import Contact from "../../components/contact/Contact";
import databaseGetWhich from './dbget';

export default function Content({ searchParams }) {

    const { i, v, id } = searchParams

    const [ani, setAni] = useState([]);
    const [all, setAll] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {

        const getfunc = async() => {
            const getani = await databaseGetWhich(i, 'i', 'getani');
            const getall = await databaseGetWhich(v, id, 'getall');
            const dataani = await databaseGetWhich(v, 'i', 'dataani');
            setAni(getani);
            setAll(getall);
            setData(dataani);
            setLoading(false);
        }
        getfunc();

    }, [i, id, v]);

    useEffect(() => {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })
        
        window.addEventListener('DOMContentLoaded', (e) => {
            alert("We Recommend Using Adblock")
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
                                <span>{ani.name}, <br />{all.episode}</span>
                            </div><br />
    
                            <div className={style['underline']}></div><br />
    
                            <Contact />
                            <br />
                            <div className='flex flex-col items-center justify-center'>
                                <div className="relative inline-block">
                                    <div className="flex items-center justify-center bg-gray-800 p-2 rounded-lg cursor-pointer" onClick={toggleDropdown}>
                                        <span className="text-white">Episodes List</span>
                                        <div className={`bx bx-chevron-down text-white ml-2 transform ${chevronAnimation}`} style={{ transition: 'transform 0.3s ease-in-out' }}></div>
                                    </div>
                                    {isOpen && (
                                        <ul className="absolute z-50 bg-gray-800 pr-7 pl-2 py-2 mt-2 rounded-lg">
                                            {data && data.map((datas) => (
                                                <li key={datas.id}>
                                                    <Link
                                                        href={`/Anime/content?i=${i}&v=${v}&id=${datas.ids}`}
                                                        onClick={() => handleLink(`/Anime/content?i=${i}&v=${v}&id=${datas.ids}`)}
                                                        className="text-white hover:underline focus:underline block py-1 px-2"
                                                    >
                                                        {datas.episode}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <br />
                            <div className="flex justify-center mx-5">
                                <div className="w-full max-w-3xl">
                                    <div className="relative w-full h-0 pb-[100%] md:pb-[56.25%]">
                                    <iframe 
                                        src={`${all.link}`}
                                        allowfullscreen="true" 
                                        frameborder="0" 
                                        marginwidth="0" 
                                        marginheight="0" 
                                        scrolling="no"
                                        className="absolute w-full h-full"
                                    ></iframe>
                                    </div>
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
