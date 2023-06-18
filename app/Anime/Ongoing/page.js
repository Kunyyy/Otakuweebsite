'use client';

import { useEffect, useState } from "react";
import Container from "@/app/components/container/Container";
import Image from "next/image";
import Link from "next/link";
import getAnime from "../getAnime";

export default function Ongoing() {

    // Loading screen and get database
    const [ongoinganime, setOngoinganime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dots, setDots] = useState('');

    useEffect(() => {

        const getAni = async () => {
            const { ongoingAnimes, animes } = await getAnime();
            setOngoinganime(ongoingAnimes);
            setLoading(false);
        };
        getAni();

    }, []);

    useEffect(() => {

        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots === '...' ? '' : prevDots + '.'));
        }, 500);

        return () => clearInterval(interval);

    }, []);

    useEffect (() => {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })
    }, []);


    // Paginations
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Card shown per 1 page
    const maxVisiblePages = 6;

    useEffect(() => {

        const storedPage = localStorage.getItem("currentPage");
        const initialPage = storedPage ? parseInt(storedPage) : 1;
        setCurrentPage(initialPage);

    }, []);

    useEffect(() => {
        localStorage.setItem("currentPage", currentPage.toString());
    }, [currentPage]);

    // Calculate the total number of pages
    const totalPages = Math.ceil(ongoinganime.length / itemsPerPage);

    // Calculate the index of the last item on the current page
    const lastIndex = currentPage * itemsPerPage;

    // Get the current page of items
    const currentItems = ongoinganime.slice(
        lastIndex - itemsPerPage,
        lastIndex
    );

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate an array of visible page numbers
    const getVisiblePageNumbers = () => {
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        } else {
            const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
            return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
        }
    };



    if (!loading) {

        return (
            <div className="relative w-full h-full">
                <Container>
                    <div className="text-bold pt-5 px-5 flex justify-between">
                        <span className="text-2xl text-white">Ongoing Anime</span>
                    </div>

                    <div className="pt-5 px-10">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {currentItems.map((ani) => (
                                <div key={ani.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                                    <div className="relative w-full h-full group">
                                        {ani.preview && ani.name && (
                                            <div className="w-full h-full transition duration-300 ease-in-out transform group-hover:scale-105">
                                                <Image className="w-full h-full object-cover" src={ani.preview} alt={ani.name} width={3264} height={1836}/>
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
                    <div className="flex justify-center mt-8">
                        <nav className="flex justify-center">
                            <ul className="flex items-center">
                                <li className={`mx-1 ${currentPage === 1 ? "text-gray-400" : "text-gray-400 hover:text-white cursor-pointer"}`} onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}>
                                    &lt;
                                </li>
                                {getVisiblePageNumbers().map((pageNumber) => (
                                    <li key={pageNumber} className={`mx-1 ${currentPage === pageNumber ? "text-white font-bold" : "text-gray-400 hover:text-white cursor-pointer"}`} onClick={() => handlePageChange(pageNumber)}>
                                        {pageNumber}
                                    </li>
                                ))}
                                <li className={`mx-1 ${currentPage === totalPages ? "text-gray-400" : "text-gray-400 hover:text-white cursor-pointer"}`} onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}>
                                    &gt;
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Container>
            </div>
        );

    } else {
        return (
            <div className="relative w-full h-full">
                <div className="flex items-center justify-center h-full">
                    <div className="flex justify-center items-center pointer-events-none">
                        <span className="text-white font-bold text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                        Please Wait{dots}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

}
