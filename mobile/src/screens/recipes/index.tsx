import { Text, ActivityIndicator, Button } from "react-native";
import * as React from "react";
import { useMealsData } from "../../hooks/mealsHooks";
import { useToast } from "native-base";
import { Link } from "@react-navigation/native";
import { View } from "../../components/common/View";

function Recipes({ navigation }: { navigation: any }) {
	const { data, isLoading, error, isError } = useMealsData();

	if (!data && isLoading) return <ActivityIndicator size={30} />;

	return (
		<View className="grid gap-1 mt-1">
			{isLoading && <ActivityIndicator size={30} />}

			{data?.length > 0 ? (
				data?.map((recipe: any) => (
					<View
						className="p-2 w-full rounded-sm bg-white shadow-sm"
						key={recipe.id}
					>
						<Button
							title={recipe.name}
							onPress={() =>
								navigation.push("RecipeDetail", {
									recipeId: recipe.id,
								})
							}
						/>
					</View>
				))
			) : (
				<Text>No meals</Text>
			)}
		</View>
	);
}

export default Recipes;
