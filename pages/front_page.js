import React, {useEffect, useState} from "react";
import style from "./front_page_styles.module.css"

import "./microbial_sex_loops/mia_interface";
import {Pages} from "../Pages";
import {ImageMaps, Images, Videos} from "../AssetReferences";
import {ImageLink} from "../components/image_link";
import {BackgroundVideo} from "../components/backgroundVideo";
import {BacteriaGrowth, CrazyDots, PurpleSun, StretchingCubes} from "../components/additional_element";
import AboutPage from "./about_page";


export default function FrontPage({id, onPageOpen}) {
    const [displayPageVisible, setDisplayPageVisible] = useState(false)
    
    function handlePageOpen(page)
    {
        onPageOpen(page);
    }
    

    return (
        <>
            <div id={id}>

                <BackgroundVideo src={Videos.bg2} playWhenReady={true} loop={true}/>
                
                <div id={"aboutPageContainer"} style={{display:"flex", justifyContent:"center"}}>
                    {displayPageVisible
                        ? <AboutPage OnExit={() => setDisplayPageVisible(false)}/>
                        : null
                    }
                </div>
                
                <div id={"Content"}>
                    <AboutLink image_url={Images.About} x_position={85} y_position={2} OnAboutLinkClick={() =>  setDisplayPageVisible(true)}/>

                    <BacteriaGrowth className={style.bacteria_growth} x_position={5} y_position={0} />
                    <CrazyDots className={style.crazy_dots} x_position={5} y_position={50}/>
                    <PurpleSun className={style.purple_sun} x_position={70} y_position={40}/>
                    <StretchingCubes className={style.stretching_cubes} x_position={55} y_position={60}/>

                    <div id={"MicrobeLinkContainer"}>

                        {/* todo: figure out canvas pixel detection */}


                        <MicrobeLink image_url={Images.AndeMia1}
                                     onClick={() => handlePageOpen(Pages.MicrobialSexLoopsPage)}
                                     x_position={55}
                                     y_position={5}/>

                        <MicrobeLink image_url={Images.ToiBig}
                                     onClick={() => handlePageOpen(Pages.MicrobialSexVideoComicPage)}
                                     x_position={20}
                                     y_position={55}/>

                        <MicrobeLink image_url={Images.ToiSmall}
                                     className={style.littleToi}
                                     onClick={() => handlePageOpen(Pages.CybershoreMeditationsLandingPage)}
                                     x_position={31}
                                     y_position={60}
                                     title_url={Images.Title_CybershoreMeditations}
                                     title_x_offset={7}
                                     title_y_offset={-25}
                        />


                        <MicrobeLink image_url={Images.George}
                                     className={style.george}
                            // image_map={ImageMaps.george_microbe}
                                     onClick={() => handlePageOpen(Pages.DecaySimPage)}
                                     x_position={33}
                                     y_position={15}/>
                    </div>
                    
                </div>

                
                

             
                
            </div>
        </>
    )
}

function AboutLink({ image_url, x_position, y_position, OnAboutLinkClick, cursorOnHover }) {
    return (
        <div style={{cursor: cursorOnHover ? cursorOnHover : "pointer" }}>
            <img
                className={style.about_link}
                src={image_url}
                style={{
                    left: `${x_position}vw`,
                    top: `${y_position}vh`,
                }}
                alt={"image"}
                onClick={OnAboutLinkClick}/>
        </div>
    )
}

export function MicrobeLink({image_url, className, image_map, onClick, href, x_position, y_position, cursorOnHover,  title_url, title_x_offset, title_y_offset})
{
    const [displayTitle, setDisplayTitle] = useState(false);    
    
    // todo: on hover - send self ID to callback so canvas can display the correct line/title

   
    return (
        <div style={{cursor: cursorOnHover ? cursorOnHover : "pointer" }}>
           
            <div
                style={{
                    position: "absolute", 
                    display: displayTitle ? "block" : "none",
                    left: `${x_position + title_x_offset}vw`,
                    top: `${y_position + title_y_offset}vh`,
                    // border: "10px solid red"
                    
            }}>
                <img src={title_url} alt={""}/>
            </div>
            
            <ImageLink 
                href={href} 
                image_url={image_url} 
                className={className ? className : style.microbe_link}
                map_data={image_map}
                x_position={x_position} 
                y_position={y_position}
                onImageClick={onClick}
                onMouseEnter={() =>  setDisplayTitle(true)}
                onMouseLeave={() => setDisplayTitle(false)}
            />
        </div>
    )
}

