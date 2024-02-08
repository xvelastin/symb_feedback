import React, {useEffect, useRef, useState} from 'react'
import {PopupLineOffsetPosition} from "../pages/front_page_data";

export default function Popup({highlighted, popup_id, img_src, position, width, alt})
{
    const [display, setDisplay] = useState(false)
    const imgRef = useRef(null);

    useEffect(() => {
        
        highlighted
            ? setDisplay(highlighted.id === popup_id)
            : setDisplay(false)
    }, [highlighted]);
    
    
    return (
        <div id={popup_id + "_popup"}>
            <img
                ref={imgRef}
                src={img_src}
                alt={alt}
                style={{
                    position: "fixed",
                    top: position.top + "vh",
                    left: position.left + "vw",
                    width: width ? width + "vw" : null,
                    display: display ? "block" : "none",          
                    zIndex: 2,
                    
                    // border: "2px solid black",
                }}
            />
            
            <PopupLine 
                highlighted={highlighted}
                targetPosition={position}
            />
        </div>
    )
}


function PopupLine({enabled, highlighted, targetPosition})
{
    const LINE_WIDTH = 2;
    const LINE_COLOUR = "black";

    const canvasRef = useRef(null)
    let _canvas, _context;

    const grabCanvas = () => _canvas ?? canvasRef.current ?? null;
    const grabContext = () => _context ??= grabCanvas()?.getContext('2d');

    useEffect(() => {
        UpdateCanvasSize();
        return () => {
            // ClearCanvas();
        }
    }, []);

    useEffect(() => {
        // console.log("PopupController", highlighted)

        highlighted
            ? DrawLine(highlighted)
            : ClearCanvas();
    }, [highlighted]);

    function ClearCanvas() {
        // console.log("ClearCanvas");

        const canvas = grabCanvas();

        grabContext().clearRect(0, 0, canvas.width, canvas.height);
    }

    function DrawLine(img)
    {
        UpdateCanvasSize();
        let coordinates = PopupLineOffsetPosition.Get(highlighted.id);

        const imgRect = img.getBoundingClientRect();
        const xPx = convertVwToPx(coordinates.start.x);
        const yPx = convertVhToPx(coordinates.start.y);
        const x_start = imgRect.x + convertVwToPx(coordinates.start.x) + (img.width / 2)  + window.scrollX;
        const y_start = imgRect.y + convertVhToPx(coordinates.start.y) + (img.height / 2)  + window.scrollY;
        
        const x_end = convertVwToPx(targetPosition.left + coordinates.end.x) + window.scrollX;
        const y_end = convertVhToPx(targetPosition.top + coordinates.end.y)  + window.scrollY;

        // console.log("start: ", x_start, y_start, "\n end: ", x_end, y_end)        

        const context = grabContext();
        context.beginPath();
        context.moveTo(x_start, y_start);
        context.lineTo(x_end, y_end);

        context.strokeStyle = LINE_COLOUR;
        context.lineWidth = LINE_WIDTH;
        context.stroke();
    }   
   

    const convertVwToPx = (vw= 50) => {
        const oneVwInPx = window.innerWidth / 100;
        return oneVwInPx * vw;
    };

    const convertVhToPx = (vh= 50) => {
        const oneVhInPx = window.innerHeight / 100;
        return oneVhInPx * vh;
    };

    function UpdateCanvasSize()
    {
        const canvas = grabCanvas();
        canvas.width =  window.innerWidth;
        canvas.height = window.innerHeight;
    }

    return (
        <div>
            <canvas
                width={1920}
                height={1080}
                ref={canvasRef}
                style={{
                    pointerEvents: "none",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            >

            </canvas>
        </div>
    )
}
