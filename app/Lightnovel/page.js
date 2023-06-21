'use client';

import Container from "../components/container/Container";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import getLightnovel from "./getLightnovel";

export default function Lightnovel() {

    const [lightnovel, setLightnovel] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {

        const getLn = async() => {
            const { lightnovels } = await getLightnovel();
            setLightnovel(lightnovels);
            setLoading(false);
        }
        getLn();

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
                        <span>Lightnovel List</span>
                    </div>
                    
                    <div className="pt-5 px-10">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {lightnovel.map((ln) => (
                                <div key={ln.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                                    <div className="relative w-full h-full group">
                                        {ln.preview && ln.name && (
                                            <div className="w-full h-full transition duration-300 ease-in-out transform group-hover:scale-105">
                                                <Image className="w-full h-full object-cover" src={ln.preview} alt={ln.name} width={3264} height={1836} />
                                            {ln.name && (
                                                <Link href={`/Lightnovel/preview?i=${ln.id}`}>
                                                <div className="absolute inset-x-0 bottom-0 group-hover:h-full">
                                                    <div className="relative h-10 bg-gray-800 opacity-75 flex flex-col items-center justify-center transition duration-300 ease-in-out whitespace-nowrap group-hover:text-gray-100 group-hover:whitespace-normal group-hover:h-full group-hover:items-start">
                                                        <h2 className="text-[16px] font-bold text-white px-6 py-2 transition duration-300 ease-in-out max-w-full text-ellipsis overflow-hidden">
                                                            {ln.name}
                                                            <br />
                                                            <span className="opacity-0 group-hover:opacity-100">
                                                                {ln.jpname}
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