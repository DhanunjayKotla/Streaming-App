import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header'
import profile from '../profilepic.webp'
import timeDisplay from '../timeDisplay';

function createCard(video) {
    return (
        <NavLink to={`/video/${video.path}`} className="videocard">
            <img class="thumbnail" src={video.thumbnail} alt="" />
            <div class="videodata">
                <div class="channelpic"><img src={video.uploadedBy.profilepic ? video.uploadedBy.profilepic : profile} alt="" /></div>
                <div>
                    <div class="videotitle">{video.title}</div>
                    <div className="channel">{video.uploadedBy.channelname}</div>
                    <div>{`${video.views} views . ${timeDisplay(video.createdAt)}`}</div>
                </div>
            </div>
        </NavLink>
    );
}

function disable(e) {
    if (e.target != e.currentTarget) return;
    console.log("clicked")
    e.currentTarget.style.display = "none";
}

export default function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/videos`, { credentials: 'include' });
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <home>{data.map(createCard)}</home>
            <div class="popupcontainer" onClick={e => disable(e)}></div>
        </>
    )
}
