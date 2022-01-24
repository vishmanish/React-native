import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#5390ff", // Blue
    secondary: "#cacfd9",   // Gray

    // colors
    black: "#1E1F20",
    white: "#FFFFFF",
    lightGray: "#eff2f5",
    gray: "#8b9097",
    BLUE: 'blue',
    DOLEBLACK: '#6a6e77',
    TABLEBLUE: '#f2f3f8',
    DARKBLACK: '#2b3439',
    DARKGRAY: '#2F393F',
    LIGHTGRAY: '#a9a9a9',
    LIGHTGREY: '#e7e7e7',
    LIGHTYELLOW: '#ffffed',
    TRANSPARENT: '#000000aa',
    BLACK:'#000000',
    HEADERCOLOR:'#CDCDCD',
    LINKCOLOR:'#0000FF',
    SEARCHCOLOR:'#343434',
    SKYBLUE:"#87cefa",
    TEALBLUE:"#008080",
    AQUABLUE:"#00FFFF"
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,

    // app dimensions
    width,
    height
};
export const FONTS = {
    largeTitle: { fontFamily: "Muli-ExtraBold", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Muli-ExtraBold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Muli-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Muli-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Muli-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Muli", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Mulir", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Muli", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Muli", fontSize: SIZES.body4, lineHeight: 22 },
};


const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
