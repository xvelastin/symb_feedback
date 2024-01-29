import React from "react";
import {Pages} from "../Pages";
import {GoToPageButton} from "../components/goToPageButton";
import {ImageMaps, Images} from "../AssetReferences";
import style from "./front_page_styles.module.css";
import {MicrobeLink} from "./front_page";
import ImageClickDetector, {ClickableImage} from "../components/canvasAlphaDetector";

export default function NavigationPage({onPageOpen}) {
    function openPage(page) {
        onPageOpen(page);
    }

    return (
        <>
            <div style={{textAlign: "center"}}>                
                <GoToPageButton destination={Pages.AboutPage} text={"Go to About Page"} handlePageOpen={openPage}/>
                <GoToPageButton destination={Pages.FrontPage} text={"Go to Front Page"} handlePageOpen={openPage}/>
                
                <GoToPageButton destination={Pages.MicrobialSexLoopsPage} text={"Go to Microbial Sex Loops"} handlePageOpen={openPage}/>
                <GoToPageButton destination={Pages.MicrobialSexVideoComicPage} text={"Go to Toi Videos"} handlePageOpen={openPage}/>
                <GoToPageButton destination={Pages.CybershoreMeditationsLandingPage} text={"Go to Toi Game"} handlePageOpen={openPage}/>
                <GoToPageButton destination={Pages.DecaySimPage} text={"Go to George page"} handlePageOpen={openPage}/>

               
                
                <div id={"testy boy"}>
                   {/*<ClickableImage src={Images.George} size={"30vw"}/>*/}
                    
                    
                    <ImageClickDetector
                        src={Images.George}
                        img_width={"30vw"}
                        onClick={() => console.log("click!!")}
                        onHoverStart={() => console.log("hover start!")}
                        onHoverEnd={() => console.log("hover end!")}
                    />
                </div>
            </div>
            
           
        </>

    )
}



