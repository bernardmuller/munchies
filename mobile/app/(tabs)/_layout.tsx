import { Redirect, Tabs } from "expo-router";
import React, { useContext } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthContext } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useThemeProvider";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { theme } = useTheme();
	// const { authToken } = useContext(AuthContext);

	// You can keep the splash screen open, or render a loading screen like we do here.

	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	// if (!authToken) {
	// On web, static rendering will stop here as the user is not authenticated
	// in the headless Node process that the pages are rendered in.
	// return <Redirect href="/login" />;
	// }

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.colors.background_dark,
					borderTopWidth: 0,
					borderLeftWidth: 0,
					borderRightWidth: 0,
					paddingHorizontal: 80,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="ingredients"
				options={{
					title: "Ingredients",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "list" : "list-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "settings" : "settings-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
