import React, {useEffect, useRef, useState} from 'react';

export function ImageLink({
                              id,
                              image_url,
                              className,
                              position,
                              x_position,
                              y_position,
                              canvas_reference_image,
                              detect_transparency = true,
                              detect_underfoot = false,
                              onClick,
                              onMouseDown,
                              onMouseUp,
                              onHoverStart,
                              onHoverEnd,
                              alt,
                              tooltip,
                              cursor_default,
                              cursor_hover,
                          }) {
    
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const referenceImageRef = useRef(null)
    const underfootCanvasRef = useRef(null);
    const isHovering = useRef(false);
    const lastHoverEventPosition = useRef({x: 0, y: 0});

    let _canvas, _context;

    const grabCanvas = () => _canvas ?? canvasRef.current;
    const grabContext = () => _context ??= grabCanvas().getContext('2d', {willReadFrequently: true});

    useEffect(() => {
        setTimeout(() => UpdateImageOnCanvas(), 50)

        window.addEventListener('resize', function () {
            UpdateImageOnCanvas();
        })
    }, []);

    function SendHoverCallback(hoverState) {
        if (hoverState) {
            onHoverStart?.(imgRef);
            grabCanvas().style.cursor = cursor_default ?? "pointer";
        } else {
            onHoverEnd?.(imgRef);
            if (!detect_underfoot) {
                grabCanvas().style.cursor = cursor_hover ?? "auto"; // hacky but prevents auto cursor on other clickable image, does mean there's a pointer on transparent but not clickable
            }
        }
    }


    function UpdateImageOnCanvas() {

        if (!imgRef.current) return;
        // console.log(id, "UpdateImageOnCanvas")

        ClearCanvas();
        const canvas = grabCanvas();
        const img = imgRef.current;
        canvas.width = img.width;
        canvas.height = img.height > 0 ? img.height : 666; // sometimes, img.height returns zero so this ensures the canvas doesn't scrunch down to nothingness
        grabContext().drawImage(referenceImageRef.current ?? img, 0, 0, img.width, img.height);
    }


    function isPixelUnderCursorVisible(evt) {
        const canvas = grabCanvas();
        const context = grabContext();

        const rect = canvas.getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;
        const imageData = context.getImageData(x, y, 1, 1);
        const pixel = imageData.data;

        // console.log(canvas, x, y, pixel, evt)
        return pixel[3] !== 0;
    }

    function ClearCanvas() {
        const canvas = grabCanvas();
        if (!canvas) return;
        grabContext().clearRect(0, 0, canvas.width, canvas.height);
    }


    function HandleMouseBoundingBoxEnter(event) {
        // console.log(id, "HandleMouseBoundingBoxEnter")
        if (detect_transparency) {
            UpdateImageOnCanvas();
        } else {
            SetHoverState(true);
        }
    }

    function HandleMouseBoundingBoxExit(event) {
        // console.log(id, "HandleMouseBoundingBoxExit", event.clientX, event.clientY)
        SetHoverState(false);

        // if (updateImageOnCanvasIntervalHandler) clearInterval(updateImageOnCanvasIntervalHandler);
    }

    function HandleMouseMove(moveEvent) {
        // console.log(id, "HandleMouseMove", moveEvent.clientX, moveEvent.clientY);   

        if (!detect_transparency) return;

        lastHoverEventPosition.current.x = moveEvent.clientX;
        lastHoverEventPosition.current.y = moveEvent.clientY;

        let overVisible = isPixelUnderCursorVisible(moveEvent);
        SetHoverState(overVisible)

        // console.log(id, "overVisible?" + overVisible)

        if (detect_underfoot && !overVisible) PassPointerEventDown(moveEvent)
    }

    function SetHoverState(newState) {
        if (isHovering.current !== newState) {
            // console.log(id, "setting hover state from ", isHovering.current, "to", newState)
            isHovering.current = newState;
        }
        SendHoverCallback(newState)
    }

    function HandleClick(event) {
        if (detect_transparency) {
            if (isPixelUnderCursorVisible(event)) {
                onClick?.(imgRef);
            } else if (detect_underfoot) {
                PassPointerEventDown(event)
            }
        } else {
            onClick?.(imgRef);
        }
    }

    function HandleMouseDown(event) {
        if (!detect_transparency || isPixelUnderCursorVisible(event)) {
            onMouseDown?.(imgRef);
        }
    }

    function HandleMouseUp(event) {
        if (!detect_transparency || isPixelUnderCursorVisible(event)) {
            onMouseUp?.(imgRef);
        }
    }


    function CreatePointerEvent(eventType, x, y) {
        // console.log(eventType, x, y)
        return new PointerEvent(eventType, {
            bubbles: true,
            view: window,
            pointerType: 'mouse',
            clientX: x,
            clientY: y,
        })
    }

    function PassPointerEventDown(pointerEvent) {
        // console.log("PassPointerEventDown", pointerEvent);

        const canvas = grabCanvas();
        const x = pointerEvent.clientX;
        const y = pointerEvent.clientY;

        let underfoot;

        if (!underfootCanvasRef.current) // note, using this check means it doesnt update if the images move around but in this case they dont
        {
            canvas.style.pointerEvents = "none";
            let elementFromPoint = document.elementFromPoint(x, y);
            if (elementFromPoint.tagName === 'CANVAS') {
                underfootCanvasRef.current = document.elementFromPoint(x, y);
                canvas.style.pointerEvents = "auto";
            }
        }

        underfoot = underfootCanvasRef.current;
        // console.log("underfoot object", underfoot)

        let event = CreatePointerEvent(pointerEvent.type, x, y);
        // console.log("source:" + id, "target: " + underfoot.id, "type: " + event.type, event);
        underfoot.dispatchEvent(event);
    }


    return (
        <div>
            <img
                id={id ?? null}
                src={image_url}
                ref={imgRef}
                alt={alt ? alt : tooltip ? tooltip : "image link"}

                className={className}
                style={{
                    opacity: 1,
                    pointerEvents: "none",

                    position: "absolute",
                    left: position ? `${position.left}vw` : x_position ? `${x_position}vw` : null,
                    top: position ? `${position.top}vh` : y_position ? `${y_position}vh` : null,

                    // border: '1px dashed red',
                }}
            />
            {canvas_reference_image ?
                <img id={id + "_reference" ?? null}
                     alt={"invisible reference image"}
                     src={canvas_reference_image}
                     ref={referenceImageRef}
                     className={className}
                     style={{
                         pointerEvents: "none",
                         opacity: 0,
                         position: "absolute",
                         left: position ? `${position.left}vw` : x_position ? `${x_position}vw` : null,
                         top: position ? `${position.top}vh` : y_position ? `${y_position}vh` : null,
                     }}
                />
                : null}
            <canvas
                id={id + "_canvas" ?? null}
                ref={canvasRef}
                onClick={HandleClick}
                onMouseDown={HandleMouseDown}
                onMouseUp={HandleMouseUp}
                onMouseMove={HandleMouseMove}
                onMouseEnter={HandleMouseBoundingBoxEnter}
                onMouseLeave={HandleMouseBoundingBoxExit}

                title={tooltip ?? null}
                style={{
                    position: "absolute",
                    left: position ? `${position.left}vw` : x_position ? `${x_position}vw` : null,
                    top: position ? `${position.top}vh` : y_position ? `${y_position}vh` : null,

                    opacity: 0,
                    border: "1px solid green",
                }}
            />
        </div>
    );
}

