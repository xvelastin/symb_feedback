import React, {useEffect, useRef} from "react";
import style from "../styles.module.css";

export function FullScreenVideo({src, onCanPlayThrough, setRef}) {
    const videoRef = useRef(null);

    useEffect(() => {
        setRef(videoRef.current);
    }, [src]);

    return (
        <div id={"fullScreenVideo" + src}>
            <div className={style.focus_container}>
                <video
                    id={"fullScreenVideo"}
                    ref={videoRef}
                    className={style.focus_video}
                    src={src}

                    loop={true}
                    onCanPlayThrough={onCanPlayThrough ? () => onCanPlayThrough(videoRef.current) : null}
                    
                    // style={{pointerEvents: "none"}}
                />
            </div>
        </div>
    )
}