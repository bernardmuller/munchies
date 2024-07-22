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

export const Colors = {
	...colors,
	light: {
		text: colors.black,
		background: colors.white,
		tint: colors.primary[500],
		CTA: colors.primary[500],
		tabIconDefault: colors.secondary[500],
		tabIconSelected: colors.primary[500],
	},
	dark: {
		text: colors.white,
		background: colors.secondary[900],
		tint: colors.secondary[900],
		CTA: colors.primary[500],
	},
};

// {
//   "primary50": "#d1f3c7",
//   "primary100": "#b5e8a7",
//   "primary200": "#9bdb8a",
//   "primary300": "#83ca6f",
//   "primary400": "#68bf50",
//   "primary500": "#5fab4a",
//   "primary600": "#599249",
//   "primary700": "#527b47",
//   "primary800": "#4b6543",
//   "primary900": "#42513e"
// }
