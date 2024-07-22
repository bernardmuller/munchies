import { Redirect, Stack, Tabs } from "expo-router";
import React, { useContext } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthContext } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useThemeProvider";

export default function SettingsLayout() {
	// const colorScheme = useColorScheme();
	// const { theme } = useTheme();
	// const { authToken } = useContext(AuthContext);

	// // You can keep the splash screen open, or render a loading screen like we do here.

	// // Only require authentication within the (app) group's layout as users
	// // need to be able to access the (auth) group and sign in again.
	// if (!authToken) {
	// 	// On web, static rendering will stop here as the user is not authenticated
	// 	// in the headless Node process that the pages are rendered in.
	// 	return <Redirect href="/login" />;
	// }

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="household-management"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
