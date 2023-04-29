import { Text, ActivityIndicator, Button } from "react-native";
import * as React from "react";
import { View } from "../../components/common/View";
import { useGrocerylistsData } from "../../hooks/grocerylistHooks";
import { FlatList } from "native-base";
import ListItem from "../../components/common/ListItem";

function Grocerylists({ navigation }: { navigation: any }) {
	const { data, isLoading } = useGrocerylistsData();
	if (!data && isLoading) return <ActivityIndicator size={30} />;
	console.log(data);
	return (
		<View className="grid gap-1 mt-1">
			{isLoading && <ActivityIndicator size={30} />}

			<FlatList
				data={data}
				renderItem={({ item }: any) => (
					<ListItem
						onPress={() => {
							navigation.push("GrocerylistDetail", {
								grocerylistId: item.id,
							});
						}}
						label={`${item?.menu?.name}`}
						key={`groverylist-${item.menu?.name}`}
					/>
				)}
				mb={10}
			/>
		</View>
	);
}

export default Grocerylists;
