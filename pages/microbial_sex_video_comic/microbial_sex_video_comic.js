import React, {useState} from "react";
import {Sections} from "./video_comic_data";
import {Images} from "../../AssetReferences";

import style from "./styles.module.css"
import {MicrobeBackButton} from "../../components/microbeBackButton";
import Enter from "./sections/enter";
import Gallery from "./sections/gallery";
import Focus from "./sections/focus";

export default function MicrobialSexVideoComic({onExit}) {
    const [section, setSection] = useState(Sections.EnterID)
    
    function Exit()
    {
        setSection(Sections.EnterID)
        onExit();
    }
    
    function OpenPage(newPage) {
        setSection(newPage);
    }

    function RenderSection({onPageOpen}) {
        switch (section) {
            case Sections.EnterID:
                return <Enter onPageOpen={(page) => onPageOpen(page)}/>;
            case Sections.GalleryID:
                return <Gallery/>;
            case Sections.FocusID:
                return <Focus/>;
        }
    }

    return (
        <>        
            <div className={style.MicrobialSexVideoComic}>

                <MicrobeBackButton 
                    className={style.backButton}
                    image_src={Images.ToiBig} 
                    tooltip={"Click to return to homepage"}
                    size={5} 
                    top={2}
                    left={2}
                    onClick={Exit}
                />

                <RenderSection onPageOpen={OpenPage}/>

            </div>
        </>
    )

}

