import { Text, ActivityIndicator, Button } from "react-native";
import * as React from "react";
import { useMealsData } from "../../hooks/mealsHooks";
import { FlatList, useToast } from "native-base";
import { Link } from "@react-navigation/native";
import { View } from "../../components/common/View";
import ListItem from "../../components/common/ListItem";

function Recipes({ navigation }: { navigation: any }) {
	const { data, isLoading, error, isError } = useMealsData();

	if (!data && isLoading) return <ActivityIndicator size={30} />;

	return (
		<View className="grid gap-1 mt-1">
			{isLoading && <ActivityIndicator size={30} />}

			<FlatList
				data={data}
				renderItem={({ item }: any) => (
					<ListItem
						onPress={() =>
							navigation.push("RecipeDetail", {
								recipeId: item.id,
							})
						}
						label={`${item?.name}`}
						key={`recipe-${item.name}`}
					/>
				)}
				mb={10}
			/>
		</View>
	);
}

export default Recipes;
