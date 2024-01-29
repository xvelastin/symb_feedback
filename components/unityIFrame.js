import React, {useRef, useState} from 'react';

export default function UnityIFrame({id, iFrame_src, rectum}) {
    return (
        <div id={id ? id: `UnityWebGL_iFrame_${iFrame_src}`}>   
            <IFrame src={iFrame_src} rectum={rectum}/>
        </div>
    )
}


export function IFrame({src, rectum}) {
    const [isValid, setIsValid] = useState(true);
    const frame = useRef(null);

    return (
        <div id={`iFrame_${src}`} 
             style={{overflow: "clip"}}
        >
            {isValid ?
                <iframe
                    ref={frame}
                    src={src}
                    style={{
                        position: "relative",
                        overflow: "clip",
                        left: rectum ? rectum.xPos : 0,
                        top: rectum ? rectum.yPos : 0,
                        width: rectum ? rectum.width : 512,
                        height: rectum ? rectum.height : 512,
                    }}
                />
                :
                <p>❗ Error - invalid html file: {src}</p>
            }
        </div>
    )
}

// Defines a rectangle position on screen
export class Rectum {
    xPos;
    yPos;
    width;
    height;

    constructor(xPos, yPos, width, height) {
        this.xPos = `${xPos}vw`;
        this.yPos = `${yPos}vh`;
        this.width = `${width}vw`
        this.height = `${height}vh`
    }
}