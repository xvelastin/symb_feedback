import React from "react";

export function GoToPageButton({destination, text, handlePageOpen}) {
    return (
        <>
            <br/>
                <button
                    style={{textAlign: "center"}}
                    onClick={() => handlePageOpen(destination)}>
                    {text}
                </button>
            <br/>
        </>
    )
}