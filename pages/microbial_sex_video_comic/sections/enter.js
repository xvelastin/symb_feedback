import React from 'react';
import {Sections} from "../video_comic_data";

import style from "../styles.module.css"
import {BackgroundVideo} from "../../../components/backgroundVideo";


const path_to_video = "./toi/video/enter.mp4";

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
                    <EnterImage src={"./toi/bugs/bug16.png"} alt={"Click to enter"} size={15}/>
                </a>
            </div>
        </>
    )
    
    function EnterImage({src, alt, size})
    {
        return <img
            className={style.enter_image}
            title={alt}
            alt={alt}
            src={src}
            style={{
                width: `${size}vw`,
            }}
        />
    }
}

