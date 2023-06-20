import Link from "next/link";
import React from "react";

interface MobileMenuProps {
    visible?: boolean;
    onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible, onClose }) => {
    const handleClick = () => {
        if (onClose) {
          onClose();
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <div className="bg-zinc-500 w-full absolute z-40 top-8 py-3 flex-col flex cursor-pointer">
            <div className="flex flex-col gap-4">
                <Link href="../Anime">
                    <div className="text-center text-white hover:underline" onClick={handleClick}>Anime</div>
                </Link>
                <Link href="../Manga">
                    <div className="text-center text-white hover:underline" onClick={handleClick}>Manga</div>
                </Link>
                <Link href="../Lightnovel">
                    <div className="text-center text-white hover:underline" onClick={handleClick}>Lightnovel</div>
                </Link>
            </div>
        </div>
    )
};

export default MobileMenu;