import React from "react";
import { useGrocerylistData } from "../../hooks/grocerylistHooks";
import { View, Text } from "../../components/common";

export default function Detail({ route }: { route: any }) {
	const { grocerylistId } = route.params;
	const { data } = useGrocerylistData(grocerylistId);

	return (
		<View>
			<Text>{JSON.stringify(data, null, 2)}</Text>
		</View>
	);
}
