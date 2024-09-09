/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "var(--background)",
				header: "var(--header)",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "hsl(var(--primary-foreground))",
					hover: "hsl(var(--primary-hover))",
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				success: {
					DEFAULT: "var(--success)",
					foreground: "var(--success-foreground)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

// primary: {
// 					default: "#68BF50",
// 					light: "#7BC766",
// 					dark: "#5EAB49",
// 				},
// 				secondary: {
// 					default: "#1C2533",
// 					light: "#1C1F1C",
// 					dark: "#121412",
// 				},
// 				common: {
// 					white: "#FFFFFF",
// 					white_d: "#F5F7FA",
// 					grey: "#ADB0AC",
// 					grey_l: "#B7BCB5",
// 					grey_d: "#9E9F9E",
// 					black: "#000000",
// 				},
// 				primary_default: "#68BF50",
// 				primary_50: "#DCF0D6",
// 				primary_100: "#CFEBC7",
// 				primary_200: "#B5E0AA",
// 				primary_300: "#9CD58C",
// 				primary_400: "#82CA6E",
// 				primary_500: "#68BF50",
// 				primary_600: "#4F9D3A",
// 				primary_700: "#3A742B",
// 				primary_800: "#264B1C",
// 				primary_900: "#11220C",
// 				secondary_50: "#C8CDC8",
// 				secondary_100: "#BDC3BD",
// 				secondary_200: "#CFD9E7",
// 				secondary_300: "#929C92",
// 				secondary_400: "#A5BAD3",
// 				secondary_500: "#7494BA",
// 				secondary_600: "#5377A2",
// 				secondary_700: "#344D6E",
// 				secondary_800: "#2E425D",
// 				secondary_900: "#1C2533",
// 				gradient_t: "#4F4A46",
// 				primary: "#68BF50",
// 				primary_l: "#7BC766",
// 				primary_d: "#5EAB49",
// 				highlight: "#B4DFA8",
// 				// secondary: "#171A17",
// 				secondary_l: "#1C1F1C",
// 				secondary_d: "#121412",
// 				white: "#FFFFFF",
// 				white_d: "#F5F7FA",
// 				grey: "#ADB0AC",
// 	grey_l: "#B7BCB5",
// 	grey_d: "#9E9F9E",
// },