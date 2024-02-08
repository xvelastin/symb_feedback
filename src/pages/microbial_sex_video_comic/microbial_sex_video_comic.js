import React, {useState} from "react";
import {Sections} from "./video_comic_data";
import {Cursor, Images} from "../../AssetReferences";

import style from "./styles.module.css"
import {MicrobeBackButton} from "../../components/microbeBackButton";
import Enter from "./sections/enter";
import Gallery from "./sections/gallery";

// todo: put it all on one page, and begin loading videos from enter state

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
                    cursorOnHover={Cursor.ToiCursorGlow}
                />

                <RenderSection onPageOpen={OpenPage}/>

            </div>
        </>
    )

}

