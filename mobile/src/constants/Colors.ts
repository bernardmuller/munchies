const colors = {
	primary: {
		"50": "#DCF0D6",
		"100": "#CFEBC7",
		"200": "#B5E0AA",
		"300": "#9CD58C",
		"400": "#82CA6E",
		"500": "#68BF50",
		"600": "#4F9D3A",
		"700": "#3A742B",
		"800": "#264B1C",
		"900": "#11220C",
	},
	secondary: {
		100: "#D0D4DD",
		200: "#D0D4DD",
		300: "#B6BBC5",
		400: "#9DA2AD",
		500: "#838995",
		600: "#505765",
		700: "#363E4D",
		800: "#293241",
		900: "#1C2534",
	},
	white: "#E9EDF5",
	black: "#000",
};

export default {
	...colors,
	light: {
		text: colors.black,
		background: colors.white,
		tint: colors.secondary[900],
		CTA: colors.primary[500],
	},
	dark: {
		text: colors.white,
		background: colors.secondary[900],
		tint: colors.secondary[900],
		CTA: colors.primary[500],
	},
};
