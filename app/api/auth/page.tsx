'use client';

import { useEffect } from "react";
import style from "./style.module.css";

function Login() {

    useEffect(() => {

        const form = document.getElementById('form') as HTMLFormElement;
        const username = document.getElementById('username') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        form?.addEventListener('submit', (e) => {
            e.preventDefault();

            if ( username?.value && password?.value == 'admin' ) {
                document.cookie = "username=admin; path=/";
                document.cookie = "password=1234; path=/";
                window.location.href = "/Adm/Anime";
            } else {
                alert('username or password is wrong');
            }

        })

    }, []);
    
    return (
        <div className="absolute inset-0 bg-white w-full h-full">
            <div className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm">
                <div className={style['loginform']}>
                    <h3>Login Admin</h3>
                    <form id="form" method="post">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required></input>
                        <br /><br />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required></input>
                        <br /><br />
                        <input type="submit" value="Login" name="submit"></input>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Login;