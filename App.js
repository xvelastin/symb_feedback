import React, {useEffect, useState} from 'react';
import {Pages} from "./Pages";
import "./fonts/fonts.css"
import FrontPage from "./pages/front_page";
import AboutPage from "./pages/about_page";
import NavigationPage from "./pages/navigation_page";
import MicrobialSexLoops from "./pages/microbial_sex_loops/microbial_sex_loops";
import MicrobialSexVideoComic from "./pages/microbial_sex_video_comic/microbial_sex_video_comic";
import CybershoreMeditations from "./pages/cybershore_meditations/cybershore_meditations_landing_page";
import DecaySim from "./pages/decay_sim/decay_sim";

// set to navigation for dev, front page for publish
const homePage = Pages.NavigationPage;

export default function App() {
    const [pageDisplayed, setPageDisplayed] = useState(homePage)

    function OpenPage(newPage) {
        setPageDisplayed(newPage);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKeyPressed);
        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPressed);
        }
    }, []);

    function handleEscapeKeyPressed(event){
        if (event.key === "Escape") OpenPage(homePage);
    }

    function Display(page) {
        switch (page) {

            // ****** Main pages
            case Pages.FrontPage:
                return (<FrontPage
                    id={Pages.FrontPage}
                    onPageOpen={(pageToOpen) => OpenPage(pageToOpen)}
                />)
            
            case Pages.AboutPage:
                return (<AboutPage
                    id={Pages.AboutPage}
                    OnExit={() => OpenPage(homePage)}
                />)
            
            case Pages.NavigationPage:
                return <NavigationPage onPageOpen={(pageToOpen) => OpenPage(pageToOpen)}/>

            // ****** Contribution Pages       
                
            case Pages.MicrobialSexLoopsPage:
                return (<MicrobialSexLoops OnExit={() => OpenPage(homePage)}
                />)
            
            case Pages.MicrobialSexVideoComicPage:
                return <MicrobialSexVideoComic onExit={() => OpenPage(homePage)}/>
                  
            case Pages.CybershoreMeditationsLandingPage:
                return <CybershoreMeditations onExit={() => OpenPage(homePage)}/>
            
            case Pages.DecaySimPage:
                return <DecaySim onExit={() => OpenPage(homePage)}/>
            
            default:
                return (<h2>Navigated to an unknown page ("{page}").</h2>)
        }        
    }
    
    return (<> {Display(pageDisplayed)} </>)
}
