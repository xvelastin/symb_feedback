import {atodb, dbtoa} from "./audioUtils";

export class Fader {

    constructor() {
        this.fadeHandlers = new Map();
    }

    ClearFadeHandler(elementID) {
        // console.log("stopping fade for " + elementID)

        let animationFrameId = this.fadeHandlers.get(elementID);
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            this.fadeHandlers.delete(elementID);
        }
    }

    DoFade(element, targetVolume, fadeTime, onEndFade) {
        this.ClearFadeHandler(element.id);

        // console.log(`Fade called on ${element.id}. Fading from ${atodb(element.volume)} to ${targetVolume} over ${fadeTime}. OnEndFade: ${onEndFade}`)

        this.FadeTo(element, targetVolume, fadeTime,
            (animID) => {
                this.fadeHandlers.set(element.id, animID);
            },
            () => {
                onEndFade?.();
            });
    }


    FadeTo(element, targetVolume, fadeTime, setAnimationFrameID, onEndFade) {
        let startTime;
        let startingVolume = atodb(element.volume);

        if (startingVolume === targetVolume) {
            endFade();
            return;
        }

        let lastElapsed = 0;

        function animate() {
            const currentTime = performance.now();
            const elapsed = currentTime - startTime;

            if (elapsed !== lastElapsed) {
                let progress = Math.min(1, elapsed / fadeTime);
                lastElapsed = elapsed;

                if (progress < 1) {
                    let volume = lerp(startingVolume, targetVolume, progress);
                    element.volume = dbtoa(volume);
                    // console.log(`time: ${elapsed}. progress: ${progress}. volume: ${volume}`);

                    if (targetVolume === volume) {
                        endFade();
                    } else {
                        setAnimationFrameID(requestAnimationFrame(animate));
                    }
                } else {
                    endFade();
                }
            } else {
                setAnimationFrameID(requestAnimationFrame(animate));
            }
        }

        function endFade() {
            element.volume = dbtoa(targetVolume);
            onEndFade?.();
        }

        function lerp(start, end, progress) {
            return start + progress * (end - start);
        }

        startTime = performance.now();
        animate();
    }
}