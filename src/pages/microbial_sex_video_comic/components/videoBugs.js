import React, {useEffect, useRef, useState} from "react";
import {Utils} from "../../../components/audioUtils"
import {path_to_bugs} from "../video_comic_data";
import style from "../styles.module.css";
import {Cursor} from "../../../AssetReferences";

export function RandomVideoBugContainer({shouldDisplayBugs, numberOfBugs, onClick}) {
    const bugs = Array.from({length: numberOfBugs});
    const [displayBugs, setDisplayBugs] = useState(false);

    let displayTimeoutHandler;

    useEffect(() => {
        return () => {
            stopTimeout()
        }
    }, []);

    useEffect(() => {
        if (shouldDisplayBugs) startTimeout();
        else stopTimeout();
    }, [shouldDisplayBugs]);

    function startTimeout() {
        displayTimeoutHandler = setTimeout(
            () => setDisplayBugs(true),
            // Utils.getRandomInt(50, 70) * 1000);
            100);
    }

    function stopTimeout() {
        if (displayTimeoutHandler) clearTimeout(displayTimeoutHandler)
        setDisplayBugs(false);
    }

    function HandleRandomBugClick() {
        setDisplayBugs(false);
        startTimeout();
        onClick?.();
    }

    return (
        bugs.map((_, index) => (displayBugs ?
                <RandomVideoBug
                    key={index}
                    onClick={HandleRandomBugClick}/>
                : null
        ))
    )
}

export function GoBackBug({onClick}) {

    return (
        <div
            style={{
                position: "fixed",
                top: "5%",
                left: "88%"
            }}>
            <BugLink image_default={`${path_to_bugs}/bug11.png`}
                     image_hover={`${path_to_bugs}/bug11_dropshadow.png`}
                     image_alt={"Return to the gallery view"}
                     image_size={200}
                     onClick={onClick}/>
        </div>
    )
}

export function RandomVideoBug({onClick}) {
    const [position, setPosition] = useState({
        top: GetRandomPosition().top,
        left: GetRandomPosition().left,
    });

    const [bugPath, setBugPath] = useState(GetRandomBugPath());

    useEffect(() => {
        const intervalHandler = setInterval(() => {
            setPosition({
                top: GetRandomPosition().top,
                left: GetRandomPosition().left
            })
        }, Utils.getRandomFloat(250, 500));

        return () => clearInterval(intervalHandler);
    }, []);


    function GetRandomPosition() {
        return {
            top: Utils.getRandomInt(10, 90) + "vh",
            left: Utils.getRandomInt(10, 90) + "vw"
        }
    }

    function GetRandomBugPath() {
        // console.log("GetRandomBugPath")
        const bugs = 17;
        return path_to_bugs + "bug" + Utils.getRandomInt(1, bugs);
    }

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: position.top,
                    left: position.left,
                    transition: `top ${Utils.getRandomInt(15, 25)}s, left ${Utils.getRandomInt(15, 25)}s`,
                }}>
                <BugLink
                    image_default={`${bugPath}.png`}
                    image_hover={`${bugPath}_dropshadow.png`}
                    image_alt={"Choose another video"}
                    image_size={80}
                    onClick={onClick}
                />
            </div>
        </>
    );
}

function BugLink({image_default, image_hover, image_alt, image_size, onClick}) {
    const bugRef = useRef(null);
    const [src, setSrc] = useState("")

    function HandleHover(isHovering) {
        setSrc(isHovering ? image_hover : image_default);
    }

    return (
        <>
            <div className={style.bug_link}
                 ref={bugRef}
            >
                <a
                    onClick={onClick}>
                    <img
                        className={style.link_image}
                        title={image_alt}
                        alt={image_alt}
                        src={src !== "" ? src : image_default}
                        onMouseEnter={() => HandleHover(true)}
                        onMouseLeave={() => HandleHover(false)}
                        style={{
                            width: image_size,
                            zIndex: 1,
                            cursor: `url${Cursor.ToiCursorGlow}, pointer`,
                        }}
                    />
                </a>
            </div>
        </>
    )
}
