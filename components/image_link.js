import React, {useEffect} from "react";

export function ImageLink({
                              image_url,
                              className,
                              position,
                              x_position,
                              y_position,
                              map_data,
                              href,
                              onImageClick,
                              onMouseEnter,
                              onMouseLeave,
                              alt,
                              tooltip
                          }) {

    useEffect(() => {
        // console.log(image_map)
        if (!map_data) return;
        console.log(map_data.Name, map_data.Coordinates)
    }, [map_data]);


    return (
        <>
            {/*<a href={href}>*/}
            
            <img
                useMap={map_data ? `#${map_data.Name}` : null}
                className={className}
                src={image_url}
                style={{
                    // if no position given, defaults to relative, otherwise prioritises position[x, y], then x_position, y_position.
                    position: position || x_position || y_position ? "fixed" : "relative",
                    left: position ? `${position[0]}vw` : x_position ? `${x_position}vw` : null,
                    top: position ? `${position[1]}vh` : y_position ? `${y_position}vh` : null,
                    // border: "1px solid red"
                }}
                alt={alt ? alt : tooltip ? tooltip : "image link"}
                title={tooltip ? tooltip : null}

                onClick={map_data ? null : onImageClick ? onImageClick : null}
                onMouseEnter={map_data ? null : onMouseEnter}
                onMouseLeave={map_data ? null : onMouseLeave}

            />
            {map_data
                ?
                <map name={map_data.Name}>
                    <area
                       
                        shape="poly"
                        coords={map_data.Coordinates}

                        onClick={onImageClick ? onImageClick : null}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}

                        alt={tooltip ? tooltip : "image link"}
                    />
                </map>
                : null
            }

            {/*</a>*/}
        </>
    )
}
