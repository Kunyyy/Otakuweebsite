'use client';

import React from "react";

interface NavbarItemProps {
    label: string;
}

const Search: React.FC<NavbarItemProps> = ({
    label
}) => {
    return (
        <div 
            className="
                text-white
                w-full
                py-py
                px-2
                rounded-full
                cursor-pointer 
                hover:text-black 
                hover:bg-white
                transition
                "
        >
            <div 
                className="
                    text-lg
                    font-semibold
                "
            >
                {label}
            </div>
        </div>
    )
}

export default Search;