import { extendTheme } from "native-base";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Colors from "src/constants/Colors";
import { themeState } from "src/lib/store/atoms/theme";

const theme = extendTheme({
	components: {
		Text: {
			baseStyle: {
				color: "white",
			},
		},
		Divider: {
			baseStyle: {
				bgColor: Colors.secondary[700],
			},
		},
		Button: {
			baseStyle: {
				height: 12,
				rounded: "full",
				backgroundColor: Colors.primary[400],
				_focus: {
					bg: Colors.primary[300],
				},
			},
		},
	},
	colors: {
		primary: Colors.primary,
		secondary: Colors.secondary,
		background: "#1C2534",
		background_dark: "#131923",
		background_light: "#263249",
		muted: "#626b7d",
		text: {
			default: Colors.white,
			muted: Colors.secondary[500],
			contrast: Colors.black,
		},
		cta: Colors.primary[400],
	},
});

export const useTheme = () => {
	const mode = useRecoilValue(themeState);
	const setMode = useSetRecoilState(themeState);

	const toggleMode = () => {
		setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
	};

	return { mode, toggleMode, theme, colors: Colors };
};
