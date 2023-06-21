'use client';

import Container from "@/app/components/container/Container";
import Image from "next/image";
import Link from "next/link";
import style from "../style.module.css";
import getpreview from './dbget';
import React, { useEffect, useState } from 'react';

export default function Preview({ searchParams }) {
    const { i } = searchParams;

    const [data, setData] = useState('');
    const [names, setNames] = useState('');
    const [dataani, setDataani] = useState([]);

    useEffect (() => {

        const getfunc = async() => {
            const { data, names, dataani } = await getpreview(i);
            setData(data);
            setNames(names);
            setDataani(dataani);
        }
        getfunc();

    }, [i]);

    useEffect (() => {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })
    }, []);

    const [dots, setDots] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => prevDots === '...' ? '' : prevDots + '.');
        }, 500);

        return () => clearInterval(interval);
    }, []);

    if (i) {
        if (data) {    

            return (
                <Container>
                    <div className="relative w-full h-full">
                            <div className="flex justify-center pt-10 pb-6">
                                    <Image src={data.preview} alt={data.name} width={3264} height={1836} className="w-52 h-auto sm:w-60 sm:h-auto" />
                            </div>

                            <div className="mx-6">
                                <span className="text-white text-xl sm:text-2xl flex justify-center text-center">{data.name}</span>
                                <span className="text-white text-xl sm:text-2xl flex justify-center text-center">{data.jpname}</span>
                                <br />
                                <span className="text-white text-xl sm:text-xl flex justify-center text-center">Status: {data.status}</span>
                                <div className="flex justify-center text-center mt-10 mb-10">
                                    <hr className="border-white block sm:hidden" style={{ width: '100%' }} />
                                    <hr className="border-white hidden sm:block" style={{ width: '80%' }} />
                                </div>
                            </div>

                            <div className="mx-6 sm:mx-20">
                                <span className="text-white flex justify-center text-md md:text-lg" dangerouslySetInnerHTML={{__html: data.description}}></span>
                            </div>

                            <div className="mx-6">
                                <div className="flex justify-center text-center mt-10 mb-10">
                                    <hr className="border-white block sm:hidden" style={{ width: '100%' }} />
                                    <hr className="border-white hidden sm:block" style={{ width: '80%' }} />
                                </div>
                            </div>

                            <div className="mx-6 mb-6 sm:mx-36 md:mx-48 text-white text-xl sm:text-xl">
                                    <span className={style['underlines']}>All Episodes</span>
                            </div>

                        {dataani.length > 0 &&
                            <div className="text-white text-lg text-center sm:text-left sm:text-xl sm:ml-48 md:ml-60">
                                <div className={style['link']}>
                                    <ul className="pb-10">
                                        {dataani && dataani.map((datas) => 
                                        <li key={datas.id}>
                                            <Link href={`/Anime/content?i=${i}&v=${names}&id=${datas.ids}`} className="text-white hover:underline focus:underline">{data.name},  {datas.episode}</Link>
                                        </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                </Container>
            )
        } else {
            return (
                <div className="absolute inset-0 flex justify-center items-center bg-black pointer-events-none">
                    <span className="text-white text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Loading Content{dots}</span>
                </div>
            )
        }
    }

} 