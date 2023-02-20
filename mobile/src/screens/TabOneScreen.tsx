import { Button, StyleSheet, View } from "react-native";

import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<"TabOne">) {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text className="text-red-500">Tab One!!</Text>
			<View
			// style={styles.separator}
			// lightColor="#eee"
			// darkColor="rgba(255,255,255,0.1)"
			/>
			<Button
				title="Go to Login"
				onPress={() => navigation.navigate("login")}
			/>
		</View>
	);
}
