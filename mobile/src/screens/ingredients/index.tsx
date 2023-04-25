import { Text, ActivityIndicator, Button } from "react-native";
import * as React from "react";
import { View } from "../../components/common/View";
import { useGrocerylistsData } from "../../hooks/grocerylistHooks";
import { useIngredientsData } from "../../hooks/ingredientsHooks";

function Ingredients({ navigation }: { navigation: any }) {
	const { data, isLoading } = useIngredientsData();

	if (!data && isLoading) return <ActivityIndicator size={30} />;
	return (
		<View className="grid gap-1 mt-1">
			{isLoading && <ActivityIndicator size={30} />}

			{data?.length > 0 ? (
				data?.map((item: any) => (
					<View
						className="p-2 w-full rounded-sm bg-white shadow-sm"
						key={item.id}
					>
						<Button
							title={`${item.name}`}
							onPress={() =>
								navigation.navigate("IngredientDetail", {
									ingredientId: item.id,
								})
							}
						/>
					</View>
				))
			) : (
				<Text>No Ingredients</Text>
			)}
		</View>
	);
}

export default Ingredients;
