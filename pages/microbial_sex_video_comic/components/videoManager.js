import React, {useEffect, useRef, useState} from "react";
import {minimum_volume, Utils} from "../../../components/audioUtils"
import {GalleryWall} from "./galleryWall";
import {FullScreenVideo} from "./fullScreenVideo";
import {FadeTo} from "../../../components/fadeTo";
import {GoBackBug, RandomVideoBugContainer} from "./videoBugs";


export const VIDEO_COUNT = 12;
export const VIDEOS_TO_PLAY = 5;
export const PATH_TO_VIDEOS = "./toi/video"
export const AUTOPLAY = true;

export const VOLUME_FOCUSED = 0; // on gallery item hover, and for fullscreen vid
export const VOLUME_UNFOCUSED = -18; // on gallery item de-hover

export const GALLERY_VIDEO_ATTACK_TIME = 150; // on gallery item hover
export const GALLERY_VIDEO_RELEASE_TIME = 2000; // on gallery item de-hover, and fullscreen vid off 

export const FULLSCREEN_VIDEO_ATTACK_TIME = 50; // on open fullscreen
export const FULLSCREEN_VIDEO_RELEASE_TIME = 2000; // on go back to gallery
export const FULLSCREEN_SWITCH_FADE_TIME = 150; // on choose new video by random bug


export function VideoManager({}) {
    const [displayFullScreenVideo, setDisplayFullScreenVideo] = useState(false);
    const [focusedVideoSrc, setFocusedVideoSrc] = useState(null);

    const fullScreenVideoRef = useRef(null);
    let videoElements = useRef(new Map()); // key: video ID, value: video element
    let fadeHandlers = useRef(new Map()); // key: video ID; value: frameHandlerID

    useEffect(() => {
        console.log(...videoElements.current);
        console.log(...fadeHandlers.current)
        return () => {
            videoElements.current?.forEach((video) => {
                video.pause();
            })
            videoElements.current = new Map();

            const fadeHandlerArray = Array.from(fadeHandlers.current)
            fadeHandlerArray?.forEach((keyPair) => {
                ClearFadeHandler(keyPair[0]);
            })
            fadeHandlers.current = new Map();
        }
    }, []);

    useEffect(() => {
        if (displayFullScreenVideo) {
            StopGalleryVideos();
            PlayFullScreenVideo();
        } else {
            PlayGalleryVideos();
            StopFullScreenVideo();
        }
    }, [displayFullScreenVideo]);


    function HandleVideoGalleryCanPlayThrough(_videoElement) {
        // console.log("HandleVideoGalleryCanPlayThrough", _videoElement)

        videoElements.current.set(_videoElement.id, _videoElement);
        if (videoElements.current.size < VIDEO_COUNT) {
            HandleGalleryVideosNotYetLoaded()
        } else {
            HandleAllGalleryVideosLoaded();
        }
    }

    function HandleGalleryVideosNotYetLoaded() {
        console.log("HandleGalleryVideosNotYetLoaded", videoElements.current.size)
    }

    function HandleAllGalleryVideosLoaded() {
        console.log("HandleAllGalleryVideosLoaded", videoElements.current.size);
        // todo: display videos

        videoElements.current.forEach((video) => {
            video.style.opacity = 1;
            video.style.pointerEvents = "auto";
        })

        if (AUTOPLAY) {
            PlayGalleryVideos();
        }
    }

    // Video Playback //   

    function PlayGalleryVideos() {
        // console.log("PlayGalleryVideos")
        videoElements.current.forEach((video) => {
            video.play();
            DoFade(video, VOLUME_UNFOCUSED, GALLERY_VIDEO_ATTACK_TIME);
        })
    }

    function StopGalleryVideos() {
        videoElements.current.forEach((video) => {
            DoFade(video, minimum_volume, GALLERY_VIDEO_RELEASE_TIME, function () {
                video.pause();
            });
        })
    }

    function PlayFullScreenVideo() {
        if (!fullScreenVideoRef.current) return;
        // console.log("PlayFullScreenVideo", fullScreenVideoRef.current)
        
        fullScreenVideoRef.current.currentTime = 0;
        fullScreenVideoRef.current.play();
        DoFade(fullScreenVideoRef.current, VOLUME_FOCUSED, FULLSCREEN_VIDEO_ATTACK_TIME)
    }

    function StopFullScreenVideo() {
        if (!fullScreenVideoRef.current) return;

        DoFade(fullScreenVideoRef.current, minimum_volume, FULLSCREEN_VIDEO_RELEASE_TIME, function () {
            fullScreenVideoRef?.current.pause();
        })
    }

    // FADES //

    function DoFade(element, targetVolume, fadeTime, onEndFade) {
        ClearFadeHandler(element.id);

        // console.log(`Fade called on ${element.id}. Fading from ${atodb(element.volume)} to ${targetVolume} over ${fadeTime}. OnEndFade: ${onEndFade}`)

        FadeTo(element, targetVolume, fadeTime,
            function (animID) {
                // console.log(`adding ${animID} to fadeHandlers with key ${element.id}`)
                fadeHandlers.current.set(element.id, animID);
            },
            function () {
                onEndFade?.();
            })
    }

    function ClearFadeHandler(elementID) {
        // console.log("stopping fade for " + elementID)

        let animationFrameId = fadeHandlers.current.get(elementID);
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            fadeHandlers.current.delete(elementID);
        }
    }


    // Gallery Video Handlers //

    function HandleGalleryVideoHoverStart(_videoElement) {
        // console.log("HandleGalleryVideoHoverStart", _videoElement)

        DoFade(_videoElement, VOLUME_FOCUSED, GALLERY_VIDEO_ATTACK_TIME);
        SetGalleryItemBorders(_videoElement, true)
    }

    function HandleGalleryVideoHoverEnd(_videoElement) {
        if (displayFullScreenVideo) return;
        // console.log("HandleGalleryVideoHoverEnd", _videoElement)

        DoFade(_videoElement, VOLUME_UNFOCUSED, GALLERY_VIDEO_RELEASE_TIME);
        SetGalleryItemBorders(_videoElement, false);
    }

    function HandleGalleryVideoClick(_videoElement) {
        // console.log("on click video element", _videoElement)

        // set focused video source to clicked gallery video source
        setDisplayFullScreenVideo(true);
        setFocusedVideoSrc(_videoElement.src);
        SetGalleryItemBorders(_videoElement, false);
    }
    
    function SetGalleryItemBorders(_videoElement, borderVisibility)
    {
        _videoElement.style.border = borderVisibility ? "1px solid white" : "none";
    }


    // Fullscreen Video Handlers    
    function HandleCanPlayThroughFullscreenVideo(_videoElement) {
        console.log("HandleCanPlayThroughFullscreenVideo", _videoElement);
    }

    function HandleReturnToGalleryView(_videoElement) {
        // console.log("HandleReturnToGalleryView", _videoElement)
        setDisplayFullScreenVideo(false);
    }

    function HandleRandomBugClick() {
        // console.log("HandleRandomBugClick")

        const current = fullScreenVideoRef.current;

        // choose a new video to play that isn't this one
        let randomVideo;
        do randomVideo = Array.from(videoElements.current)[Utils.getRandomInt(0, videoElements.current.size - 1)][1];
        while ((randomVideo.src === current.src))

        // console.log("original src: " + current.src + " // random video src: " + randomVideo.src)

        DoFade(fullScreenVideoRef.current, minimum_volume, FULLSCREEN_SWITCH_FADE_TIME, function () {
            setDisplayFullScreenVideo(true);
            setFocusedVideoSrc(randomVideo.src);
            setTimeout(() => {
                PlayFullScreenVideo();
            }, 0)
        })
    }


    return (
        <>
            <div id={"galleryView"} style={{
                width: "100%",
                height: "100%",
                display: displayFullScreenVideo ? "none" : "block",
            }}>
                <GalleryWall
                    onCanPlayThrough={HandleVideoGalleryCanPlayThrough}
                    onClick={HandleGalleryVideoClick}
                    onHoverStart={HandleGalleryVideoHoverStart}
                    onHoverEnd={HandleGalleryVideoHoverEnd}
                />
            </div>

            <div id={"focusView"} style={{
                width: "100%",
                height: "100%",
                display: displayFullScreenVideo ? "block" : "none",
            }}>
                <FullScreenVideo
                    src={focusedVideoSrc ? focusedVideoSrc : PATH_TO_VIDEOS + "/video10.mp4"}
                    shouldPlay={displayFullScreenVideo}
                    setRef={(r) => fullScreenVideoRef.current = r}
                />
                
                <GoBackBug 
                    onClick={HandleReturnToGalleryView}
                />
                
                <RandomVideoBugContainer 
                    numberOfBugs={Utils.getRandomInt(3, 7)}
                    onClick={HandleRandomBugClick}
                    shouldDisplayBugs={displayFullScreenVideo}
                    />
            </div>
        </>
    )
}
