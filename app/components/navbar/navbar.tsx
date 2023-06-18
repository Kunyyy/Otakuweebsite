import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import Search from "./Search";
import Drop from "./dropnav";

const Navbar = () => {
    return (
        <div className="w-full bg-zinc-800 z-10 shadow-sm static">
            <div
                className="
                    py-6
                    items-center
                    transition
                    duration-500
                    lg:border-b-[0]
                    border-zinc-500
                "

            >
                <Container>
                    <div className="mx-auto lg:mx-0 md:mx-0">
                        <Logo />
                    </div>
                    <div
                        className="
                            flex-row
                            ml-auto
                            gap-7
                            lg:flex
                            md:flex
                            hidden
                            items-center
                            justify-between
                        "
                    >
                        <Link href="../Anime"><Search label="Anime" /></Link>
                        <Link href="../Manga"><Search label="Manga" /></Link>
                        <Link href="../Lightnovel"><Search label="Lightnovel" /></Link>
                    </div>
                </Container>
            </div>
            <Drop />
        </div>
    );
}

export default Navbar;