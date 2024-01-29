const path_to_microbes = "./shared/microbes"

export class Images {
    static AndeMia1 = `${path_to_microbes}/AndeMia_anim_v001_animated.gif`
    static AndeMia2 = `${path_to_microbes}/AndeMia_anim_v002_animated.gif`

    static George = `${path_to_microbes}/George_anim_v003.gif`;


    static ToiBig = `${path_to_microbes}/Toi_anim_v002.gif`
    static ToiSmall = `${path_to_microbes}/Toi_anim_small2_v002.gif`
    static CybershoreBackground = "./toi/cybershore_bg.png";

    static About = `./shared/about.png`;

    static Bacteria_Growth = "./shared/additional_elements/bacteria_growth_v001.gif";
    static Crazy_Dots = "./shared/additional_elements/crazy_dots_v001.gif";
    static Purple_Sun = "./shared/additional_elements/purple_sun_v001.gif";
    static Stretching_Cubes = "./shared/additional_elements/stretching_cubes_v001.gif";

    static Title_CybershoreMeditations = "./shared/frontpage_titles/cybershore meditations.png"

}


class ImageMapData {
    Name;
    Coordinates;

    constructor(name, coordinates) {
        this.Name = name;
        this.Coordinates = coordinates;
    }
}


export class ImageMaps {
    static george_microbe = new ImageMapData(
        "George",
        "253,788,310,901,418,921,430,921,491,912,496,912,558,907,572,893,586,879,580,880,587,864,594,848,601,803,603,802,640,781,641,781,683,759,686,755,724,735,726,735,734,685,734,682,715,642,753,597,753,594,755,549,755,542,728,495,728,495,691,451,691,451,595,417,594,417,541,426,524,427,510,365,510,365,525,315,533,268,541,221,537,233,537,233,499,185,499,185,503,126,503,126,503,86,481,59,459,32,428,32,428,32,274,5,217,35,210,36,204,35,193,44,181,58,183,61,183,64,197,99,191,121,185,143,162,180,162,206,162,232,205,251,233,261,261,271,229,337,229,337,119,366,109,373,99,380,109,413,182,423,255,433,233,430,301,486,369,542,349,526,349,526,335,643,335,643,350,704,305,741"
    )

}

export class Videos {
    static bg1 = "./shared/frontpage_background/BG_video_wip_v001.mp4"
    static bg2 = "./shared/frontpage_background/BG_video_wip_v002.mp4"
}

export class Icons {
    static PDF = "./shared/pdf-icon.png"
}

export class Text {
    static LoremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    
    
    static GetShortLorem() {
        const loremList = [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Nullam eget est in velit interdum accumsan.",
            "Sed consequat sapien ut dolor gravida, nec finibus lorem pretium.",
            "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
            "Mauris id quam vitae sem fermentum consequat.",
            "Phasellus ullamcorper justo at odio fermentum, eget tincidunt lectus placerat.",
            "Integer quis est nec nulla tincidunt scelerisque ut sed risus.",
            "Fusce eu felis ac risus eleifend vestibulum sit amet at magna.",
            "Aliquam erat volutpat. Donec eget metus nec quam sollicitudin fringilla.",
            "Etiam auctor arcu vitae nisl venenatis, sit amet condimentum eros faucibus."
        ];
        return loremList[Math.floor(Math.random() * loremList.length)];
    }
}

export class IFrames {
    static CybershoreMeditations = "./toi/cybershore_meditations/uncompressed/index.html";
    static DecaySim = "./_test/mushrooms2/index.html";
}

export class Cursor {
    static ToiCursor = "./toi/cursor.png"
}