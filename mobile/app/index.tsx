import React from "react";
import { Text, View, Touchable, Button } from "react-native";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
			}}
		>
			<Button title="Go to Profile" />
		</View>
	);
}
