import { Button } from "react-native";
import * as React from "react";
import { View } from "../../components/common/View";
import { AuthContext } from "../../contexts/AuthContext";
import ListItem from "../../components/common/ListItem";

function Settings({ navigation }: { navigation: any }) {
	return (
		<View className="grid gap-1 mt-1">
			<ListItem
				onPress={() => {
					navigation.navigate("Mealplans");
				}}
				label="Mealplans"
			/>
		</View>
	);
}

export default Settings;
