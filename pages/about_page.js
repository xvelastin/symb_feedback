import React, {StrictMode} from "react";
import {Text} from "../AssetReferences";
// import "../styles.css";


export default function AboutPage({id, OnExit}) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            zIndex: 1,
            position: "fixed",
            marginTop: "5vh"
        }}>
            <div
                id={id}
                style={{
                   
                    maxWidth: "30vw",
                    backgroundColor: "white",
                    opacity: 0.8,
                    padding: "2vh 2vw",
                }}>
                <h1>Symbiosis</h1>
                
                <p>
                    Organism’s first project is bringing together five transdisciplinary artists to form the Organism
                    collective alongside three Project Designers and a Digital Artist Coordinator. They are
                    collaborating
                    remotely to explore the biological phenomenon of symbiosis through the development of an immersive
                    digital installation involving visual, sonic, and interactive elements. Through this project,
                    Organism
                    aims to establish a model for interdisciplinary collaboration that encourages creative cohesion
                    through
                    upskilling opportunities, peer learning and cooperative play.
                </p>
                
                <h2>About the works</h2>
                <p>
                    {Text.LoremIpsum}
                </p>
                
                <h2>Full Credits</h2>
                <ul>
                    <li>{Text.GetShortLorem()}</li>
                    <li>{Text.GetShortLorem()}</li>
                    <li>{Text.GetShortLorem()}</li>
                    <li>{Text.GetShortLorem()}</li>
                </ul>
              
                
                <h2>Donate</h2>
                <p>
                    Donate! Give us MONEY 🤑🤑🤑🤑    
                </p>


                <br/>
                <button onClick={OnExit}>Back</button>
            </div>
        </div>
    )
}