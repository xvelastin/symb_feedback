const path_to_microbes = "./shared/microbes"

export class Images {
    static AndeMia1 = `${path_to_microbes}/AndeMia_anim_v001_animated.gif`
    static AndeMia2 = `${path_to_microbes}/AndeMia_anim_v002_animated.gif`

    static George = `${path_to_microbes}/George_anim_v003.gif`;


    static ToiBig = `${path_to_microbes}/toi_big.gif`
    static ToiSmall = `${path_to_microbes}/toi_small.gif`
    static ToiSmall_CanvasReference = `${path_to_microbes}/toi_small_reference.png`
    
    static CybershoreBackground = "./toi/cybershore_bg.png";
    static About = `./shared/AboutPlant_default.png`;

    static AboutHover = `./shared/AboutPlant_hover.gif`;
    static Bacteria_Growth = "./shared/additional_elements/bacteria_growth.gif";
    static Bacteria_Growth_CanvasReference = "./shared/additional_elements/bacteria_growth_full.png"
    static Crazy_Dots = "./shared/additional_elements/crazy_dots.gif";
    static Purple_Sun = "./shared/additional_elements/purple_sun.gif";
    static Stretching_Cubes = "./shared/additional_elements/stretching_cubes.gif";
}

const path_to_popup_files = "./shared/frontpage_titles"
export class Popups {    
    static DecaySim = path_to_popup_files + "/decaysim_title.png";
    static MicrobialSexLoops =  path_to_popup_files + "/microbialsexloops_title.png";
    static ToiVideoComic =  path_to_popup_files + "/microbialsexvideo_title.png";
    static CybershoreMeditations = path_to_popup_files + "/cybershoremeditations_title.png";
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
    static Mushies = "./_test/mushrooms2/index.html";    
}

export class Cursor {
    static ToiCursor = "./toi/cursor.png"
    static ToiCursorGlow = "./toi/cursor_glow.png"
}

export class Sounds {
    static BacteriaGrowthFx = "./shared/frontpage_sounds/growth_roots.mp3";
    static CrazyDotsFx = "./shared/frontpage_sounds/liquid_grains.mp3";
    static PurpleSunFx = "./shared/frontpage_sounds/nucleus_wind.mp3";
    static StretchingCubesFx = "./shared/frontpage_sounds/bendy_marimba.mp3"; 
}