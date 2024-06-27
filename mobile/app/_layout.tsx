import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
	const [loaded] = useFonts({
		Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
		InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
	});

	if (!loaded) {
		return null;
	}

	return (
		<Stack>
			<Stack.Screen name="index" />
		</Stack>
	);
}
