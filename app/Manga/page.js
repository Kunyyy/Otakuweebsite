'use client';

import Container from "../components/container/Container";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import getManga from "./getManga";

export default function Manga() {

    const [manga, setManga] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {

        const getMa = async() => {
            const { mangas } = await getManga();
            setManga(mangas);
            setLoading(false);
        }
        getMa();

    }, [])

    const [dots, setDots] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => prevDots === '...' ? '' : prevDots + '.');
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect (() => {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })
    }, []);

    if (!loading) {

        return (
            <div className="relative w-full h-full">
                <Container>
                    <div className="text-white text-2xl text-bold pt-5 pl-5">
                        <span>Manga List</span>
                    </div>
                    
                    <div className="pt-5 px-10">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {manga.map((manga) => (
                                <div key={manga.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                                    <div className="relative w-full h-full group">
                                        {manga.preview && manga.name && (
                                            <div className="w-full h-full transition duration-300 ease-in-out transform group-hover:scale-105">
                                                <Image className="w-full h-full object-cover" src={manga.preview} alt={manga.name} width={3264} height={1836} />
                                            {manga.name && (
                                                <Link href={`/Manga/preview?i=${manga.id}`}>
                                                    <div className="absolute inset-x-0 bottom-0 group-hover:h-full">
                                                        <div className="relative h-10 bg-gray-800 opacity-75 flex flex-col items-center justify-center transition duration-300 ease-in-out whitespace-nowrap group-hover:text-gray-100 group-hover:whitespace-normal group-hover:h-full group-hover:items-start">
                                                            <h2 className="text-[16px] font-bold text-white px-6 py-2 transition duration-300 ease-in-out max-w-full text-ellipsis overflow-hidden">
                                                                {manga.name}
                                                                <br />
                                                                <span className="opacity-0 group-hover:opacity-100">
                                                                    {manga.jpname}
                                                                </span>
                                                            </h2>
                                                            <div className="absolute top-0 left-0 h-full w-full bg-gray-900 opacity-0 transition duration-300 ease-in-out"></div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        )

    } else {
        return (
            <div className="relative w-full h-full">
                <div className="flex items-center justify-center h-full">
                    <div className="flex justify-center items-center pointer-events-none">
                        <span className="text-white font-bold text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Please Wait{dots}</span>
                    </div>
                </div>
            </div>
        )
    }
}