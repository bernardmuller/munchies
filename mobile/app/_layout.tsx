import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ReactNode, useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useTheme } from "@/hooks/useThemeProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

const RecoilWrapper = ({ children }: { children: ReactNode }) => {
	return <RecoilRoot>{children}</RecoilRoot>;
};

export default function RootLayout() {
	// const { authToken } = useContext(AuthContext);
	const { theme } = useTheme();
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<RecoilWrapper>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<NativeBaseProvider theme={theme}>
						<GestureHandlerRootView>
							<BottomSheetModalProvider>
								<ThemeProvider
									value={
										colorScheme === "dark"
											? DarkTheme
											: DefaultTheme
									}
								>
									<Stack>
										<Stack.Screen
											name="(tabs)"
											options={{ headerShown: false }}
										/>
										<Stack.Screen
											name="(settings)"
											options={{ headerShown: false }}
										/>
										<Stack.Screen name="+not-found" />
									</Stack>
								</ThemeProvider>
							</BottomSheetModalProvider>
						</GestureHandlerRootView>
					</NativeBaseProvider>
				</AuthProvider>
			</QueryClientProvider>
		</RecoilWrapper>
	);
}
