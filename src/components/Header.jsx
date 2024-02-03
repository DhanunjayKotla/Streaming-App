import React from 'react'
import Cookies from 'universal-cookie';
import logo from '../youtube-logo.png'
import profile from '../profilepic.webp'
import loading from '../loading.gif'

const cookies = new Cookies();

export default function Header() {

    var formData;
    function onchange(e) {
        if (!e.target.files[0].type.startsWith('video')) {
            alert("Upload video file only!!");
            return;
        }
        formData = new FormData();
        formData.append("Image", e.target.files[0]);
        const ele = document.getElementsByClassName("popupcontainer")[0];
        ele.innerHTML = `<div class="popup">
            <label for="">Video Title:</label>
            <textarea name="" id="" rows="10" autofocus></textarea>
            <button>Upload</button>
        </div>`;
        document.querySelector(".popup textarea").value = e.target.files[0].name;
        ele.style.display = "flex";
        document.getElementById("srv").value = "";
        document.querySelector(".popup button").onclick = function () { uploadvideo() }
    }

    function uploadvideo(e) {
        const title = document.querySelector(".popup textarea").value;
        formData.append("title", title);
        const ele = document.getElementsByClassName("popupcontainer")[0];
        ele.innerHTML = `<div class="popup">
            <div class="load">Uploading</div>
            <img src=${loading} width="50px"/>
        </div>`;

        fetch(`${import.meta.env.VITE_SERVER_URL}/upload`, {
            method: "POST",
            body: formData,
            credentials: 'include'
        })
            .then(data => {
                ele.style.display = "none";
                // alert('Upload successful!');
            }).catch(err => {
                // console.log(err.message);
                alert('Upload failed!');
            }).finally(() => {
                window.location.href = "/";
            })
    }

    function uploadprofile(e) {

        var formData = new FormData();
        formData.append("Image", e.target.files[0]);
        fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
            method: "PUT",
            body: formData,
            credentials: 'include'
        })
            .then(data => {
                window.location.href = "/";
            }).catch(err => console.log(err.message))
    }

    return (
        <nav>
            <img class="logo" src={logo} alt="" />
            <div>Home</div>
            <label for='srv'>Upload</label>
            <input type='file' id='srv' style={{ display: "none" }} onChange={e => onchange(e)}></input>
            <label for="rgv"><div class="profpic"><img src={cookies.get('mycat').profilepic ? cookies.get('mycat').profilepic : profile} alt="" /></div></label>
            <input type='file' id='rgv' style={{ display: "none" }} onChange={e => uploadprofile(e)}></input>
        </nav>
    )
}