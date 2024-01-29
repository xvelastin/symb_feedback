import React, {useEffect, useRef, useState} from 'react';


export default function ImageClickDetector({src, img_width, onClick, onHoverStart, onHoverEnd}) {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    
    const [isHovering, setIsHovering] = useState(false)
    let context;
    

    const getCanvas = () => canvasRef.current;   
    const getContext = () => {
        if (!context) context =  getCanvas().getContext('2d');
        return context;
    };

    useEffect(() => {
        if (isHovering) onHoverStart?.(imgRef);
        else onHoverEnd?.(imgRef);
    }, [isHovering]);
  
    
    function isPixelUnderCursorVisible(clickEvent)
    {
        const canvas = getCanvas();
        
        const rect = canvas.getBoundingClientRect();
        const x = clickEvent.clientX - rect.left;
        const y = clickEvent.clientY - rect.top;
        const imageData = getContext().getImageData(x, y, 1, 1);
        const pixel = imageData.data;
        
        return pixel[3] !== 0;
    }
    
    function createImageOnCanvas()
    {
        const canvas = getCanvas();

        const img = imgRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        getContext().drawImage(img, 0, 0, img.width, img.height);
    }
    
    function clearCanvas()
    {
        const canvas = getCanvas();
        getContext().clearRect(0, 0, canvas.width, canvas.height);
    }
    
  
    function HandleMouseEnter()
    {
        // console.log("HandleMouseEnter")
        clearCanvas();
        createImageOnCanvas();
    }
    
    function HandleMouseExit()
    {
        // console.log("HandleMouseExit")
        setHoverState(false);
        clearCanvas();
    }

    function HandleMouseMove(moveEvent)
    {
        // console.log("HandleMouseMove", moveEvent);        
       setHoverState(isPixelUnderCursorVisible(moveEvent));            
    }
    
    function setHoverState(newState)
    {
        if (isHovering !== newState) {
            setIsHovering(newState);
            // console.log("setting hover state to " + newState)
        }
    }



    function HandleClick(event){
        const canvas = canvasRef.current;

        if (isPixelUnderCursorVisible(event)) onClick?.();
    }

    return (
        <div style={{        
            position: "fixed",
            top: "20vh",
            border: "1px solid black",
        }}>
            <img
                src={src}
                ref={imgRef}
                alt="gif"
                style={{
                    width: img_width,
                    border: '1px solid red',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    // display: 'none'
            }}
            />
            <canvas
                ref={canvasRef}
                
                onClick={HandleClick}
                onMouseMove={HandleMouseMove}
                onMouseEnter={HandleMouseEnter}
                onMouseLeave={HandleMouseExit}
                
                style={{                   
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 0,
                    border: "1px solid green",
                    // display: 'none' 
            }}
            />
        </div>
    );
};

