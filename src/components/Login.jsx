import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function submitted(e) {
    e.preventDefault();
    const pw = document.getElementById("password").value;
    const cn = document.getElementById("username").value;
    const user = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/` + cn);
    const res = await user.json();
    if (res.length != 0 && res[0].password == pw) {
        cookies.set("mycat", res[0]);
        window.location.href = "/";
    }
    else document.getElementById("err").innerHTML = "check your credentials!";
}

export default function Login() {
    return (
        <>
            <div id="blackscreen">This screen can't be seen on the screen below 950px width</div>
            <div class="background">
                <div class="login-container">
                    <h1>Login</h1>
                    <p id="err"></p>
                    <form onSubmit={submitted}>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" name="username" required placeholder="Channel name" autoComplete='off' />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" required placeholder="Password" autoComplete='off' />
                        </div>
                        <div class="form-group">
                            <button type="submit">Login</button>
                        </div>
                        <p>Don't have an account?  <NavLink to="/signup">Signup</NavLink></p>
                    </form>
                </div>
            </div>
        </>
    )
}