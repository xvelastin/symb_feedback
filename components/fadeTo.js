import {atodb, dbtoa} from "./audioUtils";

export function FadeTo(element, targetVolume, fadeTime, setAnimationFrameID, onEndFade) {
    let startTime;
    let startingVolume = atodb(element.volume);
    let lastElapsed = 0;

    function animate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;

        if (elapsed !== lastElapsed) {
            let progress = elapsed / fadeTime;

            lastElapsed = elapsed;
            if (progress < 1) {
                let volume = lerp(startingVolume, targetVolume, progress);

                element.volume = dbtoa(volume);
                setAnimationFrameID(requestAnimationFrame(animate));

                // console.log(`time: ${elapsed}. progress: ${progress}. volume: ${volume}`);
                if (volume >= targetVolume) progress = 1;

            } else {
                element.volume = dbtoa(targetVolume);
                onEndFade?.();
            }
        } else {
            setAnimationFrameID(requestAnimationFrame(animate));
        }
    }

    function lerp(start, end, progress) {
        return start + progress * (end - start);
    }


    startTime = Date.now();
    animate();
}