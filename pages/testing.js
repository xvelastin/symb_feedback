import React, {useEffect} from 'react'
import {VideoManager} from "./microbial_sex_video_comic/components/videoManager";

export default function Testing({}) {

    useEffect(() => {
        document.addEventListener("mousedown", function(e) {
            // console.log("mousedown", e);
        })
    }, []);
    
    return (
        <div id={"testingPage"}>
            <VideoManager/>
        </div>
    )
}

const VIDEO_COUNT = 5;
const PATH_TO_VIDEOS = "./toi/video"
const AUTOPLAY = true;

const VOLUME_FOCUSED = 0; // on gallery item hover, and for fullscreen vid
const VOLUME_UNFOCUSED = -18; // on gallery item de-hover

const GALLERY_VIDEO_ATTACK_TIME = 500; // on gallery item hover
const GALLERY_VIDEO_RELEASE_TIME = 2000; // on gallery item de-hover, and fullscreen vid off 

const FULLSCREEN_VIDEO_ATTACK_TIME = 100;
const FULLSCREEN_VIDEO_RELEASE_TIME = 2000;


