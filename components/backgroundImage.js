import React from 'react';

export default function Background({src, background_color, opacity})
{
    return (
        <div style={{
            zIndex: -1000,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: background_color ? background_color : null,
        }}>
            {src 
                ?  <img
                    alt={"background image"}
                    src={src}
                    style={{                       
                        width: "100%",
                        height: "100%",
                        opacity: opacity ? opacity : "100%",
                    }}
                />
                : null
            }
           
        </div>
        
       
    )
}
