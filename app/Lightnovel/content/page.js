'use client';

import { useEffect, useState } from "react";
import style from "../style.module.css";
import Image from "next/image";
import Link from "next/link";
import Contact from "../../components/contact/Contact";
import getlns from "./dbget";

export default function Content({ searchParams }) {
    const { i, v, id } = searchParams;

    const [getall, setGetall] = useState([]);
    const [getln, setGetln] = useState('');
    const [dataln, setDataln] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {

        const getfunc = async() => {
            const { getln, getall, dataln } = await getlns(i, v, id);
            setGetln(getln);
            setGetall(getall);
            setDataln(dataln);
            setLoading(false);
        }
        getfunc();

    }, [i, v, id]);

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
                    {getall.map((data) => (
                        <div key={data.id}>
                            <br /><br />
                            <div className="text-white text-center text-2xl sm:text-3xl">
                                <span>{getln.name}, <br />{data.volume}</span>
                            </div><br />

                            <div className={style['underline']}></div><br />

                            <Contact />
                            <br />

                            <div className='flex flex-col items-center justify-center'>
                                <div className="relative inline-block">
                                    <div className="flex items-center justify-center bg-gray-800 p-2 rounded-lg cursor-pointer select-none" onClick={toggleDropdown}>
                                        <span className="text-white">Volumes List</span>
                                        <div className={`bx bx-chevron-down text-white ml-2 transform ${chevronAnimation}`} style={{ transition: 'transform 0.3s ease-in-out' }}></div>
                                    </div>
                                    {isOpen && (
                                        <ul className="absolute z-50 bg-gray-800 pr-7 pl-2 py-2 mt-2 rounded-lg">
                                            {dataln && dataln.map((datas) => (
                                                <li key={datas.id}>
                                                    <Link
                                                        href={`/Lightnovel/content?i=${i}&v=${v}&id=${datas.ids}`}
                                                        onClick={() => handleLink(`/Lightnovel/content?i=${i}&v=${v}&id=${datas.ids}`)}
                                                        className="text-white hover:underline focus:underline block py-1 px-2"
                                                    >
                                                        {datas.volume}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <br />

                            <div className="flex justify-center md:mx-[108px] lg:mx-60">
                                <div className={style['images']} dangerouslySetInnerHTML={{__html: data.link}}></div>
                            </div>
                            <br />

                            <div className='flex flex-col items-center justify-center'>
                                <div className="relative inline-block">
                                    <div className="flex items-center justify-center bg-gray-800 p-2 rounded-lg cursor-pointer select-none" onClick={toggleDropdown}>
                                        <span className="text-white">Volumes List</span>
                                        <div className={`bx bx-chevron-down text-white ml-2 transform ${chevronAnimation}`} style={{ transition: 'transform 0.3s ease-in-out' }}></div>
                                    </div>
                                    {isOpen && (
                                        <ul className="absolute z-50 bg-gray-800 pr-7 pl-2 py-2 mt-2 rounded-lg">
                                            {dataln && dataln.map((datas) => (
                                                <li key={datas.id}>
                                                    <Link
                                                        href={`/Lightnovel/content?i=${i}&v=${v}&id=${datas.ids}`}
                                                        onClick={() => handleLink(`/Lightnovel/content?i=${i}&v=${v}&id=${datas.ids}`)}
                                                        className="text-white hover:underline focus:underline block py-1 px-2"
                                                    >
                                                        {datas.volume}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))} 
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
