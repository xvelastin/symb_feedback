import React from 'react';

import toiVideosStyles from "../pages/microbial_sex_video_comic/styles.module.css"
import toiGameStyles from "../pages/cybershore_meditations/styles.module.css"

export function MicrobeBackButton({id, className, image_src, onClick, tooltip, size, left, top, cursorOnHover})
{
    return (
        <>
            <div className={className ? className : "MicrobeBackButton"} id={id ? id : ""}>
                <a
                    onClick={onClick}>
                    <Image src={image_src} alt={tooltip} size={size}/>
                </a>
            </div>
        </>
    )

    function Image({src, alt, size}) {
        return <img
            className={"link-image"}
            title={alt}
            alt={alt}
            src={src}
            style={{
                zIndex: "100",
                position: "fixed",
                width: `${size}vw`,
                top: top ? `${top}vh` : 0,
                left: left ? `${left}vw` : 0, 
                cursor: `url(${cursorOnHover}), pointer`  ?? "pointer",
            }}
        />
    }

}
