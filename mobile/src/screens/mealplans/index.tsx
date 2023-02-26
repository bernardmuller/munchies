import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Text, View } from "react-native";
import * as React from "react";

const Mealplans = ({ navigation }: { navigation: any }) => {
	const { authToken, saveToken } = useContext(AuthContext);
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text>{authToken?.token}</Text>
			<Button
				title="Log out"
				onPress={async () => {
					await saveToken("");
				}}
			/>
		</View>
	);
};

export default Mealplans;
