import React, {useEffect} from 'react'
import Popup from "./popup";
import {PopupAlts, PopupAssets, PopupPositions, PopupSizes} from "../pages/front_page_data";

export default function PopupCanvas({highlighted})
{
    return (
        <>
            {highlighted ?
                <Popup
                    highlighted={highlighted}
                    popup_id={highlighted.id}
                    img_src={PopupAssets.Get((highlighted.id))}
                    position={PopupPositions.Get(highlighted.id)}
                    width={PopupSizes.Get(highlighted.id)}
                    alt={PopupAlts.Get(highlighted.id)}
                />
                : null            
            }
        </>
    )
}