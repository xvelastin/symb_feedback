import React, {Component} from 'react'
import {Shake} from 'reshake'
import {Utils} from "./audioUtils";

export default function Wobbler({children, speed = 0.8, intensity = 1}) {
    return (
        <Shake
            style={{
                // for some reason if this is not set to 0,0 it offsets the children
                position: "fixed",
                left: 0,
                top: 0,
            }}
            h={5 + intensity * 50}
            v={5 + intensity * 50}
            r={0}
            dur={Utils.mapToRange(speed, 0, 1, 15000, 200)}
            int={Utils.mapToRange(intensity, 0, 1, 60, 30)}
            max={100}
            fixed={true}
            fixedStop={false}
            freez={false}
        >
            {children}
        </Shake>
    )
}
