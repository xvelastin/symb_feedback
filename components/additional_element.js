import {ImageLink} from "./image_link";
import style from "../pages/front_page_styles.module.css";
import React from "react";
import {Images} from "../AssetReferences";

export function BacteriaGrowth({className,onClick, x_position, y_position, cursorOnHover})
{
    function HandleClick()
    {
        // custom behaviour
        console.log("Bacteria growth has been clicked woohoo");
        onClick?.();
    }
    
    return <AdditionalElement image_url={Images.Bacteria_Growth} className={className}  onClick={HandleClick} x_position={x_position} y_position={y_position} cursorOnHover={cursorOnHover}/>
}


export function CrazyDots({className, onClick, x_position, y_position, cursorOnHover})
{
    function HandleClick()
    {
        // custom behaviour
        console.log("CrazyDots has been clicked woohoo");
        onClick?.();
    }

    return <AdditionalElement image_url={Images.Crazy_Dots} className={className} onClick={HandleClick} x_position={x_position} y_position={y_position} cursorOnHover={cursorOnHover}/>
}

export function PurpleSun({className, onClick, x_position, y_position, cursorOnHover})
{
    function HandleClick()
    {
        // custom behaviour
        console.log("Purple_Sun has been clicked woohoo");
        onClick?.();
    }

    return <AdditionalElement image_url={Images.Purple_Sun} className={className}  onClick={HandleClick} x_position={x_position} y_position={y_position} cursorOnHover={cursorOnHover}/>
}

export function StretchingCubes({className, onClick, x_position, y_position, cursorOnHover})
{
    function HandleClick()
    {
        // custom behaviour
        console.log("Stretching_Cubes has been clicked woohoo");
        onClick?.();
    }

    return (
        <AdditionalElement image_url={Images.Stretching_Cubes} className={className} onClick={HandleClick} x_position={x_position} y_position={y_position} cursorOnHover={cursorOnHover}/>
    )
}


export function AdditionalElement({image_url, className, onClick, x_position, y_position, cursorOnHover}) {
    return (
        <div style={{cursor: cursorOnHover ? cursorOnHover : "pointer"}}>
            <ImageLink
                image_url={image_url}
                className={className}
                onImageClick={onClick}
                x_position={x_position}
                y_position={y_position}
            />

        </div>
    )
}