import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function submitted(e) {
    e.preventDefault();
    const pw = document.getElementById("password").value;
    const cn = document.getElementById("username").value;
    const cpw = document.getElementById("confpassword").value;

    const err = document.getElementById("err");
    if (pw != cpw) err.innerHTML = "Check your password!!";
    else {
        const user = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/` + cn)
        const res = await user.json();
        if (res.length != 0) err.innerHTML = "User with that channelname already exists!!";
        else {
            const r = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
                method: "POST",
                body: JSON.stringify({ pw, cn }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const res = await r.json();
            cookies.set('mycat', res);
            window.location.href = "/";
        }
    }
}

export default function Login() {
    return (
        <>
            <div id="blackscreen">This screen can't be seen on the screen below 950px width</div>
            <div class="background">
                <div class="login-container">
                    <h1>Signup</h1>
                    <p id="err"></p>
                    <form onSubmit={submitted}>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" id="username" name="username" required placeholder='Channel name' autoComplete='off' />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" required placeholder='Password' autoComplete='off' />
                        </div>
                        <div class="form-group">
                            <label for="confpassword">Confirm Password</label>
                            <input type="password" id="confpassword" name="confpassword" required placeholder='Confirm Password' autoComplete='off' />
                        </div>
                        <div class="form-group">
                            <button type="submit">Login</button>
                        </div>
                        <p>Already have an account?  <NavLink to="/login">Login</NavLink></p>
                    </form>
                </div>
            </div>
        </>
    )
}