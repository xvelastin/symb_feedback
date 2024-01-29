import React, {useEffect, useRef} from "react";
import style from "./backgroundVideo.module.css"

export function BackgroundVideo({src, loop, playWhenReady, onReadyToPlay, onPlay}) {
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.load();
    }, [videoRef]);

    function OnCanPlay() {
        if (onReadyToPlay) onReadyToPlay(videoRef);
        if (playWhenReady) Play();
    }

    function Play() {
        videoRef.current.play();
        if (onPlay) onPlay(videoRef);
    }

    return (
        <>
            <div className={style.background_video_container}
            >
                <video

                    ref={videoRef}
                    className={style.background_video}
                    src={src}
                    loop={loop}
                    onCanPlayThrough={OnCanPlay}
                />
            </div>
        </>
    )
}