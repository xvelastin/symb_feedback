import React, {useEffect, useState} from 'react'
import s from './cursorPopupStyle.module.css'

const DISPLAY_PIXELS = false;
const DISPLAY_VIEWPORT = true;

export default function CursorPositionPopup({}) {
    const [savedPosition, setSavedPosition] = useState({left: 0, top: 0})
    const [position, setPosition] = useState({left: 0, top: 0});

    let [trackDistance, setTrackDistance] = useState(false);

    useEffect(() => {
        // on load
        window.onload = () => {
            document.addEventListener('mousemove', SetPositionState);
            document.addEventListener('mousedown', (evt) => ToggleClicked(true, evt))
            document.addEventListener('mouseup', (evt) => ToggleClicked(false, evt))
        }
        // on unload
        return () => document.removeEventListener('mousemove', SetPositionState);
    }, []);

    function SetPositionState(e) {
        // console.log("SetPositionState", e)
        setPosition({left: e.clientX, top: e.clientY})
    }

    function ToggleClicked(value, evt) {
        // console.log("ToggleClicked", value)
        setTrackDistance(value);
        if (value) {
            setSavedPosition({left: evt.clientX, top: evt.clientY})
        }
    }

    function GetDistanceFromClick() {
        return {
            left: position.left - savedPosition.left,
            top: position.top - savedPosition.top,
        }
    }

    function getVW(px) {
        return Math.round(px / window.innerWidth * 100);
    }

    function getVH(px) {
        return Math.round(px / window.innerHeight * 100);
    }

    return (
        <div id={"mouse cursor pop-up"} style={{
            zIndex: 1000,
            position: "fixed",
            top: position.top - 27,
            left: position.left,
            pointerEvents: "none",
        }}>
            <div className={s.cursorPopup}>
                {trackDistance
                    ?
                    (
                        <>
                            {DISPLAY_PIXELS && DISPLAY_VIEWPORT ? ` | v: ` : null}
                            {DISPLAY_PIXELS ? `px: ${GetDistanceFromClick().left}, ${GetDistanceFromClick().top}` : null}
                            {DISPLAY_VIEWPORT ? `${getVW(GetDistanceFromClick().left)}, ${getVH(GetDistanceFromClick().top)}` : null}

                        </>
                    )

                    : (
                        <>
                            {DISPLAY_PIXELS ? `px: ${position.left}, ${position.top}` : null}
                                           {DISPLAY_PIXELS && DISPLAY_VIEWPORT ? ` | v: ` : null}
                                           {DISPLAY_VIEWPORT ? `${getVW(position.left)}, ${getVH(position.top)}` : null}
                        </>
                    )
                }

            </div>
        </div>
    )
}
