import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop, ClipPath, SvgProps, Circle, Pattern, Image, Use, Rect } from "react-native-svg";

export const HomeColorIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path fill="url(#b)" d="M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9Zm-9-7v6h2v-6h-2Z" />
        </G>
        <Defs>
            <LinearGradient id="b" x1={1} x2={23.432} y1={1.352} y2={1.858} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const HomeIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path stroke="#9996A9" strokeWidth={2} d="M5 11v-1H3.587L12 2.352 20.413 10H19v10h-5v-8h-4v8H5v-9Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const OrdersColorIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path fill="url(#b)" d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2ZM4 9v10h16V9H4Zm2 2h2v2H6v-2Zm0 4h2v2H6v-2Zm4-4h8v2h-8v-2Zm0 4h5v2h-5v-2Z" />
        </G>
        <Defs>
            <LinearGradient id="b" x1={2} x2={22.395} y1={1} y2={1.411} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const OrdersIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path fill="#9996A9" d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2Zm-2 2H9v2H7V5H4v4h16V5h-3v2h-2V5Zm5 6H4v8h16v-8ZM6 14h2v2H6v-2Zm4 0h8v2h-8v-2Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const PhoneCallIcon = (props: SvgProps) => (
    <Svg width={74} height={74} fill="none" {...props}>
        <G filter="url(#a)">
            <Circle cx={37} cy={33} r={23} fill="url(#b)" />
        </G>
        <G clipPath="url(#c)">
            <Path fill="#fff" d="M46 38.42v3.536a1 1 0 0 1-.93.998c-.437.03-.794.046-1.07.046-8.837 0-16-7.163-16-16 0-.276.015-.633.046-1.07a1 1 0 0 1 .998-.93h3.536a.5.5 0 0 1 .498.45c.023.23.044.413.064.552a13.9 13.9 0 0 0 1.208 4.001c.095.2.033.439-.147.567l-2.158 1.542a13.047 13.047 0 0 0 6.844 6.844l1.54-2.154a.462.462 0 0 1 .573-.149 13.9 13.9 0 0 0 4 1.205c.139.02.322.042.55.064a.5.5 0 0 1 .449.498H46Z" />
        </G>
        <Defs>
            <LinearGradient id="b" x1={14} x2={60.909} y1={10} y2={10.946} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
            <ClipPath id="c">
                <Path fill="#fff" d="M25 22h24v24H25z" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const LabTestSColorIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path fill="url(#b)" d="M17 2v2h-1v14c0 2.21-1.79 4-4 4s-4-1.79-4-4V4H7V2h10Zm-4 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-2-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3-8h-4v4h4V4Z" />
        </G>
        <Defs>
            <LinearGradient id="b" x1={7} x2={17.201} y1={2} y2={2.103} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);



export const LabTestsIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path fill="#9996A9" d="M17 2v2h-1v14c0 2.21-1.79 4-4 4s-4-1.79-4-4V4H7V2h10Zm-3 8h-4v8a2 2 0 1 0 4 0v-8Zm-1 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-2-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3-8h-4v4h4V4Z" />
    </Svg>
);

export const ProfileColorIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <Path fill="url(#a)" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2ZM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416ZM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <Defs>
            <LinearGradient id="a" x1={2} x2={22.395} y1={2} y2={2.411} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
        </Defs>
    </Svg>
);


export const ProfileIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path fill="#9996A9" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm-4.987-3.744A7.966 7.966 0 0 0 12 20a7.97 7.97 0 0 0 5.167-1.892A6.978 6.978 0 0 0 12.16 16a6.982 6.982 0 0 0-5.147 2.256ZM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187v-.001ZM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);


export const UserIcon = (props: SvgProps) => (
    <Svg width={800} height={800} fill="none" viewBox="0 0 24 24" {...props}>
        <Path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 21a7.001 7.001 0 0 1 6-6.93m9.873 1.134a3.432 3.432 0 0 1-.206.006c-1.025 0-1.96-.458-2.667-1.21-.708.752-1.642 1.21-2.667 1.21-.069 0-.137-.002-.206-.006A5.606 5.606 0 0 0 14 16.398c0 2.214 1.275 4.075 3 4.602 1.725-.527 3-2.388 3-4.602 0-.412-.044-.813-.127-1.194ZM15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
        />
    </Svg>
);

export const WalletIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path fill="#6E6B85" d="M18 7h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h15v4ZM4 9v10h16V9H4Zm0-4v2h12V5H4Zm11 8h3v2h-3v-2Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const CartIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path fill="#6E6B85" d="M4 6.414.757 3.172l1.415-1.415L5.414 5h15.242a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6v2h11v2H5a1 1 0 0 1-1-1V6.414ZM6 7v6h11.512l1.8-6H6Zm-.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const DownIcon = (props: SvgProps) => (
    <Svg width={17} height={17} fill="none" {...props}>
        <Path fill="#9996A9" d="m8.5 9.33 3.506-3.506 1.002 1.001L8.5 11.333 3.992 6.825l1.002-1.001L8.5 9.33Z" />
    </Svg>
);

export const SearchIcon = (props: SvgProps) => (
    <Svg width={16} height={15} fill="none" {...props}>
        <Path stroke="url(#a)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M7.412 13.575a6.413 6.413 0 1 0 0-12.825 6.413 6.413 0 0 0 0 12.825Z" />
        <Path stroke="url(#b)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="m14.5 14.25-1.35-1.35" />
        <Defs>
            <LinearGradient id="a" x1={1} x2={14.078} y1={0.75} y2={1.014} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
            <LinearGradient id="b" x1={13.15} x2={14.527} y1={12.9} y2={12.928} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
        </Defs>
    </Svg>
)

export const GreaterIcon = (props: SvgProps) => (
    <Svg width={12} height={12} fill="none" {...props}>
        <Path fill="#9996A9" d="M6.586 6 4.111 3.525l.707-.707L8 6 4.818 9.182l-.707-.707L6.586 6Z" />
    </Svg>
)

export const Greater19Icon = (props: SvgProps) => (
    <Svg width={19} height={19} fill="none" {...props}>
        <Path fill="#9996A9" d="M10.428 9.5 6.509 5.581l1.12-1.12L12.666 9.5l-5.039 5.038-1.119-1.12L10.428 9.5Z" />
    </Svg>)

export const LessIcon = (props: SvgProps) => (
    <Svg width={20} height={20} fill="none" {...props}>
        <Path fill="#05002D" d="M12.5 4.167a.833.833 0 0 0-.592.241l-5 5a.833.833 0 0 0 0 1.175l5 5a.834.834 0 0 0 1.175-1.175L8.675 10l4.408-4.408a.833.833 0 0 0-.583-1.425Z" />
    </Svg>
);

export const EditIcon = (props: SvgProps) => (
    <Svg width={16} height={16} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path fill="url(#b)" d="m8.6 4.572 2.828 2.829L4.828 14H2v-2.829l6.6-6.6v.001Zm.943-.943 1.414-1.414a.667.667 0 0 1 .942 0L13.785 4.1a.667.667 0 0 1 0 .942l-1.414 1.414L9.543 3.63Z" />
        </G>
        <Defs>
            <LinearGradient id="b" x1={2} x2={14.217} y1={2.019} y2={2.266} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h16v16H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const FilterIcon = (props: SvgProps) => (
    <Svg width={17} height={11} fill="none" {...props}>
        <Path fill="#fff" d="M6.75 10.75h3.5V9h-3.5v1.75ZM.625.25V2h15.75V.25H.625ZM3.25 6.375h10.5v-1.75H3.25v1.75Z" />
    </Svg>
);

export const CloseGrayIcon = (props: SvgProps) => (
    <Svg width={26} height={26} fill="none" {...props}>
        <Circle cx={13} cy={13} r={13} fill="#E6E6EA" />
        <G clipPath="url(#a)">
            <Path fill="#6E6B85" d="m13 11.822 4.125-4.125 1.178 1.178L14.178 13l4.125 4.125-1.178 1.178L13 14.178l-4.125 4.125-1.178-1.178L11.822 13 7.697 8.875l1.178-1.178L13 11.822Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M3 3h20v20H3z" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const CartProducIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)"><Path fill="#6E6B85" d="M4 6.414.757 3.172l1.415-1.415L5.414 5h15.242a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6v2h11v2H5a1 1 0 0 1-1-1V6.414ZM6 7v6h11.512l1.8-6H6Zm-.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" /></G>
        <Defs><ClipPath id="a"><Path fill="#fff" d="M0 0h24v24H0z" /></ClipPath></Defs>
    </Svg>
);

export const ProductShareIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)"><Path fill="#6E6B85" d="M13 14h-2a8.999 8.999 0 0 0-7.968 4.81C3.011 18.54 3 18.27 3 18 3 12.477 7.477 8 13 8V2.5L23.5 11 13 19.5V14Zm-2-2h4v3.308L20.321 11 15 6.692V10h-2a7.982 7.982 0 0 0-6.057 2.773A10.987 10.987 0 0 1 11 12Z" /></G>
        <Defs><ClipPath id="a"><Path fill="#fff" d="M0 0h24v24H0z" /></ClipPath></Defs>
    </Svg>
);

export const DeleteCartItemIcon = (props: SvgProps) => (
    <Svg width={22} height={22} fill="none" {...props}>
        <Path stroke="#6E6B85" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10ZM14 8l-6 6M8 8l6 6" />
    </Svg>
);

export const MinusIcon = (props: SvgProps) => (
    <Svg width={12} height={2} fill="none" {...props}><Path stroke="#690DAC" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M1.125 1h9.75" /></Svg>
);

export const PlusIcon = (props: SvgProps) => (
    <Svg width={12} height={12} fill="none" {...props}><Path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 1.125v9.75M1.125 6h9.75" /></Svg>
);

export const EditIconWithUnderLine = (props: SvgProps) => (
    <Svg width={15} height={18} fill="none" {...props}>
        <G strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} opacity={0.45}>
            <Path stroke="url(#a)" d="M1 16.467h11.733" />
            <Path stroke="url(#b)" d="m9 2.6 3.2 3.2" />
            <Path stroke="url(#c)" d="M4.2 13.8H1v-3.2L10.6 1l3.2 3.2-9.6 9.6v0Z" clipRule="evenodd" />
        </G>
        <Defs>
            <LinearGradient id="a" x1={1} x2={11} y1={16.467} y2={20.905} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
            <LinearGradient id="b" x1={9} x2={12.263} y1={2.6} y2={2.666} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
            <LinearGradient id="c" x1={1} x2={14.053} y1={1} y2={1.263} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export const OrderCardPastIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path fill="#A64AC7" d="M14.503.084H9.281c-.637 0-1.153.572-1.153 1.275s.516 1.275 1.153 1.275h5.25c.61 0 1.125-.572 1.125-1.275S15.141.084 14.503.084Zm5.672.853h-2.597c.028.141.038.282.038.422 0 1.07-.779 2.128-1.707 2.128H7.922c-.975 0-1.753-1.059-1.753-2.128 0-.14.019-.28.047-.422H3.572C1.453.937.937 2.137.937 3.872v17.147c0 1.856.741 2.897 2.794 2.897h16.285c2.053 0 3.047-.816 3.047-2.897V3.872c0-1.735-.938-2.935-2.888-2.935ZM17.503 17.87H6.187c-.421 0-.834-.506-.834-.928 0-.413.356-.77.769-.77H17.4c.413 0 .769.32.797.77.01.412-.281.928-.694.928Zm.047-4.547H6.234c-.421 0-.684-.45-.684-.863 0-.421.356-.834.769-.834h11.278c.422 0 .769.384.797.834.01.422-.431.863-.844.863Zm0-4.66H6.234c-.421 0-.684-.45-.684-.862 0-.422.356-.834.769-.834h11.278c.422 0 .769.384.797.834.01.412-.431.862-.844.862Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);

export const EditProfileIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props} >
        <Circle cx={12} cy={12} r={12} fill="url(#a)" />
        <Path fill="#fff" d="M14.394 6.758a2.015 2.015 0 1 1 2.849 2.848l-.643.644-2.85-2.85.643-.642Zm-1.16 1.158-5.89 5.891c-.221.223-.38.5-.458.805l-.708 2.766a.365.365 0 0 0 .444.444l2.767-.707c.304-.078.582-.236.805-.459l5.89-5.89-2.85-2.85Z" />
        <Defs>
            <LinearGradient id="a" x1={0} x2={24.474} y1={0} y2={0.494} gradientUnits="userSpaceOnUse" >
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
        </Defs>
    </Svg>
)

export const ProfileMailIcon = (props: SvgProps) => (
    <Svg width={16} height={16} fill="none" {...props}>
        <Rect width={16} height={16} fill="#fff" rx={4} />
        <Path
            fill="#A64AC7"
            d="m3.18 6.339 4.567 2.375a.322.322 0 0 0 .296 0l4.566-2.375v4.125a1.393 1.393 0 0 1-1.314 1.391l-.079.002H4.574a1.393 1.393 0 0 1-1.391-1.314l-.002-.079V6.34Zm1.394-2.196h6.642a1.393 1.393 0 0 1 1.391 1.314l.002.079v.079L7.895 8.066 3.18 5.615v-.08a1.393 1.393 0 0 1 1.314-1.39l.079-.002h6.642-6.642Z"
        />
    </Svg>
)

export const ProfileCallIcon = (props: SvgProps) => (
    <Svg width={16} height={16} fill="none" {...props} >
        <Rect width={16} height={16} fill="#fff" rx={4} />
        <Path fill="#A64AC7"
            d="m6.192 3.24-.43.13a2.1 2.1 0 0 0-1.473 1.712c-.178 1.24.22 2.691 1.181 4.355.958 1.66 2.013 2.729 3.174 3.197a2.1 2.1 0 0 0 2.23-.423l.324-.309a1.2 1.2 0 0 0 .149-1.573L10.533 9.2a.9.9 0 0 0-.993-.334l-1.23.376-.032.006c-.136.02-.45-.273-.84-.949-.407-.707-.491-1.12-.379-1.227l.626-.584a1.498 1.498 0 0 0 .345-1.71l-.397-.882a1.2 1.2 0 0 0-1.44-.657h-.001Zm.894.903.396.882a.898.898 0 0 1-.206 1.026l-.628.585c-.401.38-.268 1.03.272 1.964.507.88.97 1.314 1.469 1.238l.074-.015 1.253-.382a.3.3 0 0 1 .331.11l.814 1.129a.6.6 0 0 1-.074.787l-.326.308a1.5 1.5 0 0 1-1.592.302c-1.019-.41-1.982-1.387-2.879-2.94-.899-1.557-1.263-2.881-1.107-3.97a1.5 1.5 0 0 1 1.052-1.224l.43-.13a.6.6 0 0 1 .72.33h.001Z"
        />
        <Path
            fill="#A64AC7"
            d="m9.48 12.47 1.449-.603-1.944-2.695-.936.324-.93-.92-.387-1.32.592-1-1.213-2.745-1.462 1.466v1.372l1.068 2.823 1.551 2.237 2.212 1.06Z"
        />
    </Svg>
)

export const ChangePasswordIcon = (props: SvgProps) => (
    <Svg width={22} height={22} fill="none" {...props} >
        <Path fill="url(#a)"
            d="M16.5 7.333h1.833a.917.917 0 0 1 .917.917v11a.917.917 0 0 1-.917.917H3.667a.917.917 0 0 1-.917-.917v-11a.917.917 0 0 1 .917-.917H5.5v-.916a5.5 5.5 0 1 1 11 0v.916ZM4.583 9.167v9.166h12.834V9.167H4.583Zm5.5 3.666h1.834v1.834h-1.834v-1.834Zm-3.666 0H8.25v1.834H6.417v-1.834Zm7.333 0h1.833v1.834H13.75v-1.834Zm.917-5.5v-.916a3.666 3.666 0 1 0-7.334 0v.916h7.334Z"
        />
        <Defs>
            <LinearGradient id="a" x1={2.75} x2={19.578} y1={0.917} y2={1.208} gradientUnits="userSpaceOnUse" >
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
        </Defs>
    </Svg>
)

export const GreaterProfileIcon = (props: SvgProps) => (
    <Svg width={7} height={15} fill="none" {...props} >
        <Path fill="#6E6B85" d="M7 8a1 1 0 0 1-.23.64l-5 6a1.001 1.001 0 0 1-1.54-1.28L4.71 8 .39 2.64a1 1 0 0 1 .15-1.41A1 1 0 0 1 2 1.37l4.83 6A1 1 0 0 1 7 8Z" />
    </Svg>
)

export const ProfileNotificationIcon = (props: SvgProps) => (
    <Svg width={22} height={22} fill="none" {...props}>
        <Path fill="url(#a)" d="M18.333 15.583h1.833v1.834H1.833v-1.834h1.833V9.167a7.333 7.333 0 0 1 14.667 0v6.416Zm-1.833 0V9.167a5.5 5.5 0 0 0-11 0v6.416h11ZM8.25 19.25h5.5v1.833h-5.5V19.25Z" />
        <Defs>
            <LinearGradient id="a" x1={1.833} x2={20.529} y1={1.833} y2={2.193} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
        </Defs>
    </Svg>
)

export const ProfileWalletIcon = (props: SvgProps) => (
    <Svg width={22} height={22} fill="none" {...props}>
        <Path fill="url(#a)" d="M16.5 6.417h2.75a.917.917 0 0 1 .916.916v11a.917.917 0 0 1-.916.917H2.75a.917.917 0 0 1-.917-.917V3.667a.917.917 0 0 1 .917-.917H16.5v3.667ZM3.666 8.25v9.167h14.667V8.25H3.666Zm0-3.667v1.834h11V4.583h-11Zm10.084 7.334h2.75v1.833h-2.75v-1.833Z" />
        <Defs>
            <LinearGradient id="a" x1={1.833} x2={20.527} y1={2.75} y2={3.169} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
        </Defs>
    </Svg>
)

export const ProfileReferIcon = (props: SvgProps) => (
    <Svg width={22} height={22} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path fill="url(#b)" d="M11 20.167A9.166 9.166 0 0 1 1.833 11 9.166 9.166 0 0 1 11 1.833 9.166 9.166 0 0 1 20.166 11 9.166 9.166 0 0 1 11 20.167Zm0-1.834a7.333 7.333 0 1 0 0-14.666 7.333 7.333 0 0 0 0 14.666Zm-3.209-5.5h5.042a.458.458 0 1 0 0-.916H9.166a2.292 2.292 0 0 1 0-4.584h.917V5.5h1.833v1.833h2.292v1.834H9.166a.458.458 0 1 0 0 .916h3.667a2.292 2.292 0 0 1 0 4.584h-.917V16.5h-1.833v-1.833H7.791v-1.834Z" />
        </G>
        <Defs>
            <LinearGradient id="b" x1={1.833} x2={20.529} y1={1.833} y2={2.21} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h22v22H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export const ProfileRateUsIcon = (props: SvgProps) => (
    <Svg width={22} height={22} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path fill="url(#b)" d="M12.834 13.064v1.916A5.5 5.5 0 0 0 5.5 20.167l-1.833-.001a7.333 7.333 0 0 1 9.167-7.103v.001ZM11 11.917a5.499 5.499 0 0 1-5.5-5.5c0-3.04 2.462-5.5 5.5-5.5 3.04 0 5.5 2.46 5.5 5.5 0 3.038-2.46 5.5-5.5 5.5Zm0-1.834a3.666 3.666 0 0 0 3.667-3.666A3.666 3.666 0 0 0 11 2.75a3.666 3.666 0 0 0-3.666 3.667A3.666 3.666 0 0 0 11 10.083Zm6.038 5.5-1.677-1.675 1.297-1.297 3.889 3.889-3.889 3.89-1.297-1.298 1.677-1.675H13.75v-1.834h3.288Z" />
        </G>
        <Defs>
            <LinearGradient id="b" x1={3.667} x2={20.882} y1={0.917} y2={1.218} gradientUnits="userSpaceOnUse" >
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h22v22H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export const ProfileHelpIcon = (props: SvgProps) => (
    <Svg width={22} height={22} fill="none" {...props}>
        <Path fill="url(#a)" d="M10.954 16.5c.32 0 .592-.11.814-.333.222-.222.332-.493.332-.813 0-.32-.11-.592-.332-.814a1.102 1.102 0 0 0-.814-.332c-.321 0-.592.111-.813.333a1.11 1.11 0 0 0-.333.813c0 .321.11.592.333.814.222.222.493.333.813.332Zm-.825-3.53h1.696c0-.503.057-.9.172-1.19.115-.291.44-.688.973-1.192.398-.398.71-.776.94-1.135.23-.36.344-.791.344-1.295 0-.855-.313-1.512-.94-1.97-.626-.459-1.367-.688-2.223-.688-.87 0-1.577.23-2.119.688a3.646 3.646 0 0 0-1.135 1.65l1.513.595c.076-.275.248-.573.516-.893.267-.321.676-.482 1.225-.482.49 0 .856.134 1.1.402.245.267.367.561.367.882 0 .305-.092.592-.275.86a3.66 3.66 0 0 1-.688.744c-.672.596-1.084 1.046-1.237 1.352-.153.306-.23.863-.23 1.673Zm.87 7.197a8.93 8.93 0 0 1-3.574-.722 9.242 9.242 0 0 1-2.91-1.96 9.25 9.25 0 0 1-1.96-2.91A8.942 8.942 0 0 1 1.833 11c0-1.268.24-2.46.722-3.575a9.271 9.271 0 0 1 1.96-2.91 9.25 9.25 0 0 1 2.91-1.96A8.942 8.942 0 0 1 11 1.834c1.268 0 2.46.241 3.575.723a9.271 9.271 0 0 1 2.91 1.959 9.262 9.262 0 0 1 1.96 2.91A8.908 8.908 0 0 1 20.166 11a8.92 8.92 0 0 1-.722 3.575 9.27 9.27 0 0 1-1.959 2.91 9.262 9.262 0 0 1-2.91 1.96 8.91 8.91 0 0 1-3.575.722Zm0-1.834c2.048 0 3.782-.71 5.203-2.13 1.42-1.422 2.131-3.156 2.131-5.203s-.71-3.781-2.131-5.202C14.78 4.378 13.047 3.667 11 3.667c-2.048 0-3.782.71-5.202 2.13C4.377 7.22 3.666 8.954 3.666 11s.71 3.781 2.132 5.202c1.42 1.42 3.154 2.131 5.202 2.131Z" />
        <Defs>
            <LinearGradient id="a" x1={1.833} x2={20.529} y1={1.833} y2={2.21} gradientUnits="userSpaceOnUse" >
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
        </Defs>
    </Svg>
)

export const LessWhiteIcon = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props} >
        <G clipPath="url(#a)">
            <Path fill="#fff" d="m2.828 12 4.95 4.95-1.414 1.414L0 12l6.364-6.364L7.778 7.05 2.828 12Z" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export const ReferCopyIocn = (props: SvgProps) => (
    <Svg width={18} height={20} fill="none" {...props} >
        <Path fill="url(#a)" d="M4.417 4.5V1.75a.917.917 0 0 1 .916-.917h11a.917.917 0 0 1 .917.917v12.833a.917.917 0 0 1-.917.917h-2.75v2.75a.92.92 0 0 1-.923.917H1.673a.919.919 0 0 1-.923-.917L.753 5.417a.92.92 0 0 1 .923-.917h2.74Zm-1.83 1.833-.004 11h9.167v-11H2.586ZM6.25 4.5h7.333v9.167h1.834v-11H6.25V4.5Z" />
        <Defs>
            <LinearGradient id="a" x1={0.75} x2={17.577} y1={0.833} y2={1.139} gradientUnits="userSpaceOnUse" >
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
        </Defs>
    </Svg>
)

export const UpArrowIconPurple = (props: SvgProps) => (
    <Svg width={24} height={24} fill="none" {...props}>
        <G clipPath="url(#a)">
            <Path fill="url(#b)" d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828Z" />
        </G>
        <Defs>
            <LinearGradient id="b" x1={4.222} x2={20.085} y1={4} y2={4.311} gradientUnits="userSpaceOnUse">
                <Stop stopColor="#A74AC7" />
                <Stop offset={1} stopColor="#690DAC" />
            </LinearGradient>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h24v24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)





