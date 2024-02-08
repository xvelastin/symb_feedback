import React, {useState} from 'react';
import {Icons, Sections} from "../video_comic_data";

import style from "../styles.module.css"
import {BackgroundVideo} from "../../../components/backgroundVideo";


const path_to_video = "./toi/video/video_enter.mp4";

export default function Enter({onPageOpen})
{
    return (
        <>
            <BackgroundVideo src={path_to_video} playWhenReady={true} loop={true}/>

            <EnterButton onPageOpen={() => onPageOpen(Sections.GalleryID)}/>
        </>
    )
}


function EnterButton({onPageOpen})
{
    return (
        <>
            <div className={style.enter_button}>
                <a
                    onClick={onPageOpen}>
                    <EnterImage alt={"Click to enter"} size={15}/>
                </a>
            </div>
        </>
    )
    
    function EnterImage({alt, size})
    {
        const [src, setSrc] = useState("")
        
        function HandleHover(isHovering)
        {
            setSrc(isHovering ? Icons.EnterButtonHover : Icons.EnterButton)
        }
        
        return <img
            className={style.enter_image}
            title={alt}
            alt={alt}
            src={src !== "" ? src : Icons.EnterButton}
            onMouseOver={() => HandleHover(true)}
            onMouseOut={() => HandleHover(false)}
            style={{
                width: `${size}vw`,
            }}
        />
    }
}

