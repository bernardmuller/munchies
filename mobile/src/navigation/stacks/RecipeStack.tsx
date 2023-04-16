import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Recipes from "../../screens/recipes";
import RecipeDetail from "../../screens/recipes/detail";
import { useAddMeal, useMealsData } from "../../hooks/mealsHooks";
import { AddIcon, IconButton, Spinner } from "native-base";

const SettingsStack = createNativeStackNavigator();

function RecipesStack() {
	const addRecipe = useAddMeal();
	const { isFetching } = useMealsData();
	return (
		<SettingsStack.Navigator>
			<SettingsStack.Screen
				name="Recipes"
				component={Recipes}
				options={{
					headerRight: () => (
						<>
							{addRecipe.isLoading || isFetching ? (
								<Spinner />
							) : (
								<IconButton
									icon={<AddIcon />}
									onPress={() => addRecipe.mutate()}
								/>
							)}
						</>
					),
				}}
			/>
			<SettingsStack.Screen
				name="RecipeDetail"
				component={RecipeDetail}
			/>
		</SettingsStack.Navigator>
	);
}

export default RecipesStack;
