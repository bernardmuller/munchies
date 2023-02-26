import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Recipes from "../../screens/recipes";
import RecipeDetail from "../../screens/recipes/detail";

const SettingsStack = createNativeStackNavigator();

function RecipesStack() {
	return (
		<SettingsStack.Navigator>
			<SettingsStack.Screen name="Recipes" component={Recipes} />
			<SettingsStack.Screen
				name="RecipeDetail"
				component={RecipeDetail}
			/>
		</SettingsStack.Navigator>
	);
}

export default RecipesStack;
