import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

const RecoilWrapper = ({ children }: { children: ReactNode }) => {
	return <RecoilRoot>{children}</RecoilRoot>;
};

// export default function RootLayout() {
// 	// const { authToken } = useContext(AuthContext);
// 	const [loaded] = useFonts({
// 		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
// 	});

// 	useEffect(() => {
// 		if (loaded) {
// 			SplashScreen.hideAsync();
// 		}
// 	}, [loaded]);

// 	if (!loaded) {
// 		return null;
// 	}

// 	return (
// 		<RecoilWrapper>
// 			<QueryClientProvider client={queryClient}>
// 				{/* <AuthProvider> */}
// 				<NativeBaseProvider theme={theme}>
// 					<GestureHandlerRootView>
// 						<BottomSheetModalProvider>
// 							<ThemeProvider
// 								value={
// 									colorScheme === "dark"
// 										? DarkTheme
// 										: DefaultTheme
// 								}
// 							>
// 								<Stack>
// 									<Stack.Screen
// 										name="(auth)"
// 										options={{ headerShown: false }}
// 									/>
// 									<Stack.Screen
// 										name="(settings)"
// 										options={{ headerShown: false }}
// 									/>
// 									<Stack.Screen name="+not-found" />
// 								</Stack>
// 							</ThemeProvider>
// 						</BottomSheetModalProvider>
// 					</GestureHandlerRootView>
// 				</NativeBaseProvider>
// 				{/* </AuthProvider> */}
// 			</QueryClientProvider>
// 		</RecoilWrapper>
// 	);
// }
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import React, { ReactNode, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { RecoilRoot } from "recoil";
import { useTheme } from "@/hooks/useThemeProvider";
import { useColorScheme } from "@/hooks/useColorScheme.web";

const CLERK_PUBLISHABLE_KEY =
	"pk_test_Y2hhcm1lZC1za3Vuay01OS5jbGVyay5hY2NvdW50cy5kZXYk";

const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (!isLoaded) return;

		const inTabsGroup = segments[0] === "(auth)";

		console.log("User changed: ", isSignedIn);

		if (isSignedIn && !inTabsGroup) {
			router.replace("/home");
		} else if (!isSignedIn) {
			router.replace("/login");
		}
	}, [isSignedIn]);

	return <Slot />;
};

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (err) {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (err) {
			return;
		}
	},
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const { theme } = useTheme();
	return (
		<ClerkProvider
			publishableKey={CLERK_PUBLISHABLE_KEY!}
			tokenCache={tokenCache}
		>
			<RecoilWrapper>
				<QueryClientProvider client={queryClient}>
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
									<InitialLayout />
								</ThemeProvider>
							</BottomSheetModalProvider>
						</GestureHandlerRootView>
					</NativeBaseProvider>
				</QueryClientProvider>
			</RecoilWrapper>
		</ClerkProvider>
	);
}
