import React, {useEffect, useRef} from "react";
import {PATH_TO_VIDEOS, VIDEO_COUNT, VIDEOS_TO_PLAY, VOLUME_UNFOCUSED} from "./videoManager";
import {dbtoa, Utils} from "../../../components/audioUtils"
import style from "../styles.module.css";

export function GalleryWall({onCanPlayThrough, onClick, onHoverStart, onHoverEnd}) {
    const videoFileNumbers = Array.from({length: VIDEO_COUNT}, (_, index) => ((index % VIDEOS_TO_PLAY) + 1));
    const videoFileNames = videoFileNumbers.map(number => `${PATH_TO_VIDEOS}/video_${number}_lq.mp4`);

    return (
        <div id={"gallery"} className={style.gallery_wall}>
            <GalleryGrid rows={3} columns={4}
                videoFileNames={videoFileNames}
                onCanPlayThrough={onCanPlayThrough}
                onClick={onClick}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
            />
        </div>
    )
}

function GalleryGrid({rows, columns, videoFileNames, onCanPlayThrough, onClick, onHoverStart, onHoverEnd}) {
    const numberOfRows = Array.from({length: rows});

    return (
        <div>
            {numberOfRows.map((_, index) => (
                <GalleryRow 
                    key={index} 
                    videoFileNames={videoFileNames}
                    
                    range={calculateRange(index, columns)}
                    rowIndex={index}

                    onCanPlayThrough={onCanPlayThrough}
                    onClick={onClick}
                    onHoverStart={onHoverStart}
                    onHoverEnd={onHoverEnd}                
                />
            ))}
        </div>
    )

    function calculateRange(index, columns) {
        const startIndex = index * columns;
        const endIndex = startIndex + columns - 1;
        return [startIndex, endIndex];
    }
}


function GalleryRow({videoFileNames, range, rowIndex, onCanPlayThrough, onClick, onHoverStart, onHoverEnd }) {
    const [min, max] = range;
    const rangedVideoFileNames = videoFileNames.slice(min, max + 1);

    return (
        <>
            <div className={style.gallery_row}>
                {rangedVideoFileNames.map((fileName, index) => (
                    <GalleryVideo
                        key={index}
                        index={index + ((rowIndex) * rangedVideoFileNames.length)}
                        src={fileName}
                        onCanPlayThrough={onCanPlayThrough}
                        onClick={onClick}
                        onHoverStart={onHoverStart}
                        onHoverEnd={onHoverEnd}
                    />
                ))}
            </div>
        </>
    )
}




function GalleryVideo({src, index, onCanPlayThrough, onClick, onHoverStart, onHoverEnd}) {
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.volume = dbtoa(VOLUME_UNFOCUSED)
    }, []);

    return (
        <div id={"galleryVideo_" + src}>
            <div className={style.gallery_video_container}>
                <video
                    id={"galleryVideo_" + index + "_" + Utils.getFilename(src)}
                    ref={videoRef}
                    className={style.gallery_video}
                    src={src}

                    loop={true}
                    onCanPlayThrough={onCanPlayThrough ? () => onCanPlayThrough(videoRef.current) : null}
                    onMouseEnter={onHoverStart ? () => onHoverStart(videoRef.current): null}
                    onMouseLeave={onHoverEnd ? () => onHoverEnd(videoRef.current): null}
                    onClick={onClick ? () => onClick(videoRef.current): null}

                    style={{
                        opacity: 0,
                        pointerEvents: "none",
                    }}
                />
            </div>
        </div>
    )
}
