'use client';

import { useEffect, useState } from "react";
import Container from "../components/container/Container";
import Image from "next/image";
import Link from "next/link";
import getAnime from "./getAnime";

export default function Anime() {

    const [ongoinganime, setOngoinganime] = useState([]);
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        
        const getAni = async() => {
            const { ongoingAnimes, animes } = await getAnime();
            setOngoinganime(ongoingAnimes);
            setAnime(animes);
            setLoading(false);  
        }
        getAni()

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

    const ongoing = () => {
        window.location.href = "/Anime/Ongoing";
    }

    const animelist = () => {
        window.location.href = "/Anime/Animelist";
    }

    if (!loading) {

        return (
            <div className="relative w-full h-full">
                <Container>
                    <div className="text-bold pt-5 px-5 flex justify-between">
                        <span className="text-xl sm:text-2xl text-white">Ongoing Anime</span>
                        <button className="text-xl mr-5 md:mr-10 px-1 sm:px-2 bg-gray-800 py-1 sm:py-2 text-white rounded-md" onClick={ongoing}>Ongoing List</button>
                    </div>
                    
                    <div className="pt-5 px-10">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {ongoinganime.map((ani) => (
                                <div key={ani.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                                    <div className="relative w-full h-full group">
                                        {ani.preview && ani.name && (
                                            <div className="w-full h-full transition duration-300 ease-in-out transform group-hover:scale-105">
                                                <Image className="w-full h-full object-cover" src={ani.preview} alt={ani.name} width={3264} height={1836} />
                                            {ani.name && (
                                                <Link href={`/Anime/preview?i=${ani.id}`}>
                                                    <div className="absolute inset-x-0 bottom-0 group-hover:h-full">
                                                        <div className="relative h-10 bg-gray-800 opacity-75 flex flex-col items-center justify-center transition duration-300 ease-in-out whitespace-nowrap group-hover:text-gray-100 group-hover:whitespace-normal group-hover:h-full group-hover:items-start">
                                                            <h2 className="text-[16px] font-bold text-white px-6 py-2 transition duration-300 ease-in-out max-w-full text-ellipsis overflow-hidden">
                                                                {ani.name}
                                                                <br />
                                                                <span className="opacity-0 group-hover:opacity-100">
                                                                    {ani.jpname}
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

                <Container>
                    <div className="text-bold pt-5 px-5 flex justify-between">
                        <span className="text-xl sm:text-2xl text-white">Anime List</span>
                        <button className="text-xl mr-5 md:mr-10 px-1 sm:px-2 bg-gray-800 py-1 sm:py-2 text-white rounded-md" onClick={animelist}>All Anime</button>
                    </div>

                    <div className="pt-5 px-10">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {anime.map((ani) => (
                                <div key={ani.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                                    <div className="relative w-full h-full group">
                                        {ani.preview && ani.name && (
                                            <div className="w-full h-full transition duration-300 ease-in-out transform group-hover:scale-105">
                                                <Image className="w-full h-full object-cover" src={ani.preview} alt={ani.name} width={3264} height={1836} />
                                            {ani.name && (
                                                <Link href={`/Anime/preview?i=${ani.id}`}>
                                                    <div className="absolute inset-x-0 bottom-0 group-hover:h-full">
                                                        <div className="relative h-10 bg-gray-800 opacity-75 flex flex-col items-center justify-center transition duration-300 ease-in-out whitespace-nowrap group-hover:text-gray-100 group-hover:whitespace-normal group-hover:h-full group-hover:items-start">
                                                            <h2 className="text-[16px] font-bold text-white px-6 py-2 transition duration-300 ease-in-out max-w-full text-ellipsis overflow-hidden">
                                                                {ani.name}
                                                                <br />
                                                                <span className="opacity-0 group-hover:opacity-100">
                                                                    {ani.jpname}
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