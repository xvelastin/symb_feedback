import React, {memo, Suspense, useCallback, useEffect, useRef, useState} from 'react';

import * as AudioUtils from '../../../components/audioUtils'
import Focus from "./focus";

import style from "../styles.module.css"

const path_to_videos = "./toi/video"
const VIDEO_COUNT = 4;
const AUTOPLAY = true;

// Audio Settings

const volumeOnHover = 0;
const fadeTimeOnHover = 666;

const volumeDefault = -18;
const fadeTimeToDefaultVolume = 2000;

const volumeOnUnfocus = -36;
const fadeTimeOnUnFocus = 1000;

export default function Gallery({}) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isFullyLoaded, setIsFullyLoaded] = useState(false); // set to false when out of dev

    const videosLoaded = useRef(0);

    useEffect(() => {
        console.log("1 gallery loaded")
        return () => {
            console.log("1 gallery unloaded")
        }
    }, []);

    function handleGalleryVideoClick(videoElementRef) {
        setIsFullScreen(true);
    }

    function handleFullScreenExit() {
        setIsFullScreen(false);
    }

    function handleVideoLoaded(videoRefs) {
        videosLoaded.current = videoRefs.current.length;

        console.log(`${videosLoaded.current} videos loaded...`);
        if (videosLoaded.current >= VIDEO_COUNT) handleAllVideosLoaded();
    }

    function handleAllVideosLoaded() {
        setIsFullyLoaded(videosLoaded.current >= VIDEO_COUNT);
        console.log(`All videos loaded.`)
    }

    return (
        <div className={style.gallery}>

            {!isFullyLoaded &&
                <div>
                    <h1 className={style.loading}>loading...</h1>
                </div>}

            <div className={style.gallery_wall}>
                <GalleryWall onVideoClick={handleGalleryVideoClick}
                             isFullyLoaded={isFullyLoaded}
                             isFullScreen={isFullScreen}
                             onFullScreenExit={handleFullScreenExit}
                             onVideoLoaded={handleVideoLoaded}
                />
            </div>

        </div>
    )
}


function GalleryWall({isFullScreen, isFullyLoaded, shouldPlay, onVideoClick, onFullScreenExit, onVideoLoaded}) {
    const videoFileNames = Array.from({length: VIDEO_COUNT}, (_, index) => `${path_to_videos}/video${index + 1}.mp4`);

    let videoRefs = useRef([])
    const [focusedVideo, setFocusedVideo] = useState(null);

    useEffect(() => {
        console.log("B gallery wall mounted")
        return () => {
            videoRefs.current = [];
            console.log("B gallery wall unmounted")
        }
    }, []);

    function OnVideoUnmount() {

    }

    const handleGalleryVideoClick = useCallback((videoElementRef) => {
        setFocusedVideo(videoElementRef);
        onVideoClick(videoElementRef);
    }, [onVideoClick]);

    function handleFocusVideoExit() {
        setFocusedVideo(null);
        onFullScreenExit();
    }

    function handleFocusRandom() {
        const videoCount = videoRefs.current.length;
        const indexOfCurrent = videoRefs.current.indexOf(focusedVideo);
        
        

        let randomIndex = AudioUtils.getRandomInt(0, videoCount - 1);

        console.log(`current id: ${indexOfCurrent}. new: ${randomIndex}`)
        // todo: exclude current index from random (do while?)  

        let randomVideo = videoRefs.current[randomIndex];

        setFocusedVideo(randomVideo);
        onVideoClick(randomVideo);
    }
    
    const AddToVideoRefs = useCallback((videoElementRef) => {
        if (videoRefs.current.length > VIDEO_COUNT) return; // dirty

        videoRefs.current.push(videoElementRef);
        if (onVideoLoaded) onVideoLoaded(videoRefs);
    }, [onVideoLoaded]);


    return (
        <>
            <div className={style.gallery_wall}
                 style={{
                     opacity: isFullScreen ? "0" : "100%",
                     // transition: "opacity 0.5s linear"  // currently too jumpy, but maybe with better optimisation it will be smooth
                 }}>
                
                {/*<GalleryRow range={[4, 4]}/>*/}
                
                <GalleryGrid rows={3} columns={4}/>
            </div>

            {focusedVideo
                ? <Focus video={focusedVideo.current}
                         onRandom={handleFocusRandom}
                         onExit={handleFocusVideoExit}/>
                : null}
        </>)

    function GalleryGrid({rows, columns}) {
        const numberOfRows = Array.from({length: rows});

        useEffect(() => {
            console.log("C GalleryGrid mounted");

            return () => {
                console.log("C GalleryGrid unmounted");
            };
        }, []);

        return (
            <div>
                {numberOfRows.map((_, index) => (
                    <GalleryRow key={index} range={calculateRange(index, columns)}/>
                ))}
            </div>
        )

        function calculateRange(index, columns) {
            const startIndex = index * columns;
            const endIndex = startIndex + columns - 1;
            return [startIndex, endIndex];
        }
    }
    
    

    function GalleryRow({range}) {
        const [min, max] = range;
        const rangedVideoFileNames = videoFileNames.slice(min, max + 1);

        useEffect(() => {
            console.log("D gallery row mounted")
            return () => {
                console.log("D gallery row unmounted")
            }
        }, []);

        return (
            <>
                <div className={style.gallery_row}>
                    {rangedVideoFileNames.map((fileName, index) => (
                        <GalleryVideo
                            key={index}
                            src={fileName}
                            loop={true}
                            isFullScreen={isFullScreen}
                            playWhenReady={AUTOPLAY}
                            onClick={handleGalleryVideoClick}
                            onReadyToPlay={AddToVideoRefs}
                        />
                    ))}
                </div>
            </>
        )
    }
}


function GalleryVideo ({src, loop, isFullScreen, playWhenReady, onReadyToPlay, onPlay, onClick}) {
    const videoRef = useRef(null);
    
    const [volume, setVolume] = useState(volumeDefault);
    const [isReady, setIsReady] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        console.log("E gallery video mounted")
        return () => {
            console.log("E gallery video unmounted")
        }
    }, []);

    useEffect(() => {
        if (!videoRef) return;
        console.log("is full screen changed to " + isFullScreen)

        if (isFullScreen) {
            // todo: set to call pause only once full screen is loaded
            // FadeOutAndPause();
            Pause();
        } else {
            if (hasStarted)
                FadeInAndPlay();
        }
        //  //doFade(isFullScreen ? volumeOnUnfocus : volumeDefault, fadeTimeOnUnFocus, isFullScreen ? FadeOutAndPause : null)
    }, [isFullScreen]);

    useEffect(() => {
        if (!videoRef) return;

        videoRef.current.volume = AudioUtils.clamp(AudioUtils.dbtoa(volume), 0, 1);
    }, [volume]);

    function OnCanPlay() {
        console.log("can play " + videoRef.current + "isready? "+ isReady)
        if (isReady) return;
        
        setIsReady(true);

        if (onReadyToPlay) onReadyToPlay(videoRef);

        if (playWhenReady && !isFullScreen) FadeInAndPlay();
    }

    function FadeInAndPlay(fadeTime) {
        if (!videoRef.current.paused) return;
        
        console.log("fade in and play on " + videoRef.current)
        setVolume(AudioUtils.minimum_volume);
        
        // set random start time
        videoRef.current.currentTime = Math.random() * videoRef.current.duration; 
        
        console.log(videoRef.current.currentTime)
                
        Play();
        doFade(volumeDefault, fadeTime ? fadeTime : fadeTimeToDefaultVolume);
        if (onPlay) onPlay(videoRef);
    }

    function FadeOutAndPause(fadeTime) {
        if (videoRef.current.paused) return;
        // console.log("fade out and pause")
        doFade(AudioUtils.minimum_volume, fadeTime ? fadeTime : fadeTimeOnUnFocus, Pause);
    }

    function Play() {
        if (!videoRef || !videoRef.current.paused) return;
        // console.log("calling play on " + videoRef.current.src)
        
        console.log(`Current time: ${videoRef.current.currentTime}`);
        
        videoRef.current.play();
        
        if (onPlay) onPlay(videoRef);
        if (!hasStarted) setHasStarted(true);
    }

    function Pause() {
        if (!videoRef || videoRef.current.paused) return;
        console.log("calling pause on " + videoRef.current.src)
        
        videoRef.current.pause();
    }

    function onHoverStart() {
        // console.log(`Mouse hovering over ${videoRef.current.src}`)

        if (!isFullScreen) doFade(volumeOnHover, fadeTimeOnHover);
    }

    function onHoverEnd() {
        // console.log(`Mouse leaves ${videoRef.current.src}`)
        if (!isFullScreen) doFade(volumeDefault, fadeTimeToDefaultVolume);
    }

    function doFade(targetVolume, fadeTime, endFadeCallback) {
        fadeTo(targetVolume, fadeTime, endFadeCallback);
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
    
    return (
        <div className={style.gallery_video_container}>
            <video
                ref={videoRef}
                className={style.gallery_video}
                src={src}

                loop={loop}
                onCanPlayThrough={OnCanPlay}
                onMouseEnter={onHoverStart}
                onMouseLeave={onHoverEnd}
                onClick={() => onClick(videoRef)}
            />
        </div>
    )
}
