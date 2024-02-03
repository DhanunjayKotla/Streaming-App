import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from './Header'
import profile from '../profilepic.webp'
import timeDisplay from '../timeDisplay';

const cookies = new Cookies();

function createCard(video) {
    return (
        <NavLink to={`/video/${video.path}`} className="minivideocard">
            <img class="minithumbnail" src={video.thumbnail} alt="" />
            <div class="minivideoinfo">
                <div class="videotitle">{video.title}</div>
                <div>{video.uploadedBy.channelname}</div>
                <div>{`${video.views} views . ${timeDisplay(video.createdAt)}`}</div>
            </div>
        </NavLink>
    );
}

function liked(e, id) {
    const ele = e.currentTarget;
    fetch(`${import.meta.env.VITE_SERVER_URL}/updatelikes`, {
        method: "PUT",
        body: JSON.stringify({ videoid: id }),
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(async data => {
            ele.setAttribute('class', `fi fi-${ele.getAttribute('class') == 'fi fi-rs-social-network' ? 'ss' : 'rs'}-social-network`);
            const res = await data.json();
            document.getElementById("likescount").innerHTML = res.likes.length;
        }).catch(err => console.log(err.message))
}

export default function Video() {
    const { "*": token } = useParams()
    const [data, setdata] = useState({
        path: "",
        thumbnail: "",
        title: "",
        uploadedBy: "",
        likes: [],
        views: 0,
        createdAt: "",
    });
    const [recommend, setrecommend] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                var response = await fetch(`${import.meta.env.VITE_SERVER_URL}/video/` + token, { credentials: 'include' });
                var result = await response.json();
                // console.log(result);
                setdata(result);
                response = await fetch(`${import.meta.env.VITE_SERVER_URL}/videos`, { credentials: 'include' });
                result = await response.json();
                setrecommend(result)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <main>
                <div class="left">
                    <div class="videocontainer"><video src={`${import.meta.env.VITE_SERVER_URL}/playvideo/${token}`} controls autoPlay></video></div>
                    <div class="videotitle">{data.title}</div>
                    <div class="videoinfo">
                        <div class="profpic"><img src={data.uploadedBy.profilepic ? data.uploadedBy.profilepic : profile} alt="" /></div>
                        <div class="channelname">{data.uploadedBy.channelname}</div>
                        <div>{`${data.views} views . ${timeDisplay(data.createdAt)}`}</div>
                        <div><i class={`fi fi-${data.likes.includes(cookies.get("mycat")._id) ? "ss" : "rs"}-social-network`} onClick={e => liked(e, data._id)}></i> <span id="likescount">{data.likes.length}</span> likes</div>
                    </div>
                </div>
                <div class="right">
                    {recommend.map(createCard)}
                </div>
            </main>
        </>
    )
}
