import Link from "next/link";
import contacts from "./contact.module.css"

const Contact = () => {

    return (
        <div className={contacts['contact']}>
            <Link href={'https://www.twitter.com/alfinzxpro_'} target="_blank" className={contacts['twitter']}>
                <i className="fab fa-twitter fa-lg"></i>Twitter
            </Link>
            <Link href={'https://www.instagram.com/alfinzxpro_'} target="_blank" className={contacts['instagram']}>
                <i className="fab fa-instagram fa-lg"></i>Instagram
            </Link>
            <Link href={'https://saweria.co/kunyyy'} target="_blank" className={contacts['saweria']}>
                <i className="fas fa-wallet fa-lg"></i>Saweria
            </Link>
            <Link href={'https://paypal.me/AlfinFalahuddin?country.x=ID&locale.x=en_US'} target="_blank" className={contacts['paypal']}>
                <i className="fab fa-paypal fa-lg"></i>Paypal
            </Link>
        </div>
    )
}

export default Contact;