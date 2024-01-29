import React, {useEffect, useRef, useState} from 'react';
import {path_to_bugs} from "../video_comic_data";
import * as AudioUtils from '../../../components/audioUtils'
import {Images} from "../../../AssetReferences";


import style from "../styles.module.css"
import {getRandomFloat, getRandomInt} from "../../../components/audioUtils";

const fadeInTime = 80;
const fadeOutTime = 2000;


export default function Focus({video, onRandom, onExit}) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(AudioUtils.minimum_volume);

    useEffect(() => {
        if (!videoRef || !videoRef.current) return;
        videoRef.current.volume = AudioUtils.clamp(AudioUtils.dbtoa(volume), 0, 1);
    }, [volume]);

    useEffect(() => {
        return () => {
            console.log("focus unmounted")
        }
    }, []);

    function triggerPlayback() {
        if (!videoRef || !videoRef.current) return;

        if (isPlaying) return;

        // // match video time to incoming video time -- think obsolete
        // videoRef.current.currentTime = video.currentTime;

        // fade in and play
        setVolume(AudioUtils.minimum_volume)
        play(videoRef.current, function () {
            fadeTo(0, fadeInTime);
            setIsPlaying(true)
        })
    }

    async function play(videoElement, playCallback) {
        try {
            await videoElement.play();
            playCallback();
        } catch (err) {
            console.error(err);
        }
    }

    function close() {
        if (!videoRef || !videoRef.current) return;

        fadeTo(AudioUtils.minimum_volume, fadeOutTime, stop);

        onExit();
    }

    function stop() {
        if (!videoRef || !videoRef.current) return;

        videoRef.current.pause();
        setIsPlaying(false);
        videoRef.current = null;
    }

    let animationFrameId;

    function fadeTo(targetVolume, fadeTime, endFadeCallback) {
        let startTime;
        let startingVolume = volume;
        let lastElapsed = 0;

        function animate() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;

            if (elapsed !== lastElapsed) {
                const progress = elapsed / fadeTime;

                // console.log(`time: ${elapsed}. progress: ${progress}`);
                lastElapsed = elapsed;

                if (progress < 1) {
                    setVolume(prevVolume => {
                        return lerp(startingVolume, targetVolume, progress);
                    });
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    if (videoRef) setVolume(targetVolume);
                    if (endFadeCallback) endFadeCallback();
                    ClearFadeHandler();
                }
            } else {
                animationFrameId = requestAnimationFrame(animate);
            }
        }

        ClearFadeHandler();
        startTime = Date.now();
        animate();
        return animationFrameId;

        function lerp(start, end, progress) {
            return start + progress * (end - start);
        }
    }

    function ClearFadeHandler() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    function chooseNew() {
        console.log("choose new");
        close();
        onRandom();
    }

    if (video) {
        return (
            <>
                <div id={"Bug Container"} className={style.bug_container}>
                    <GoBackBug onClick={close}/>

                    <RandomVideoBugContainer numberOfBugs={6} onClick={chooseNew}/>

                </div>

                <div id={"Focused Video Container"} className={style.focus_container}>
                    <video
                        className={style.focus_video}
                        ref={videoRef}
                        src={video.src}
                        loop={true}
                        onCanPlayThrough={triggerPlayback}
                    />

                </div>


                {/*    Todo: add bugs */}
            </>
        )
    } else {
        return null; // todo: loading state?
    }
}

function RandomVideoBugContainer({numberOfBugs, onClick}) {
    const bugs = Array.from({ length: numberOfBugs });
    const [displayBugs, setDisplayBugs] = useState(false);
    
    function timeout() {
        // return getRandomInt(50, 70) * 1000;
        return 150;
    }
    let displayTimeoutHandler;

    useEffect(() => {
        displayTimeoutHandler = setTimeout(() => setDisplayBugs(true), timeout())
        
        return () => { clearTimeout(displayTimeoutHandler)}
    }, []);

    return (
        bugs.map((_, index) => (displayBugs ?
                <RandomVideoBug   
                    key={index}    
                    onClick={onClick}/>
                : null
        ))
    )
}


function GoBackBug({onClick}) {

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: "5%",
                    left: "88%"
                }}>
                <BugLink image_src={`${path_to_bugs}/bug11.png`} image_alt={"click to return to gallery"} image_size={200}
                         onClick={onClick}/>
            </div>

        </>
    )
}

function RandomVideoBug({onClick, yOffset, xOffset}) {
    const [position, setPosition] = useState({
        top: GetRandomPosition(),
        left: GetRandomPosition(),
    });

    const [bugPath, setBugPath] = useState(GetRandomBugPath());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPosition({
                top: `${GetRandomPosition()}%`,
                left: `${GetRandomPosition()}%`,
            });
        }, getRandomFloat(500, 1000));

        return () => clearInterval(intervalId);  // Cleanup on component unmount
    }, []);
    
    
    function GetRandomPosition() {
        const randomPosition = AudioUtils.getRandomInt(10, 90) + "%";
        console.log("GetRandomPosition: "  + randomPosition)
        return randomPosition;
    }

    function GetRandomBugPath()
    {
        // console.log("GetRandomBugPath")
        const bugs = 17;
        return path_to_bugs + "bug" + AudioUtils.getRandomInt(1, bugs) + ".png"
    }

    return (
        <>
            <div
                style={{
                    top: `${position.top}%`,
                    left: `${position.left}%`,
                    transition: `top ${getRandomInt(15, 25)}s, left ${getRandomInt(15, 25)}s`,
                }}>
                <BugLink
                    image_src={bugPath}
                    image_alt={"click to choose a random video"}
                    image_size={80}
                    onClick={onClick}
                />
            </div>
        </>
    );
}

function BugLink({image_src, image_alt, image_size, onClick}) {
    const bugRef = useRef(null);

    return (
        <>
            <div className={style.bug_link}
                 ref={bugRef}
                 // style={{
                 //     animationName: "rotate",
                 //     animationDuration: `${Math.random() * 30}s`,
                 //     animationIterationCount: "infinite",
                 //     animationTimingFunction: "linear"
                 // }}
            >
                <a
                    onClick={onClick}>
                    <img
                        className={style.link_image}
                        title={image_alt}
                        alt={image_alt}
                        src={image_src}
                        style={{
                            width: image_size,
                        }}
                    />
                </a>
            </div>
        </>
    )
}
