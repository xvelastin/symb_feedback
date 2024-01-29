import React from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityWebGLInstance({loaderUrl, dataUrl, frameworkUrl, codeUrl}) {
    const { unityProvider } = useUnityContext({
        loaderUrl: {loaderUrl},
        dataUrl: {dataUrl},
        frameworkUrl: {frameworkUrl},
        codeUrl: {codeUrl},
    });

    return <Unity unityProvider={unityProvider} />;
}    