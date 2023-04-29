import { Text, ActivityIndicator, Button } from "react-native";
import * as React from "react";
import { useMenusData } from "../../hooks/menusHooks";
import { View } from "../../components/common";
import { FlatList } from "native-base";
import ListItem from "../../components/common/ListItem";

function Mealplans({ navigation }: { navigation: any }): JSX.Element {
	const { data, isLoading } = useMenusData();

	console.log(data);
	if (!data && isLoading) return <ActivityIndicator size={30} />;

	return (
		<View className="grid gap-1 mt-1">
			{isLoading && <ActivityIndicator size={30} />}

			<FlatList
				data={data}
				renderItem={({ item }: any) => (
					<ListItem
						onPress={() =>
							navigation.push("MealplanDetail", {
								mealplanId: item.id,
							})
						}
						label={`${item?.name}`}
						key={`groverylist-${item?.name}`}
					/>
				)}
				mb={10}
			/>
		</View>
	);
}

export default Mealplans;
