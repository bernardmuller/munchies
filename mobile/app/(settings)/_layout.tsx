import { Stack } from "expo-router";
import React from "react";

export default function SettingsLayout() {
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
