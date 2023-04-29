import { ActivityIndicator } from "react-native";
import * as React from "react";
import { useIngredientsData } from "../../hooks/ingredientsHooks";
import { FlatList, ScrollView } from "native-base";
import ListItem from "../../components/common/ListItem";

function Ingredients({ navigation }: { navigation: any }) {
	const { data, isLoading } = useIngredientsData();

	if (!data && isLoading) return <ActivityIndicator size={30} />;
	return (
		<ScrollView pt={4}>
			{isLoading && <ActivityIndicator size={30} />}
			<FlatList
				data={data}
				renderItem={(item: any) => (
					<ListItem
						onPress={() =>
							navigation.navigate("IngredientDetail", {
								ingredientId: item.item.id,
							})
						}
						label={item.item.name}
						key={item.item.id}
					/>
				)}
				mb={10}
			/>
		</ScrollView>
	);
}

export default Ingredients;
