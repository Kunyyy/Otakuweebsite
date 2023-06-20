import Link from "next/link";
import style from "./nav.module.css";

function Nav() {

    return (
        <div className="flex flex-col gap-4 text-center">
            <Link href="../Adm/Lightnovel" className={style['link']}>Lightnovel</Link>
            <Link href="../Adm/Anime" className={style['link']}>Anime</Link>
            <Link href="../Adm/AnimeStatus" className={style['link']}>AnimeStatus</Link>
            <Link href="../Adm/Manga" className={style['link']}>Manga</Link>
        </div>
    )

}

export default Nav;