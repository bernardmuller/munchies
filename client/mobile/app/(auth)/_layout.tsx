import { Redirect, Stack, Tabs } from "expo-router";
import React, { useContext } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthContext } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useThemeProvider";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { theme } = useTheme();

	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors.primary[500],
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
					name="home"
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
		</>
	);
}
