'use client';

import { useCallback, useState } from 'react';


import { FiAlignJustify } from "react-icons/fi";
import MobileMenu from "./MobileMenu";


const Drop = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setShowMobileMenu(false);
    }, []);
    

    return (
        <div className="lg:hidden md:hidden flex flex-row items-center cursor-default relative">
            <div className="bg-zinc-700 w-full">
                <FiAlignJustify onClick={toggleMobileMenu} className="text-white text-3xl mx-auto cursor-pointer" />
                <MobileMenu visible={showMobileMenu} onClose={closeMobileMenu} />
            </div>
        </div>
    )
}

export default Drop;